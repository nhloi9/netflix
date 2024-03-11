import React, {useEffect, useMemo, useState} from 'react';
import Layout from '../Layout/Layout';
import MovieInfo from '../Components/SingleMovie/MovieInfo';
import MovieCast from '../Components/SingleMovie/MovieCast';
import MovieReview from '../Components/SingleMovie/MovieReview';
import {useParams} from 'react-router-dom';
import RelateMovies from '../Components/SingleMovie/RelateMovies';
import {api} from '../Redux/Api/axios';
import toast from 'react-hot-toast';
import {messageFromError} from '../Redux/Protection';

const SingleMoviePage = () => {
	const {slug} = useParams();
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		api
			.get('/movies/' + slug)
			.then(({data}) => {
				setMovie(data);
			})
			.catch((err) => {
				toast.error(messageFromError(err));
			});
	}, [slug]);

	return (
		<Layout>
			{movie && (
				<div className="">
					<MovieInfo movie={movie} />
					<MovieCast casts={movie?.casts} />
					<MovieReview
						movie={movie}
						setMovie={setMovie}
					/>
					<RelateMovies />
				</div>
			)}
		</Layout>
	);
};

export default SingleMoviePage;
