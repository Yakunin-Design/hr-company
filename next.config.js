/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_ADDRESS: "http://localhost:6969",
  }
}

module.exports = nextConfig
