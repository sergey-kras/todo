const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    _id: Schema.Types.ObjectId,
    login: String,
    password: String,
    sid: String
  });

module.exports = mongoose.model('users', usersSchema);
