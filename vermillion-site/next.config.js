/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Base-Template",
  assetPrefix: "/Base-Template",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
