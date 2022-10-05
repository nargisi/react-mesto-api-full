const Card = require('../models/cards');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ServerError = require('../errors/server-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => next(new ServerError('Ошибка сервера!')));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные!'));
      } else next(new ServerError('Ошибка сервера!'));
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card === null) {
        next(new NotFoundError('Карточки с таким id не существует!'));
      } else if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Карточку удалять запрещено!'));
      } else {
        Card.findByIdAndRemove(req.params.id)
          .then(() => res.send({ data: card, message: 'DELETED' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id!'));
      } else { next(new ServerError('Ошибка сервера!')); }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        next(new NotFoundError('Карточки с таким id не существует!'));
      } else { res.send({ data: card }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные!'));
      } else { next(new ServerError('Ошибка сервера!')); }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        next(new NotFoundError('Карточки с таким id не существует!'));
      } else { res.send({ data: card }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные!'));
      } else { next(new ServerError('Ошибка сервера!')); }
    });
};
