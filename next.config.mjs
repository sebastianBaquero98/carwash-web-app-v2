/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["carwash-car-make-images.s3.amazonaws.com"],
  },
};

export default nextConfig;
