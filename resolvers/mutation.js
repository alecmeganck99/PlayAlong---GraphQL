/**
 * The Mutation Resolvers
 */

const { Game, User } = require('../mongo/models');
const { ApolloError } = require('apollo-server');
const pubsub = require('./pubsub');
const bcrypt = require('bcrypt');

module.exports = {
  Mutation: {
    addGame: async (parent, { game }, context) => {
      try {
        return await Game.create({
          ...game,
          addedOn: new Date()
        });
      } catch (e) {
        if (e.extensions.code === 'UNAUTHENTICATED') throw e;
        else throw new ApolloError(e.message);
      }
    },

    addExtentionToGame: async (parent, { gameId, extention }, context) => {
      try {
        // get and validate the game
        const gameExists = await Game.exists({ _id: gameId });
        if (!gameExists) throw new ApolloError("No game was found");

        // get the game
        const game = await Game.findOne({ _id: gameId });

        // add a extention to the game
        game.extentions.push(extention);
        game.editedOn = new Date();
        const updatedGame = await game.save();

        // get the new extention from updated game
        const newExtention = updatedGame.extensions;

        // let them know
        pubsub.publish('EXTENTION_ADDED', { extentionAdded: newExtention });

        // return the game with added extention
        return game;
      }
      catch (e) {
        // if (e.extensions.code === 'UNAUTHENTICATED') throw e;
        throw new ApolloError(e.message);
      }
    },

    register: async (parent, { user }) => {
      // destructure user
      const { name, email, password } = user;

      // validate if the user exists
      if (await User.exists({ email })) throw new Error('User already exists.')

      // create hash
      const hashedPassword = bcrypt.hashSync(password, 12);

      // create new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword
      });

      // reset the password for security issues
      newUser.password = null;

      // return the user
      return newUser;
    }
  }
}