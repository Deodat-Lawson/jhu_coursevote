/** @type {import("next").NextConfig} */
const config = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Add basePath if your app is not served from the root
    // basePath: '/click_to_punch_nlp',

    // Enable static file serving through the /public directory
    distDir: '.next',

    // Add asset prefix if needed
    // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : '',

    // Handle redirects if needed
    async redirects() {
        return [];
    },

    // Handle rewrites if needed
    async rewrites() {
        return [];
    },

    // Enable strict mode
    reactStrictMode: true,
};

export default config;