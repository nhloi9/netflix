import React, {useEffect, useState} from 'react';
import Layout from '../Layout/Layout';
import Movies from '../Components/Movies';
import Filter from '../Components/Filter';
import {useSearchParams} from 'react-router-dom';
import {api} from '../Redux/Api/axios';
import toast from 'react-hot-toast';
import {messageFromError} from '../Redux/Protection';
import Loading from '../Components/Notifications/Loading';
import {Pagination} from 'antd';
import queryString from 'query-string';

const MoviesPage = () => {
	let [searchParams, setSearchParams] = useSearchParams();

	const [movies, setMovies] = useState([]);
	const [total, setTotal] = useState(0);

	const page = searchParams.get('page') ?? 1;
	const search = searchParams.get('search');
	const category = searchParams.get('category');
	const language = searchParams.get('language');
	const year = searchParams.get('year');

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const queryObject = {
			search,
			page,
			year,
			category,
			language,
		};
		setLoading(true);
		api
			.get(`movies?` + queryString.stringify(queryObject))
			.then((response) => {
				const {movies, totalMovies} = response.data;
				setMovies(movies);
				setTotal(totalMovies);
				setLoading(false);
			})
			.catch((err) => {
				toast.error(messageFromError(err));
				setMovies([]);
				setLoading(false);
			});
	}, [page, search, year, category, language]);

	return (
		<Layout>
			<div className="bg-main  container mx-auto p-2 py-6">
				<Filter />
				<br />
				<div className="min-h-[80vh]">
					{loading ? <Loading /> : <Movies movies={movies}></Movies>}
				</div>
				<div className="flex justify-center py-3">
					<Pagination
						pageSize={5}
						simple
						current={page}
						total={total}
						onChange={(value) => {
							setSearchParams((searchParams) => {
								if (value) {
									searchParams.set('page', value);
								} else {
									searchParams.delete('page');
								}
								return searchParams;
							});
						}}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default MoviesPage;
