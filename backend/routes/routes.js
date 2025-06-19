import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
const router = express.Router();

// Get a single post
// Only passing next because of the error middleware
router.get('/:id', getShowFromId);

// Create a new Post
router.get('/search/filters/:filter', getShowFromFilter);

// Update Post
router.get('/search/title/:title', getShowFromTitle);

// Delete Post
router.delete('/top/:network', getTopShows);

export default router;
