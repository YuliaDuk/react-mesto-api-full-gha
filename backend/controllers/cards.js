const Card = require('../models/card');

const STATUS_OK = 200;

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Заполните обязательные поля'));
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('У вас нет прав на удаление этой карточки');
      }
      Card
        .findByIdAndRemove(req.params.cardId)
        .then((user) => res.status(STATUS_OK).send({ data: user }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new ValidationError('Некорректный id'));
          }
          return next(err);
        });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует!');
      }
      Card
        .findByIdAndUpdate(
          req.params.cardId,
          { $addToSet: { likes: req.user._id } },
          { new: true },
        )
        .then((newcard) => {
          res.status(STATUS_OK).send({ data: newcard });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new ValidationError('Некорректный id'));
          }
          return next(err);
        });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует!');
      }
      return Card
        .findByIdAndUpdate(
          req.params.cardId,
          { $pull: { likes: req.user._id } },
          { new: true },
        )
        .then((newcard) => {
          res.status(STATUS_OK).send({ data: newcard });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new ValidationError('Некорректный id'));
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
