/**
 * Modelling the playlist
 */

const mongoose = require('mongoose');

const ExtentionSchema = require('./extention');

const GameSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  thumbnailUrl: String,
  imgUrl: String,
  imgUrl2: String,
  age: String,
  addedOn: Date,
  extentions: [ExtentionSchema]
});

module.exports = GameSchema;