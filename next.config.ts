import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      // Cache des pages HTML
      urlPattern: /^https?:\/\/.*$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 heures
        },
        networkTimeoutSeconds: 3,
      },
    },
    {
      // Cache des assets statiques (JS, CSS)
      urlPattern: /\/_next\/static\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 jours
        },
      },
    },
    {
      // Cache des données JSON
      urlPattern: /\.json$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "data-cache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 24 * 60 * 60, // 24 heures
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  // Permettre les SVG comme images
  images: {
    dangerouslyAllowSVG: true,
  },
};

export default withPWA(nextConfig);
