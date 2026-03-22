import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Deploy this function, then set up a cron job in Supabase Dashboard:
// Go to Database > Extensions > Enable pg_cron
// Then run: SELECT cron.schedule('auto-remind', '*/5 * * * *', $$SELECT net.http_post(url:='https://YOUR_PROJECT.supabase.co/functions/v1/auto-remind', headers:='{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb);$$);
// This checks every 5 minutes and sends reminders 30 min before sessions.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuth = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioFrom = Deno.env.get("TWILIO_PHONE_NUMBER");
    const coachPhone = Deno.env.get("COACH_PHONE"); // Set as secret: +15551234567

    if (!twilioSid || !twilioAuth || !twilioFrom || !coachPhone) {
      return new Response(
        JSON.stringify({ error: "Missing Twilio or COACH_PHONE secrets" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get today's date in US Eastern time (most common for coaching)
    const now = new Date();
    const eastern = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    const today = eastern.toISOString().split("T")[0];
    const currentMinutes = eastern.getHours() * 60 + eastern.getMinutes();

    // Fetch today's schedule from Supabase
    const { data: scheduleRows, error } = await supabase
      .from("schedule")
      .select("data")
      .order("updated_at", { ascending: false });

    if (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch schedule: " + error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get already-sent reminders for today
    const sentKey = `reminders_sent_${today}`;
    const { data: sentData } = await supabase
      .from("app_state")
      .select("data")
      .eq("id", sentKey)
      .single();

    const sent: Record<string, boolean> = sentData?.data || {};

    // Filter to today's upcoming sessions
    const sessions = (scheduleRows || [])
      .map((r: any) => r.data)
      .filter((s: any) => {
        if (s.date !== today) return false;
        if (s.status === "complete" || s.status === "cancelled") return false;
        if (!s.time) return false;
        if (sent[s.id]) return false;

        const [hr, min] = s.time.split(":").map(Number);
        const sessMinutes = hr * 60 + min;
        const diff = sessMinutes - currentMinutes;
        // Send reminder 25-35 minutes before (5-min cron window)
        return diff > 0 && diff <= 35;
      });

    if (sessions.length === 0) {
      return new Response(
        JSON.stringify({ message: "No reminders to send", checked: (scheduleRows || []).length }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send SMS for each upcoming session
    const results: any[] = [];
    for (const s of sessions) {
      const timeStr = formatTime(s.time);
      const msg = `Reminder: ${s.clientName || "Client"} — ${s.type || "Training"} at ${timeStr} today.${s.rate ? " $" + s.rate : ""}`;

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const authHeader = "Basic " + btoa(`${twilioSid}:${twilioAuth}`);

      const body = new URLSearchParams({
        To: coachPhone,
        From: twilioFrom,
        Body: msg,
      });

      const res = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const result = await res.json();
      if (res.ok) {
        sent[s.id] = true;
        results.push({ id: s.id, client: s.clientName, status: "sent" });
      } else {
        results.push({ id: s.id, client: s.clientName, status: "failed", error: result.message });
      }
    }

    // Save sent state
    await supabase
      .from("app_state")
      .upsert({ id: sentKey, data: sent, updated_at: new Date().toISOString() }, { onConflict: "id" });

    return new Response(
      JSON.stringify({ sent: results.length, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function formatTime(t: string): string {
  if (!t) return "TBD";
  const [hr, min] = t.split(":");
  const h = parseInt(hr);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${min} ${ap}`;
}
