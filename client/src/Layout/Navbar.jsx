import React, {useState} from 'react';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineUser, AiFillHeart} from 'react-icons/ai';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const navData = [
	{id: 1, title: 'Movies', url: '/movies'},
	{id: 2, title: 'About Us', url: '/about-us'},
	{id: 3, title: 'Contact Us', url: '/contact-us'},
];

const Navbar = () => {
	const navigate = useNavigate();
	const {userInfo} = useSelector((state) => state.userLogin);
	const {movies} = useSelector((state) => state.userGetFavoriteMovies);
	const [search, setSearch] = useState('');

	const hover = 'hover:text-subMain text-white transitions';
	const Hover = ({isActive}) => (isActive ? 'text-subMain' : hover);
	return (
		<div className="shadow-md sticky top-0 z-20 bg-main">
			<div className=" container mx-auto px-2 py-6 lg:grid grid-cols-7 gap-10 justify-between items-center h-[100px] pt">
				{/* logo */}
				<Link
					to="/"
					className=" col-span-1 hidden lg:block"
				>
					<img
						src="/asset/logo1.png"
						className="h-[50px]"
						alt=""
					/>
				</Link>

				{/* search */}
				<form
					onSubmit={(e) => {
						e.preventDefault();

						if (search?.trim()) navigate(`/movies?search=${search.trim()}`);
					}}
					action=""
					className=" w-full lg:col-span-3 bg-white h-[50px] flex rounded-md"
				>
					<button
						type="submit"
						className=" block w-[50px] h-full  flex-rows bg-orange-600 rounded-l-md"
					>
						<BsSearch size={18} />
					</button>
					<input
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						placeholder="enter to search "
						type="text"
						className=" text-black pl-2 block w-full rounded-r-md hover:text-border"
					/>
				</form>

				{/* menu */}
				<div className="hidden   lg:col-span-3 lg:flex  justify-between  items-center">
					{navData.map((item) => {
						return (
							<NavLink
								key={item.url}
								to={item.url}
								className={Hover}
							>
								{item.title}
							</NavLink>
						);
					})}
					<NavLink
						to={'/login'}
						className={Hover}
					>
						{userInfo?.image ? (
							<img
								src={userInfo.image}
								className="w-[30px] h-[30px] rounded-full"
								alt=""
							/>
						) : (
							<AiOutlineUser size={22} />
						)}
					</NavLink>
					<NavLink
						to={'/favorite'}
						className={`${Hover} relative`}
					>
						<AiFillHeart size={22} />
						<div className="rounded-full bg-subMain flex justify-center items-center absolute w-4 h-4 -top-2 -right-2">
							<span className=" text-[12px]">{movies?.length}</span>
						</div>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
