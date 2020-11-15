/**
 * Modelling the extention
 */

const mongoose = require('mongoose');

const ExtentionSchema = new mongoose.Schema({
  author: String,
  description: String
});

module.exports = ExtentionSchema;