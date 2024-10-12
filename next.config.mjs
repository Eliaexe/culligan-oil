const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "lapasseduvent.com",
            },
            {
                protocol: "https",
                hostname: "bandofgeeks.fr",
            }

            
        ]
    }
}

export default nextConfig