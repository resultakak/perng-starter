const app = require("./index");
const { PORT } = require("./config");

app.listen({ port: PORT }, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
