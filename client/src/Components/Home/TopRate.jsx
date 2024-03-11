import React, {useEffect, useState} from 'react';
import Title from '../Title';
import {BsFillBookmarkFill} from 'react-icons/bs';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {AiFillHeart} from 'react-icons/ai';
import {Rating} from '@mui/material';
import {api} from '../../Redux/Api/axios';
import toast from 'react-hot-toast';
import {messageFromError} from '../../Redux/Protection';

const TopRate = () => {
	const [movies, setMovies] = useState([]);
	useEffect(() => {
		api
			.get(`movies/top-rate`)
			.then(({data}) => {
				setMovies(data);
			})
			.catch((err) => {
				toast.error(messageFromError(err));
				setMovies([]);
			});
	}, []);
	return (
		<div className="my-16">
			<Title
				Icon={BsFillBookmarkFill}
				text="Top Rate"
			/>
			<br />
			<div>
				<Swiper
					slidesPerView={1}
					spaceBetween={30}
					loop={true}
					pagination={{
						clickable: true,
					}}
					autoplay={{delay: 3000}}
					speed={1000}
					navigation={true}
					modules={[Pagination, Navigation, Autoplay]}
					className=""
					breakpoints={{
						// when window width is >= 640px
						640: {
							// width: 640,
							slidesPerView: 2,
						},
						// when window width is >= 768px
						1000: {
							// width: 768,
							slidesPerView: 3,
						},
						1200: {
							// width: 768,
							slidesPerView: 4,
						},
					}}
				>
					{movies.map((moive, index) => (
						<SwiperSlide key={index}>
							<div className="h-rate p-4 bg-dry rounded-md border-gray-500 border relative group">
								<img
									src={moive.titleImage}
									className=" block rounded-md w-full h-full object-cover "
									alt=""
								/>
								<div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer   bg-[#0000009c]  gap-4 group-hover:flex justify-center items-center flex-col hidden  transition duration-2000">
									<AiFillHeart size={20} />
									<h1 className="font-bold text-[20px]">{moive.name}</h1>
									<Rating
										precision={0.1}
										value={moive.rate}
										// disabled
										readOnly
										className=""
									/>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default TopRate;
