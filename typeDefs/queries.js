/**
 * The GraphQL queries
 */

const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    games:[Game]
    game(id:ID!):Game
    ageFilter(age: String):[Game]
    login(user: UserInput):AuthData
    users:[User]
    user(id:ID):User
  }
`