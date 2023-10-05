/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_ADDRESS: "https://api.hr-company.org",
  }
}

module.exports = nextConfig
