const userRouter = require('express').Router();
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const { updateUserValidator } = require('../utils/validation');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserValidator, updateUser);

module.exports = userRouter;
