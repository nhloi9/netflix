import express from 'express';
import {
	admindeleteUser,
	changePassword,
	deleteUser,
	getLikedMovies,
	getUsers,
	likeMovie,
	login,
	register,
	unlikeAllMovies,
	unlikeMovie,
	updateUserProfile,
} from '../Controllers/UserController.js';
import {isAdmin, protect} from '../middleware/Auth.js';
// import {register} from '../Controllers/UserController';

const router = express.Router();

//Public routes
router.post('/register', register);
router.post('/login', login);

//Private routes
router.put('/', protect, updateUserProfile);
router.delete('/', protect, deleteUser);
router.put('/password', protect, changePassword);
router.get('/favorites', protect, getLikedMovies);
router.post('/favorites', protect, likeMovie);
router.delete('/favorites', protect, unlikeMovie);
router.delete('/favorites/all', protect, unlikeAllMovies);

// Admin routes
router.get('/all', protect, isAdmin, getUsers);
router.delete('/:userId', protect, isAdmin, admindeleteUser);

export default router;
