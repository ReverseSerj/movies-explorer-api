const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/notFound');
const { createUser, login } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../validators/validators');

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);
router.use('*', (req, res, next) => { next(new NotFound('Адресс не существует')); });

module.exports = router;
