const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введите корректную ссылку',
    },
  },
  // ссылка на автора
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // required: true,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date,
  },
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;
