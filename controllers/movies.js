const Movie = require('../models/movie');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const CurrentError = require('../errors/currentErr');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Неверные данные добавлении фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.delMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        next(new NotFound('фильм не найден'));
      } else if (movie.owner.toString() !== req.user._id) {
        next(new CurrentError('Ошибка доступа'));
      } else {
        Movie.deleteOne(movie)
          .then(() => {
            res.status(200).send(movie);
          });
      }
      return false;
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Ошибка в id фильма'));
      } else {
        next(err);
      }
    });
};
