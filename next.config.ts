const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    distDir: '.next', // Keep only if needed
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.nhle.com',
            },
        ],
    },
};

export default nextConfig;
