require('dotenv').config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

//Development logs for database transactions
const mongoose = require('mongoose');
mongoose.set('debug', true)
const routes = require("./routes");

//Utils and local file imports
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");



const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);
//Creating a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Client listening on localhost:${PORT}`);
      console.log(`Server GraphQL listening on localhost:${PORT}${server.graphqlPath}`);
    });
  });
};
startApolloServer();
