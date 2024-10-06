// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/enchanted_hut',
        destination: '/ruza_19_10_24/enchanted_hut',
        permanent: true, // Используйте true для 301 редиректа или false для 302
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
