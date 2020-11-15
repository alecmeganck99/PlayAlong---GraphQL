/**
 * The Query Resolvers
 */

const { Game, User } = require('../mongo/models.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    games: () => Game.find(),
    game: (parent, { id }) => Game.findOne({ _id: id }),
    ageFilter: (parent, { age }) => Game.find({ age: age }),
    login: async (parent, { user }, context) => {
      // destructure the user
      const { email, password } = user;

      // validate if the user exists
      const userExists = await User.exists({ email });
      if (!userExists) throw new Error('User does not exist.');

      // get the user
      const foundUser = await User.findOne({ email: email });

      // check if incoming password is equal
      const isEqual = bcrypt.compareSync(password, foundUser.password);
      if (!isEqual) throw new Error('Password is incorrect.');

      // create the webtoken
      const token = jwt.sign(
        { userId: foundUser._id, email: foundUser.email },
        process.env.TOKEN_SALT,
        { expiresIn: '1h' }
      );

      // return the auth data
      return {
        userId: foundUser.id,
        token
      }
    },

    users: (parent, params, context) => {
      if (context.userId === '') throw new AuthenticationError('Must authenticate!');
      else return User.find();
    },

    user: (parent, { id }, context) => {
      if (context.userId === '') throw new AuthenticationError('Must authenticate!');
      else return User.findOne({ _id: id });
    },

  },
}