const WP_HOST = new URL(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT).hostname;
const path = require('path');
const withPossibleTypes = require("next-with-apollo-possible-types");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: [WP_HOST],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

module.exports = withPossibleTypes({
  possibleTypes: {
    gqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    output: path.join(__dirname, 'src', 'client', 'possibleTypes.json')
  },
  ...nextConfig
})
