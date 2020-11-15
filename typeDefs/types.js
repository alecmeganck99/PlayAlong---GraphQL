/**
 * The GraphQL types
 */

const { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  type Game {
    id: ID!
    extentions: [Extention]
    title: String
    description: String
    price: String
    thumbnailUrl: String
    imgUrl: String
    imgUrl2: String
    age: String
    addedOn: Date
  }

  type Extention {
    id: ID!
    author: String
    description: String
  }

  type AuthData {
    userId: ID
    token: String
  }

  type User {
    id: ID
    name: String
    email: String
    password: String
  }
`