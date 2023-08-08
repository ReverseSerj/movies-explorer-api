const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  massage: 'С вашего IP приходит слишком много запросов, попробуйте позже.',
});

module.exports = { limiter };
