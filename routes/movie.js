const movieRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { movieIdValidator, createMovieValidator } = require('../utils/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidator, createMovie);
movieRouter.delete('/:movieId', movieIdValidator, deleteMovie);

module.exports = movieRouter;
