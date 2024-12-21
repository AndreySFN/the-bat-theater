/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true, // Активируем layers
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/enchanted_hut',
        destination: '/ruza_19_10_24/enchanted_hut',
        permanent: true,
      },
      {
        source: '/sweet_box',
        destination: '/ruza_19_10_24/sweet_box',
        permanent: true,
      },
    ];
  },
  // Другие настройки Next.js
};

export default nextConfig;
