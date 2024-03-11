import {api} from './axios';

export const getAllCategoriesService = async (token) => {
	const {data} = await api.get(`/categories`, {
		headers: {Authorization: `Bearer ${token}`},
	});
	return data;
};

export const deleteCategoryService = async (token, id) => {
	await api.delete(`/categories/${id}`, {
		headers: {Authorization: `Bearer ${token}`},
	});
};

export const createCategoryService = async (token, title) => {
	const {data} = await api.post(
		`/categories`,
		{title},
		{
			headers: {Authorization: `Bearer ${token}`},
		}
	);
	return data;
};
