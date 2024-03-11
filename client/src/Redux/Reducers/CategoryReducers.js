import {createReducer} from '@reduxjs/toolkit';
import {CategoryConstants} from '../Constants';

export const getAllCategoriesReducer = createReducer(
	{categories: []},
	(builder) => {
		builder
			.addCase(CategoryConstants.GET_ALL_CATEGORIES_REQUEST, (state, action) => {
				state.isLoading = true;
			})
			.addCase(CategoryConstants.GET_ALL_CATEGORIES_SUCCESS, (state, action) => {
				return {isLoading: false, isSuccess: true, categories: action.payload};
			})
			.addCase(CategoryConstants.GET_ALL_CATEGORIES_FAIL, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload;
			})
			.addCase(CategoryConstants.CREATE_CATEGORY_SUCCESS, (state, action) => {
				state.categories = [...state.categories, action.payload];
			})

			.addCase(CategoryConstants.GET_ALL_CATEGORIES_RESET, (state, action) => {
				return {categories: []};
			});
	}
);

export const createCategoryReducer = createReducer({}, (builder) => {
	builder
		.addCase(CategoryConstants.CREATE_CATEGORY_REQUEST, (state, action) => {
			return {
				isLoading: true,
			};
		})
		.addCase(CategoryConstants.CREATE_CATEGORY_SUCCESS, (state, action) => {
			return {isLoading: false, isSuccess: true};
		})
		.addCase(CategoryConstants.CREATE_CATEGORY_FAIL, (state, action) => {
			return {
				isLoading: false,
				isError: action.payload,
			};
		})

		.addCase(CategoryConstants.CREATE_CATEGORY_RESET, (state, action) => {
			return {};
		});
});

export const deleteCategoryReducer = createReducer({}, (builder) => {
	builder
		.addCase(CategoryConstants.DELETE_CATEGORY_REQUEST, (state, action) => {
			return {
				isLoading: true,
			};
		})
		.addCase(CategoryConstants.DELETE_CATEGORY_SUCCESS, (state, action) => {
			return {isLoading: false, isSuccess: true};
		})
		.addCase(CategoryConstants.DELETE_CATEGORY_FAIL, (state, action) => {
			return {
				isLoading: false,
				isError: action.payload,
			};
		})
		.addCase(CategoryConstants.DELETE_CATEGORY_RESET, (state, action) => {
			return {};
		});
});
