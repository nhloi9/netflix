import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

import User from '../Models/UserModel.js';
import {signToken} from '../util/SignToken.js';

//@ desc Register user
//Router POST /api/users
//@access public
const register = asyncHandler(async (req, res, next) => {
	const {email, password, fullName} = req.body;
	const existingUser = await User.findOne({email});

	if (existingUser) {
		return next(createError(400, 'Already existing user'));
	}
	const user = (
		await User.create({
			email,
			password: bcrypt.hashSync(password, 10),
			fullName,
		})
	).toObject();
	delete user.password;
	res.status(201).json({
		success: true,
		user: {...user, token: signToken({id: user._id, role: user.role})},
	});
});

//@desc Login user
//@router  Post /api/users/login
//@access public
const login = asyncHandler(async (req, res, next) => {
	const {email, password} = req.body;
	const user = await User.findOne({email});
	if (!user) {
		return next(createError(404, 'User not found'));
	}
	const matchPassword = bcrypt.compareSync(password, user.password);
	if (!matchPassword) return next(createError(401, 'Password incorrect'));
	const plainUser = user.toObject();
	delete plainUser.password;
	res.status(200).json({
		message: 'Login successful',
		user: {
			...plainUser,
			token: signToken({
				id: user._id,
				role: user.role,
			}),
		},
	});
});

//************** Private router****************************/

// @desc update user profile
//@router PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
	const {fullName, email, image} = req.body;
	let updatedUser = await User.findByIdAndUpdate(
		req.user._id,
		{fullName, email, image},
		{
			returnDocument: 'after',
		}
	).lean();
	if (updatedUser) {
		delete updatedUser.password;
		return res.status(200).json({
			message: 'User profile updated successfully',
			user: {
				...updatedUser,
				token: signToken({
					id: updatedUser._id,
					role: updatedUser.role,
				}),
			},
		});
	}
	next(createError(404, 'User not found'));
});

const deleteUser = asyncHandler(async (req, res, next) => {
	await User.deleteOne({
		_id: req.user._id,
	});

	res.json({message: 'User deleted successfully'});
});

const changePassword = asyncHandler(async (req, res, next) => {
	const {oldPassword, newPassword, confirmPassword} = req.body;
	if (newPassword !== confirmPassword)
		return next('Confirm password not match with the new password');
	const user = await User.findById(req.user._id);
	if (!user) return next(createError(404, 'User not found'));
	const matchPassword = bcrypt.compareSync(oldPassword, user.password);
	if (!matchPassword) return next(createError(400, 'Password incorrect'));
	user.password = bcrypt.hashSync(newPassword, 10);
	await user.save();
	res.status(200).json({message: 'Password changed successfully'});
});

const getLikedMovies = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id).populate('likedMovies');
	if (!user) return next(createError(404, 'User not found'));
	res.status(200).json(user.likedMovies);
});

const likeMovie = asyncHandler(async (req, res, next) => {
	const {movieId} = req.body;
	const user = await User.findById(req.user._id);
	if (user) {
		if (user.likedMovies.includes(movieId))
			return next(createError(400, 'you already liked this movie'));
	}
	await User.updateOne(
		{_id: req.user._id},
		{
			$addToSet: {
				likedMovies: movieId,
			},
		}
	);
	res.json({
		message: 'Like movie successfully',
	});
});

const unlikeMovie = asyncHandler(async (req, res, next) => {
	const {movieId} = req.body;
	const user = await User.findOneAndUpdate(
		{
			_id: req.user._id,
		},
		{
			$pull: {
				likedMovies: movieId,
			},
		}
	);
	if (!user) return next(createError(404, 'User not found'));
	res.status(200).json({message: 'Unlike movie successfully'});
});

const unlikeAllMovies = asyncHandler(async (req, res, next) => {
	await User.findOneAndUpdate(
		{_id: req.user._id},
		{
			$set: {
				likedMovies: [],
			},
		}
	);
	res.json({
		message: 'Unlike movies successfully',
	});
});

// admin controller
const getUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find({});
	res.json(users);
});

const admindeleteUser = asyncHandler(async (req, res, next) => {
	const {userId} = req.params;
	const user = await User.findByIdAndDelete(userId);
	if (!user) return next(createError(404, 'User not found'));
	res.status(200).json({
		message: 'User deleted successfully',
	});
});

export {
	register,
	login,
	updateUserProfile,
	deleteUser,
	changePassword,
	getLikedMovies,
	likeMovie,
	unlikeMovie,
	unlikeAllMovies,
	getUsers,
	admindeleteUser,
};
