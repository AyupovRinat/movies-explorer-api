const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const body = { ...req.body, owner: req.user._id };
  Movie
    .create(body)
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie
    .findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => movie.owner.equals(req.user._id))
    .then((match) => {
      if (!match) {
        throw new ForbiddenError('Нет прав для удаления данного фильма');
      }
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
