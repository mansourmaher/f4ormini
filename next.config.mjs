/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["c8.alamy.com", "utfs.io", "tailwindui.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
