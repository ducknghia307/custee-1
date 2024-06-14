/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com","lh3.googleusercontent.com", 'hrcwelive.com', 'images-cdn.ubuy.co.id', ], // Add your Firebase Storage domain here
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      canvas: "commonjs canvas",
    });
    return config;
  },
};

module.exports = nextConfig;
