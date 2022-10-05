const { Schema, model } = require('mongoose');
const validator = require('validator');

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Должно быть не менее 2 символов!'],
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
    },

  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
