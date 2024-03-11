import {BrowserRouter, Route, Routes} from 'react-router-dom';

import HomeScreen from './Screens/HomeScreen';
import NotFound from './Screens/NotFound';
import AboutUsPage from './Screens/AboutUsPage';
import ContactUsPage from './Screens/ContactUsPage';
import MoviesPage from './Screens/MoviesPage';
import SingleMoviePage from './Screens/SingleMoviePage';
import WatchPage from './Screens/WatchPage';
import Login from './Screens/Login';
import Favorites from './Screens/Dashboard/Favorites';
import Profile from './Screens/Dashboard/Profile';
import ChangePassword from './Screens/Dashboard/ChangePassword';
import MoviesList from './Screens/Dashboard/MoviesList';
import Dashboard from './Screens/Dashboard';
import Categories from './Screens/Categories';
import Toast from './Components/Notifications/Toast';
import ScrollTop from './Components/ScrollTop';
import Register from './Screens/Register';
import {
	AdminProtectedRouter,
	UserProtectedRouter,
} from './Components/ProtectedRouter';
import Users from './Screens/Dashboard/Admin/Users';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFavoriteMoviesAction} from './Redux/Actions/UserActions';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import {getAllCategoriesAction} from './Redux/Actions/CategoryActions';

function App() {
	const {userInfo} = useSelector((state) => state.userLogin);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllFavoriteMoviesAction());
		dispatch(getAllCategoriesAction());
	}, [dispatch, userInfo?._id]);

	return (
		<div className="App bg-main min-h-screen !text-white">
			<BrowserRouter>
				<ScrollTop />
				<Routes>
					<Route
						path="/"
						element={<HomeScreen />}
					/>

					<Route
						path="/about-us"
						element={<AboutUsPage />}
					/>
					<Route
						path="/contact-us"
						element={<ContactUsPage />}
					/>
					<Route
						path="/movies"
						element={<MoviesPage />}
					/>
					<Route
						path="/movie/:slug"
						element={<SingleMoviePage />}
					/>
					<Route
						path="/watch/:slug"
						element={<WatchPage />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>

					<Route
						path="/register"
						element={<Register />}
					/>

					<Route
						// path="/"
						element={<UserProtectedRouter />}
					>
						<Route
							path="/favorites-movies"
							element={<Favorites />}
						/>
						<Route
							path="/profile"
							element={<Profile />}
						/>
						<Route
							path="/password"
							element={<ChangePassword />}
						/>
						<Route
							path="/"
							element={<AdminProtectedRouter />}
						>
							<Route
								path="/dashboard"
								element={<Dashboard />}
							/>

							<Route
								path="/categories"
								element={<Categories />}
							/>
							<Route
								path="/add-movie"
								element={<AddMovie />}
							/>

							<Route
								path="/movies-list"
								element={<MoviesList />}
							/>
							<Route
								path="/users"
								element={<Users />}
							/>
						</Route>
					</Route>

					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
				<Toast />
			</BrowserRouter>
		</div>
	);
}

export default App;
