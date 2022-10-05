const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unathorized-err');
const ServerError = require('../errors/server-err');

// const { JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => next(new ServerError('Ошибка сервера!')));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('Пользователя с таким id не существует!'));
      } else res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id!'));
      } else {
        next(new ServerError('Ошибка сервера!'));
      }
    });
};

module.exports.getAboutUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('Пользователя с таким id не существует!'));
      } else res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id!'));
      } else {
        next(new ServerError('Ошибка сервера!'));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неправильная почта или пароль!'));
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Неправильная почта или пароль!'));
          }
          const token = jwt.sign(
            { _id: user._id },
            'JWT_SECRET',
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          });
          res.send({ data: user });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные!'));
      } else { next(new ServerError('Ошибка сервера!')); }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.send({ data: user });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Такой пользователь уже существует!'));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные!'));
        } else { next(new ServerError('Ошибка сервера!')); }
      }));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные!'));
      } else { next(new ServerError('Ошибка сервера!')); }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные!'));
      } else { next(new ServerError('Ошибка сервера!')); }
    });
};
