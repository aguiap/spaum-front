/** @type {import('next').NextConfig} */
const path = require("path");


const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      }
    ];
  }

}

module.exports = nextConfig
