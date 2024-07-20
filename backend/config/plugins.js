module.exports = () => ({
  graphql: {
    enable: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },

  seo: {
    enabled: true,
  },
});
