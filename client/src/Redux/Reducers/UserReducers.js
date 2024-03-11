import {createReducer} from '@reduxjs/toolkit';
import {UserConstants} from '../Constants';

const initialState = {
	// userInfo: localStorage.getItem('user')
	// 	? JSON.parse(localStorage.getItem('user'))
	// 	: null,
};

export const loginReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(UserConstants.USER_LOGIN_REQUEST, (state, action) => {
			return {
				isLoading: true,
			};
		})
		.addCase(UserConstants.USER_LOGIN_SUCCESS, (state, action) => {
			return {isLoading: false, isSuccess: true, userInfo: action.payload};
		})
		.addCase(UserConstants.USER_LOGIN_FAIL, (state, action) => {
			return {
				isLoading: false,
				isError: action.payload,
			};
		})
		.addCase(UserConstants.USER_DELETE_PROFILE_SUCCESS, (state, action) => {
			state.userInfo = null;
		})
		.addCase(UserConstants.USER_REGISTER_SUCCESS, (state, action) => {
			state.userInfo = action.payload;
		})
		.addCase(UserConstants.USER_UPDATE_PROFILE_SUCCESS, (state, action) => {
			state.userInfo = {...state.userInfo, ...action.payload};
		})
		.addCase(UserConstants.USER_LOGOUT, (state, action) => {
			return {};
		})
		.addCase(UserConstants.USER_lOGIN_RESET, (state, action) => {
			state.isLoading = null;
			state.isSuccess = null;
			state.isError = null;
		});
});

export const registerReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(UserConstants.USER_REGISTER_REQUEST, (state, action) => {
			return {
				isLoading: true,
			};
		})
		.addCase(UserConstants.USER_REGISTER_SUCCESS, (state, action) => {
			return {isLoading: false, isSuccess: true};
		})
		.addCase(UserConstants.USER_REGISTER_FAIL, (state, action) => {
			return {
				isLoading: false,
				isError: action.payload,
			};
		})

		.addCase(UserConstants.USER_REGISTER_RESET, (state, action) => {
			return {};
		});
});

export const updateUserProfileReducer = createReducer({}, (builder) => {
	builder
		.addCase(UserConstants.USER_UPDATE_PROFILE_REQUEST, (state, action) => {
			state.isLoading = true;
		})
		.addCase(UserConstants.USER_UPDATE_PROFILE_SUCCESS, (state, action) => {
			return {isLoading: false, isSuccess: true, userInfo: action.payload};
		})
		.addCase(UserConstants.USER_UPDATE_PROFILE_FAIL, (state, action) => {
			return {
				isLoading: false,
				isError: action.payload,
			};
		})
		.addCase(UserConstants.USER_UPDATE_PROFILE_RESET, (state, action) => {
			return {};
		});
});

export const deleteUserProfileReducer = createReducer({}, (builder) => {
	builder
		.addCase(UserConstants.USER_DELETE_PROFILE_REQUEST, (state, action) => {
			state.isLoading = true;
		})
		.addCase(UserConstants.USER_DELETE_PROFILE_SUCCESS, (state, action) => {
			return {
				isLoading: false,
			};
		})
		.addCase(UserConstants.USER_DELETE_PROFILE_FAIL, (state, action) => {
			return {isLoading: false, isError: action.payload};
		});
});

export const userChangePasswordReducer = createReducer({}, (builder) => {
	builder
		.addCase(UserConstants.USER_CHANGE_PASSWORD_REQUEST, (state, action) => {
			state.isLoading = true;
		})
		.addCase(UserConstants.USER_CHANGE_PASSWORD_SUCCESS, (state, action) => {
			state.isSuccess = true;
			state.isLoading = false;
		})
		.addCase(UserConstants.USER_CHANGE_PASSWORD_FAIL, (state, action) => {
			state.isLoading = false;
			state.isError = action.payload;
		})
		.addCase(UserConstants.USER_CHANGE_PASSWORD_RESET, (state, action) => {
			return {};
		});
});

export const getFavoriteMoviesReducer = createReducer(
	{movies: []},
	(builder) => {
		builder
			.addCase(UserConstants.GET_FAVORITE_MOVIES_REQUEST, (state, action) => {
				state.isLoading = true;
			})
			.addCase(UserConstants.GET_FAVORITE_MOVIES_SUCCESS, (state, action) => {
				state.isLoading = false;

				state.movies = action.payload;
			})
			.addCase(UserConstants.GET_FAVORITE_MOVIES_FAIL, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload;
			})
			.addCase(UserConstants.DELETE_FAVORITE_MOVIES_SUCCESS, (state, action) => {
				state.movies = [];
			})

			.addCase(UserConstants.GET_FAVORITE_MOVIES_RESET, (state, action) => {
				return {};
			});
	}
);

export const userDeleteFavariteMoviesReducer = createReducer({}, (builder) => {
	builder
		.addCase(UserConstants.DELETE_FAVORITE_MOVIES_REQUEST, (state, action) => {
			state.isLoading = true;
		})
		.addCase(UserConstants.DELETE_FAVORITE_MOVIES_SUCCESS, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
		})
		.addCase(UserConstants.DELETE_FAVORITE_MOVIES_FAIL, (state, action) => {
			state.isLoading = false;
			state.isError = action.payload;
		})
		.addCase(UserConstants.GET_FAVORITE_MOVIES_RESET, (state, action) => {
			return {};
		});
});

export const adminGetAllUsersReducer = createReducer({users: []}, (builder) => {
	builder
		.addCase(UserConstants.GET_ALL_USERS_REQUEST, (state, action) => {
			state.isLoading = true;
		})
		.addCase(UserConstants.GET_ALL_USERS_SUCCESS, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.users = action.payload;
		})
		.addCase(UserConstants.GET_ALL_USERS_FAIL, (state, action) => {
			state.isLoading = false;
			state.isError = action.payload;
		})
		.addCase(UserConstants.DELETE_USER_SUCCESS, (state, action) => {
			state.users = state.users.filter((user) => user._id !== action.payload);
		})
		.addCase(UserConstants.GET_FAVORITE_MOVIES_RESET, (state, action) => {
			state.users = [];
		});
});

export const adminDeleteUserReducer = createReducer({}, (builder) => {
	builder
		.addCase(UserConstants.DELETE_USER_REQUEST, (state, action) => {
			state.isLoading = true;
		})
		.addCase(UserConstants.DELETE_USER_SUCCESS, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
		})

		.addCase(UserConstants.DELETE_USER_FAIL, (state, action) => {
			state.isLoading = false;
			state.isError = action.payload;
		})
		.addCase(UserConstants.DELETE_USER_RESET, (state, action) => {
			return {};
		});
});
