/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ['en', 'fr', 'de', 'es'],
  //   defaultLocale: 'en',
  // },
  images: {
    domains: [
      'airtableusercontent.com',
      'v5.airtableusercontent.com', 
      'flagcdn.com',
      'cdn.jsdelivr.net'
    ]
  }
};

module.exports = nextConfig;