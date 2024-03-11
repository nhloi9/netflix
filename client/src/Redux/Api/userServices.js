import {api} from './axios';

const registerService = async (user) => {
	const {data} = await api.post('/users/register', user);

	if (data) {
		localStorage.setItem('user', JSON.stringify(data.user));
	}
	return data;
};

const logoutService = () => {
	localStorage.removeItem('user');
};

const loginService = async (user) => {
	const {data} = await api.post('/users/login', user);
	if (data) {
		localStorage.setItem('user', JSON.stringify(data.user));
	}
	return data;
};

const updateUserService = async (user) => {
	const {data} = await api.put('/users', user);
	if (data) {
		localStorage.setItem('user', JSON.stringify(data.user));
	}
	return data;
};

const deleteProfileService = async () => {
	await api.delete('/users');
	localStorage.removeItem('user');
};

const changePasswordService = async (data) => {
	const {data: d} = await api.put('/users/password', data);
	return d;
};

const getFavoriteMoviesService = async () => {
	const {data} = await api.get('users/favorites');
	return data;
};

const deleteFavoriteMoviesService = async () => {
	await api.delete('users/favorites/all');
};

// admin
const adminGetAllUsersService = async (token) => {
	const {data} = await api.get('/users/all', {
		headers: {Authorization: `Bearer ${token}`},
	});
	return data;
};

const adminDeleteUserService = async (token, id) => {
	await api.delete('/users/' + id, {
		headers: {Authorization: `Bearer ${token}`},
	});
};

export {
	registerService,
	logoutService,
	loginService,
	updateUserService,
	deleteProfileService,
	changePasswordService,
	getFavoriteMoviesService,
	deleteFavoriteMoviesService,
	adminGetAllUsersService,
	adminDeleteUserService,
};
