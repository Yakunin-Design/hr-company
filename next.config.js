/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_ADDRESS: "https://api.hr-company.org",
    // API_ADDRESS: "http://127.0.0.1:6969",
  }
}

module.exports = nextConfig
