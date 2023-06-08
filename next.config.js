module.exports = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog/page/1',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
