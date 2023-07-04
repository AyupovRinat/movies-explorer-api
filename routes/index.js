const router = require('express').Router();
const { signupValidator, signinValidator } = require('../utils/validation');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');

router.post('/signin', signinValidator, login);
router.post('/signup', signupValidator, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
module.exports = router;
