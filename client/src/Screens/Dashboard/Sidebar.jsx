import React, {useEffect} from 'react';
import Layout from '../../Layout/Layout';
import {RxDashboard} from 'react-icons/rx';
import {FaHeart, FaListAlt, FaPlusCircle, FaUsers} from 'react-icons/fa';
import {HiViewGridAdd} from 'react-icons/hi';
import {FiSettings} from 'react-icons/fi';
import {RiLockPasswordFill} from 'react-icons/ri';
import {NavLink, useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAction} from '../../Redux/Actions/UserActions';
import toast from 'react-hot-toast';
import {BiLogOut} from 'react-icons/bi';

const Sidebar = ({children}) => {
	const {userInfo} = useSelector((state) => state.userLogin);
	const sideLinks = userInfo
		? userInfo.isAdmin
			? [
					{
						name: 'Dashboard',
						icon: RxDashboard,
						link: '/dashboard',
					},
					{
						name: 'Movies List',
						icon: FaListAlt,
						link: '/movies-list',
					},
					{
						name: 'Add movie',
						icon: FaPlusCircle,
						link: '/add-movie',
					},
					{
						name: 'Categories',
						icon: HiViewGridAdd,
						link: '/categories',
					},
					{
						name: 'Users',
						icon: FaUsers,
						link: '/users',
					},
					{
						name: 'Update profile',
						icon: FiSettings,
						link: '/profile',
					},
					{
						name: 'Favorites Movies',
						icon: FaHeart,
						link: '/favorites-movies',
					},
					{
						name: 'Change Password',
						icon: RiLockPasswordFill,
						link: '/password',
					},
			  ]
			: [
					{
						name: 'Update profile',
						icon: FiSettings,
						link: '/profile',
					},
					{
						name: 'Favorites Movies',
						icon: FaHeart,
						link: '/favorites-movies',
					},
					{
						name: 'Change Password',
						icon: RiLockPasswordFill,
						link: '/password',
					},
			  ]
		: [];

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const Hover = ({isActive}) =>
		isActive
			? 'bg-[#ebb6d0] text-red-500 block w-full p-3  rounded'
			: 'hover:bg-main block w-full p-3 rounded ';

	const logoutHandler = () => {
		dispatch(logoutAction());
		navigate('/login');
		toast.success('logged out successfully');
	};

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}
	}, [navigate, userInfo]);
	return (
		<Layout>
			<div className="min-h-screen container mx-auto px-2 ">
				<div className="lg:grid-cols-7 lg:grid gap-5 h-min">
					<div className="lg:col-span-2 bg-dry rounded-lg h-min p-6  top-[100px] border border-border  ">
						{sideLinks.map((item, index) => (
							<NavLink
								className={Hover}
								to={item.link}
								key={index}
							>
								<div className="flex items-center gap-1">
									<item.icon />
									<h1>{item.name}</h1>
								</div>
							</NavLink>
						))}

						<div
							className="flex items-center gap-1 p-3 hover:bg-main rounded cursor-pointer "
							onClick={logoutHandler}
						>
							<BiLogOut />
							<h1>Logout</h1>
						</div>
					</div>
					<motion.div
						initial={{translateY: 20}}
						animate={{translateY: 0}}
						transition={{duration: 0.4}}
						className="lg:col-span-5 bg-dry rounded-lg  p-6 mt-3 lg:mt-0 mb-4"
					>
						{children}
					</motion.div>
				</div>
			</div>
		</Layout>
	);
};

export default Sidebar;
