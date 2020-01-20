const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    login: String,
    password: String,
    sid: String
  });

module.exports = mongoose.model('users', usersSchema);