// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: "images.pexels.com"
//       }

//     ]
//   }

// }

// export default nextConfig;

import createNextIntlPlugin from 'next-intl/plugin';

// Import Next.js types for type checking
 /** @type {import('next').NextConfig} */

// Create Next.js configuration
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

// Create the Next.js Intl plugin
const withNextIntl = createNextIntlPlugin();

// Merge the Next.js configuration with the Intl plugin
export default withNextIntl(nextConfig);
