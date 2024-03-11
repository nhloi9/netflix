import React, {useEffect, useMemo, useState} from 'react';
import {Select, Space} from 'antd';
import {useSelector} from 'react-redux';
import {api} from '../Redux/Api/axios';
import {messageFromError} from '../Redux/Protection';
import {useSearchParams} from 'react-router-dom';

const Filter = () => {
	const [languages, setLanguages] = useState([]);
	const {categories} = useSelector((state) => state.getAllCategories);
	let [searchParams, setSearchParams] = useSearchParams();

	const category = searchParams.get('category');
	const language = searchParams.get('language');
	const year = searchParams.get('year');

	useEffect(() => {
		api
			.get('/movies/languages')
			.then(({data}) => setLanguages(data))
			.catch((err) => console.log(messageFromError(err)));
	}, []);

	const yearOptions = useMemo(() => {
		const arr = [];
		for (let i = new Date().getFullYear(); i > 1990; i--) {
			arr.push({value: i, label: i});
		}
		return arr;
	}, []);
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
			<Select
				value={category}
				className="h-10 !bg-dry"
				placeholder="Sort by category"
				options={categories?.map((category) => ({
					label: category.title,
					value: category.title,
				}))}
				allowClear={true}
				onChange={(value) =>
					setSearchParams((searchParams) => {
						if (value) {
							searchParams.set('category', value);
						} else {
							searchParams.delete('category');
						}
						return searchParams;
					})
				}
			/>
			<Select
				value={language}
				className="h-10 !bg-dry"
				placeholder="Sort by language"
				options={languages?.map((language) => ({
					label: language,
					value: language,
				}))}
				allowClear={true}
				onChange={(value) =>
					setSearchParams((searchParams) => {
						if (value) {
							searchParams.set('language', value);
						} else {
							searchParams.delete('language');
						}
						return searchParams;
					})
				}
			/>
			<Select
				value={year}
				className="h-10 !bg-dry"
				placeholder="Sort by year"
				options={yearOptions}
				allowClear={true}
				onChange={(value) =>
					setSearchParams((searchParams) => {
						if (value) {
							searchParams.set('year', value);
						} else {
							searchParams.delete('year');
						}
						return searchParams;
					})
				}
			/>
		</div>
	);
};

export default Filter;
