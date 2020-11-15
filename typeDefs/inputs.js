/**
 * The GraphQL inputs
 */

const { gql } = require('apollo-server');

module.exports = gql`
  input GameInput {
    id: ID
    title: String
    description: String
    price: String
    thumbnailUrl: String
    imgUrl: String
    imgUrl2: String
    age: String
  }

  input ExtentionInput {
    author: String
    description: String
  }

  input UserInput {
    name: String
    email: String
    password: String
  }
`