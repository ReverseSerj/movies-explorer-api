const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authErr');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
