import React, {useEffect} from 'react';
import Sidebar from './Sidebar';
import {Button} from 'antd';
import {MoviesData} from '../../Data/MovieData';
import MoviesTable from '../../Components/MoviesTable';
import {useDispatch, useSelector} from 'react-redux';
import {
	deleteFavoriteMoviesAction,
	getAllFavoriteMoviesAction,
} from '../../Redux/Actions/UserActions';
import toast from 'react-hot-toast';

import {UserConstants} from '../../Redux/Constants';

const Favorites = () => {
	const dispatch = useDispatch();
	const {isLoading, isError, movies} = useSelector(
		(state) => state.userGetFavoriteMovies
	);

	const {
		isLoading: deleteLoading,
		isError: deleteError,
		isSuccess: deleteSuccess,
	} = useSelector((state) => state.userDeleteFavoriteMovies);

	const deleteFavoriteMoviesHandler = () => {
		dispatch(deleteFavoriteMoviesAction());
	};

	useEffect(() => {
		if (isError) {
			toast.error(isError);
			dispatch({
				type: UserConstants.GET_FAVORITE_MOVIES_RESET,
			});
		}
	}, [isError, dispatch]);

	useEffect(() => {
		if (deleteError) {
			toast.error(deleteError);
			dispatch({
				type: UserConstants.DELETE_FAVORITE_MOVIES_RESET,
			});
		}
	}, [deleteError, dispatch]);

	useEffect(() => {
		if (deleteSuccess) {
			toast.success('Delete favorite movies successfully');
			dispatch({type: UserConstants.DELETE_FAVORITE_MOVIES_RESET});
		}
	}, [deleteSuccess, dispatch]);

	return (
		<Sidebar>
			<div>
				<div className="flex justify-between">
					<h1 className="text-lg font-bold">Favorites Movies</h1>
					<Button
						color="read"
						style={{background: 'red', color: 'white'}}
						disabled={deleteLoading || movies?.length === 0}
						type="text"
						danger
						className="h-[40px] border-border"
						onClick={deleteFavoriteMoviesHandler}
					>
						{deleteLoading ? 'Deleting...' : 'Delete all'}
					</Button>
				</div>
				<br />
				{isLoading ? <></> : <MoviesTable data={movies} />}
			</div>
		</Sidebar>
	);
};

export default Favorites;
