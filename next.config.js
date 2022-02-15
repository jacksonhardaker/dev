const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog/page/1',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        'next-swc-loader',
        {
          loader: '@svgr/webpack',
          options: { babel: false }
        }
      ],
    });

    return config;
  },
});
