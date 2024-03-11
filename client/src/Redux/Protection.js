import {logoutAction} from './Actions/UserActions';

export const ErrorsAction = (error, dispatch, action) => {
	const message = messageFromError(error);
	if (message === 'UN AUTHORIZED') {
		dispatch(logoutAction());
	}
	return dispatch({type: action, payload: message});
};

export const messageFromError = (error) => {
	return error.response?.data?.message ?? error.message;
};

//api token protection
export const tokenProtection = (getState) => {
	const {
		userLogin: {userInfo},
	} = getState();
	if (!userInfo?.token) {
		return null;
	} else return userInfo.token;
};
