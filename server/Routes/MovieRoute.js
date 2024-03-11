import express from 'express';

import {
	createMovie,
	createMovieReview,
	getMovieBySlug,
	getMovies,
	getRandomMovies,
	getTopRatedMovies,
	importMovies,
	updateMovie,
	getAllLanguages,
} from '../Controllers/MovieController.js';
import {isAdmin, protect} from '../middleware/Auth.js';

const router = express.Router();

router.post('/import', protect, isAdmin, importMovies);
router.get('/', getMovies);
router.get('/top-rate', getTopRatedMovies);
router.get('/languages', getAllLanguages);
router.get('/random', getRandomMovies);
router.get('/:slug', getMovieBySlug);
router.post('/:id/review', protect, createMovieReview);

router.post(
	'/',
	protect,
	isAdmin,
	// upload.single('file'),
	createMovie
);

router.put('/:id', protect, isAdmin, updateMovie);

export default router;
