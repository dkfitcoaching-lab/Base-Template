export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-vermillion/10 border border-vermillion/20 flex items-center justify-center">
              <span className="text-vermillion font-heading font-bold text-[10px]">
                V
              </span>
            </div>
            <span className="font-heading text-xs text-text-secondary tracking-wider">
              Vermillion Axis Technologies
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-text-caption">
            <span>Las Vegas, NV</span>
            <span className="w-px h-3 bg-border/50" aria-hidden="true" />
            <span>&copy; 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
