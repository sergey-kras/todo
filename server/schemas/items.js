const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    userId: String,
    items: String,
});

module.exports = mongoose.model('items', itemsSchema);
