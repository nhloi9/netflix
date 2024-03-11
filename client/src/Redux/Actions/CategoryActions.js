import {CategoryApi} from '../Api';
import {CategoryConstants} from '../Constants';
import {ErrorsAction, tokenProtection} from '../Protection';

export const getAllCategoriesAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CategoryConstants.GET_ALL_CATEGORIES_REQUEST,
		});
		const categories = await CategoryApi.getAllCategoriesService(
			tokenProtection(getState)
		);
		dispatch({
			type: CategoryConstants.GET_ALL_CATEGORIES_SUCCESS,
			payload: categories,
		});
	} catch (error) {
		ErrorsAction(error, dispatch, CategoryConstants.GET_ALL_CATEGORIES_FAIL);
	}
};

export const deleteCategoryAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CategoryConstants.DELETE_CATEGORY_REQUEST,
		});
		await CategoryApi.deleteCategoryService(tokenProtection(getState), id);
		dispatch({
			type: CategoryConstants.DELETE_CATEGORY_SUCCESS,
		});
	} catch (error) {
		ErrorsAction(error, dispatch, CategoryConstants.DELETE_CATEGORY_FAIL);
	}
};

export const createCategoryAction = (title) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CategoryConstants.CREATE_CATEGORY_REQUEST,
		});
		const category = await CategoryApi.createCategoryService(
			tokenProtection(getState),
			title
		);
		dispatch({
			type: CategoryConstants.CREATE_CATEGORY_SUCCESS,
			payload: category,
		});
	} catch (error) {
		ErrorsAction(error, dispatch, CategoryConstants.CREATE_CATEGORY_FAIL);
	}
};
