/**
 * Importing mongoose
 */

const mongoose = require('mongoose');

/**
 * Importing schemas
 */

const GameSchema = require('./schemas/game');
const UserSchema = require('./schemas/user');

/**
 * Creating mongoose models
 */

const Game = mongoose.model('Game', GameSchema);
const User = mongoose.model('User', UserSchema);

/**
 * Exporting the models
 */

module.exports = {
  Game,
  User
}