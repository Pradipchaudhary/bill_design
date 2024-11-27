module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                tls: false, // Prevent bundling on the client
            };
        }
        return config;
    },
};
