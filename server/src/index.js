require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const morgan = require("morgan");
const cors = require("cors");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const {
  getToken,
  getIPAdress,
  getUser,
} = require("./lib");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = getToken(req);
    const ip = getIPAdress(req);
    return { user: getUser(token), ip };
  },
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.use((req, res) => {
  res.status(200);
  res.send("🚀");
  res.end();
});

module.exports = app;
