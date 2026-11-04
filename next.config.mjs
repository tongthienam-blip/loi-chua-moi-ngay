/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions || {}),
        ignored: ['**/System Volume Information/**', '**/node_modules/**'],
      };
    }
    return config;
  },
};

export default nextConfig;
