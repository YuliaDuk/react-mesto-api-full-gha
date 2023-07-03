const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const {
  getUsers, getUserById, updateUser, updateAvatar, getMyInfo,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getMyInfo);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().pattern(/^https?:\/\/[\w\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]+#?$/),
  }),
}), updateAvatar);

module.exports = router;
