import expressAsyncHandler from 'express-async-handler';
import Category from '../Models/CategoryModel.js';
import createHttpError from 'http-errors';

const createCategory = expressAsyncHandler(async (req, res, next) => {
	const {title} = req.body;
	const existingCategory = await Category.findOne({title});
	if (existingCategory !== null) {
		return next(createHttpError(400, 'Category already exists'));
	}
	const category = await Category.create({title});
	res.status(200).json(category);
});

const getAllCategories = expressAsyncHandler(async (req, res, next) => {
	const categories = await Category.find({});
	res.status(200).json(categories);
});
const deleteCategory = expressAsyncHandler(async (req, res, next) => {
	const category = await Category.findByIdAndDelete(req.params.id);
	if (!category) {
		return next(createHttpError(404, 'Category not found'));
	}
	res.status(200).json({
		message: 'Category deleted',
	});
});

export {createCategory, getAllCategories, deleteCategory};
