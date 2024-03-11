import User from '../Models/UserModel.js';

//protected middleware

import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

export const protect = expressAsyncHandler(async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		const token = req.headers.authorization.split(' ')[1];
		try {
			const decode = jwt.verify(token, process.env.SECRET_KEY);
			const user = await User.findById(decode.id).select('-password');
			if (!user) return next(createHttpError(404, 'User not found'));
			req.user = user;
			next();
		} catch (error) {
			next(createHttpError(401, 'Unauthorized'));
		}
	} else {
		next(createHttpError(401, 'Unauthorized'));
	}
});

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) next();
	else {
		next(createHttpError(401, 'Role is not admin'));
	}
};
