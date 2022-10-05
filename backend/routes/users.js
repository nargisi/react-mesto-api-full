const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  getUsers, getUserById, getAboutUser, updateUser, updateAvatar,
} = require('../controllers/users');
const { patternURL } = require('../constants');

router.get('/', getUsers);
router.get('/me', getAboutUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().regex(patternURL),
  }),
}), updateAvatar);

module.exports = router;
