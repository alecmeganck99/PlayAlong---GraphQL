/**
 * A GraphQL template
 * More Information: https://graphql.org/
 */

/**
 * Importing some libraries
 */

const dotenv = (require('dotenv')).config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');

/**
 * Mongoose Database
 */

const MONGODB_USER = process.env.DB_USER;
const MONGODB_PW = process.env.DB_PASS;
const MONGODB_NAME = process.env.DB_NAME;

const openMongoDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      `mongodb+srv://${MONGODB_USER}:${MONGODB_PW}@cluster0.e6us7.gcp.mongodb.net/<${MONGODB_NAME}>?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    mongoose.connection.on('error', (e) => reject(e.message));
    mongoose.connection.once('open', () => resolve());
  });
}

/**
 * Apollo Server
 */

const startServer = () => {
  return new Promise((resolve, reject) => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: true,
      context: (({ req }) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        try {
          const decodedToken = jwt.verify(token, process.env.TOKEN_SALT);
          return decodedToken && decodedToken.userId ? { userId: decodedToken.userId } : { userId: '' }
        } catch {
          return { userId: '' }
        }
      })
    });

    server
      .listen({ port: process.env.PORT || 4000 })
      .then(({ url }) => { resolve(url); });
  });
}

/**
 * Start the server
 */

openMongoDB()
  .then(startServer)
  .then((url) => console.log(`Server Started on ${url}`))
  .catch(e => console.error(e));