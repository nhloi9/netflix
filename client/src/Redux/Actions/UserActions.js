import {UserConstants} from '../Constants';
import {UserApi} from '../Api';
import {ErrorsAction, tokenProtection} from '../Protection';
import toast from 'react-hot-toast';

export const loginAction = (datas) => async (dispatch, getState) => {
	try {
		dispatch({type: UserConstants.USER_LOGIN_REQUEST});
		const respponse = await UserApi.loginService(datas);
		dispatch({type: UserConstants.USER_LOGIN_SUCCESS, payload: respponse.user});
	} catch (error) {
		ErrorsAction(error, dispatch, UserConstants.USER_LOGIN_FAIL);
	}
};

export const registerAction = (datas) => async (dispatch, getState) => {
	try {
		dispatch({type: UserConstants.USER_REGISTER_REQUEST});
		const response = await UserApi.registerService(datas);
		dispatch({type: UserConstants.USER_REGISTER_SUCCESS, payload: response.user});
	} catch (error) {
		ErrorsAction(error, dispatch, UserConstants.USER_REGISTER_FAIL);
	}
};

export const logoutAction = () => async (dispatch, getState) => {
	UserApi.logoutService();
	dispatch({type: UserConstants.USER_LOGOUT});
	// dispatch({type: UserConstants.USER_lOGIN_RESET});
	// dispatch({type: UserConstants.USER_REGISTER_RESET});
};

export const updateUserProfileAction = (data) => async (dispatch, getState) => {
	try {
		dispatch({type: UserConstants.USER_UPDATE_PROFILE_REQUEST});
		const response = await UserApi.updateUserService(data);
		dispatch({
			type: UserConstants.USER_UPDATE_PROFILE_SUCCESS,
			payload: response.user,
		});
		// dispatch({type: UserConstants.USER_LOGIN_SUCCESS, payload: response.user});
	} catch (error) {
		ErrorsAction(error, dispatch, UserConstants.USER_UPDATE_PROFILE_FAIL);
	}
};

export const deleteProfileAction = () => async (dispatch, getState) => {
	try {
		dispatch({type: UserConstants.USER_DELETE_PROFILE_REQUEST});
		await UserApi.deleteProfileService();
		dispatch({type: UserConstants.USER_DELETE_PROFILE_SUCCESS});
	} catch (error) {
		ErrorsAction(error, dispatch, UserConstants.USER_DELETE_PROFILE_FAIL);
	}
};

export const changePasswordAction = (data) => async (dispatch, getState) => {
	try {
		dispatch({type: UserConstants.USER_CHANGE_PASSWORD_REQUEST});
		await UserApi.changePasswordService(data);
		dispatch({type: UserConstants.USER_CHANGE_PASSWORD_SUCCESS});
	} catch (error) {
		ErrorsAction(error, dispatch, UserConstants.USER_CHANGE_PASSWORD_FAIL);
	}
};

export const getAllFavoriteMoviesAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: UserConstants.GET_FAVORITE_MOVIES_REQUEST,
		});
		const movies = await UserApi.getFavoriteMoviesService();
		dispatch({
			type: UserConstants.GET_FAVORITE_MOVIES_SUCCESS,
			payload: movies,
		});
	} catch (error) {
		ErrorsAction(error, dispatch, UserConstants.GET_FAVORITE_MOVIES_FAIL);
	}
};

export const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: UserConstants.DELETE_FAVORITE_MOVIES_REQUEST,
		});
		await UserApi.deleteFavoriteMoviesService();
		dispatch({
			type: UserConstants.DELETE_FAVORITE_MOVIES_SUCCESS,
		});
	} catch (error) {
		ErrorsAction(error, dispatch, UserConstants.DELETE_FAVORITE_MOVIES_FAIL);
	}
};

export const adminGetAllUsersAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: UserConstants.GET_ALL_USERS_REQUEST,
		});
		const users = await UserApi.adminGetAllUsersService(
			tokenProtection(getState)
			// getState().userLogin?.userInfo?.token
		);
		dispatch({
			type: UserConstants.GET_ALL_USERS_SUCCESS,
			payload: users,
		});
	} catch (error) {
		ErrorsAction(error, dispatch, UserConstants.GET_ALL_USERS_FAIL);
	}
};

export const adminDeleteUserAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UserConstants.DELETE_USER_REQUEST,
		});
		await UserApi.adminDeleteUserService(
			getState().userLogin?.userInfo?.token,
			id
		);
		dispatch({
			type: UserConstants.DELETE_USER_SUCCESS,
			payload: id,
		});
	} catch (error) {
		ErrorsAction(error, dispatch, UserConstants.DELETE_USER_FAIL);
	}
};
