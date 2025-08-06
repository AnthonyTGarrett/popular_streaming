import express from 'express';
import {
  getShowFromId,
  getShowFromFilter,
  getShowFromTitle,
  getTopSeries,
  getTopMovies,
  getAllGenres,
} from '../controllers/showController.js';
const router = express.Router();

// Get a show from the ID
router.get('/:id', getShowFromId);

// Get shows from filtered input that is in the body
router.post('/search/filters/', getShowFromFilter);

// Get shows by searching the title
router.get('/search/title/:title', getShowFromTitle);

// Get top tv shows on the given streaming service
router.get('/top/series/:series', getTopSeries);

// Get top movies on the given streaming service
router.get('/top/movies/:movie', getTopMovies);

// Get all genres available to the shows
router.get('/genres/getAllGenres', getAllGenres);

export default router;
