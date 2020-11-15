/**
 * The GraphQL mutations
 */

const { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    addGame(game: GameInput):Game
    addExtentionToGame(gameId: ID!, extention: ExtentionInput):Game
    register(user: UserInput):User
  }
`