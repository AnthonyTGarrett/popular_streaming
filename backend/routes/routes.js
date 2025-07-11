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

// Get shows from filtered input
router.post('/search/filters/', getShowFromFilter);

router.get('/search/title/:title', getShowFromTitle);

router.get('/top/series/:series', getTopSeries);

router.get('/top/movies/:movie', getTopMovies);

router.get('/genres/getAllGenres', getAllGenres);

export default router;
