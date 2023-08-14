const router = require('express').Router();
const {
  getMovies, addMovie, delMovie,
} = require('../controllers/movies');
const {
  createMovieValidator, delMovieIdValidator,
} = require('../validators/validators');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidator, addMovie);
router.delete('/movies/:_id', delMovieIdValidator, delMovie);

module.exports = router;
