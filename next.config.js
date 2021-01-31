module.exports = {
  images: {
    domains: ['image.tmdb.org', 'secure.gravatar.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/browse',
        permanent: true,
      },
    ];
  },
};
