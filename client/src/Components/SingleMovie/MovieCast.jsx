import React from 'react';
import Title from '../Title';
import {FiUsers} from 'react-icons/fi';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';

const MovieCast = ({casts}) => {
	return (
		<div className="container mx-auto px-2 py-6">
			<Title
				Icon={FiUsers}
				text="Casts"
			/>
			<br />
			<Swiper
				autoplay={{
					delay: 1000,
				}}
				loop={true}
				speed={1000}
				modules={[Autoplay]}
				spaceBetween={10}
				breakpoints={{
					0: {
						slidesPerView: 1,
					},
					400: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
					1280: {
						slidesPerView: 5,
					},
				}}
			>
				{casts?.map((user, index) => (
					<SwiperSlide>
						<div className=" p-3 italic border border-gray-500 flex flex-col items-center rounded">
							<img
								src={user.image}
								alt=""
								className=" w-full h-[250px]  rounded object-cover block"
							/>
							<h1 className="pt-2">{user.name}</h1>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default MovieCast;
