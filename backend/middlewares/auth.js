const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unathorized-err');

// const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, 'JWT_SECRET');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация!'));
  }
  req.user = payload;
  return next();
};
