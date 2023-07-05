const router = require('express').Router();

const userRoutes = require('./users');

const cardRoutes = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

router.use(userRoutes);
router.use(cardRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не существует'));
});

module.exports = router;
