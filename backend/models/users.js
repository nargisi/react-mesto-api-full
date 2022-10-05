const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Должно быть не менее 2 символов!'],
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Должно быть не менее 2 символов!'],
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Пожалуйста, введите корректную ссылку!',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
        message: (props) => `${props.value} некорректная почта!`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
  },
  {
    versionKey: false,
  },
);

module.exports = model('user', userSchema);
