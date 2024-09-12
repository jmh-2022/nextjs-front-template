/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    config.cache = false;

    return config;
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    dangerouslyAllowSVG: true,
  },
  output: 'standalone',
};

export default nextConfig;
