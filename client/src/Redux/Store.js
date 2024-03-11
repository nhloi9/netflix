import {configureStore} from '@reduxjs/toolkit';
import * as User from './Reducers/UserReducers';
import * as Category from './Reducers/CategoryReducers';

const getUserFromLocalStorage = () => {
	if (localStorage.getItem('user'))
		return JSON.parse(localStorage.getItem('user'));
	return null;
};

const initialState = {
	userLogin: {
		userInfo: getUserFromLocalStorage(),
	},
};
export const store = configureStore({
	reducer: {
		userLogin: User.loginReducer,
		userRegister: User.registerReducer,
		userUpdateProfile: User.updateUserProfileReducer,
		userDeleteProfile: User.deleteUserProfileReducer,
		userChangePassword: User.userChangePasswordReducer,
		userGetFavoriteMovies: User.getFavoriteMoviesReducer,
		userDeleteFavoriteMovies: User.userDeleteFavariteMoviesReducer,
		adminGetAllUsers: User.adminGetAllUsersReducer,
		adminDeleteUser: User.adminDeleteUserReducer,

		getAllCategories: Category.getAllCategoriesReducer,
		createCategory: Category.createCategoryReducer,
		deleteCategory: Category.deleteCategoryReducer,
	},
	preloadedState: initialState,
});
