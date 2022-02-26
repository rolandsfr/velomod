/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  i18n: {
    locales: ["lv", "en"],
    defaultLocale: "lv",
  },
};

module.exports = nextConfig;
