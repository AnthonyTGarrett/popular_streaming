import express from 'express';
import {
  getShowFromId,
  getShowFromFilter,
  getShowFromTitle,
  getTopShows,
} from '../controllers/postController.js';
const router = express.Router();

// Get a show from the ID
router.get('/:id', getShowFromId);

// Get shows from filtered input
router.post('/search/filters/:filter', getShowFromFilter);

// Update Post
router.get('/search/title/:title', getShowFromTitle);

// Delete Post
router.get('/top/:network', getTopShows);

export default router;
