import axios from 'axios';
import {store} from '../Store';

// store
// store.subscribe(listener);

// function select(state) {
// 	return state.userLogin?.userInfo?.token || '';
// }

// function listener() {
// 	let token = select(store.getState());
// 	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// }

// configuration
export const api = axios.create({
	baseURL: 'http://localhost:3333/api',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 100000,
});
api.interceptors.request.use(function (config) {
	let token = store.getState().userLogin?.userInfo?.token ?? '';
	config.headers['Authorization'] = 'Bearer ' + token;
	return config;
});
