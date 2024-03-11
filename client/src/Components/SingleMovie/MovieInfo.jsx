import {Button} from 'antd';
import React from 'react';
import {AiOutlineClockCircle, AiOutlineShareAlt} from 'react-icons/ai';
import {BiSolidRightArrow} from 'react-icons/bi';
import {SlCalender} from 'react-icons/sl';
import {Link} from 'react-router-dom';

const MovieInfo = ({movie}) => {
	return (
		<div className="relative">
			<img
				src={movie.titleImage}
				className="hidden lg:block w-full opacity-20"
				alt=""
			/>
			<div className=" container lg:absolute top-0 left-0 bottom-0 right-0 min-h-[80vh] mx-auto px-2 py-6 grid grid-cols-3 lg:gap-8  gap-3">
				<div className=" col-span-3  lg:col-span-1 flex items-center order-1 lg:-order-1">
					<img
						src={movie.titleImage}
						className="block w-full h-[500px] col-span-3 order-1 object-cover  rounded-md "
						alt=""
					/>
				</div>
				<div className="col-span-3 md:flex justify-between items-center lg:col-span-2  ">
					<div className="w-full  md:w-[60%] flex flex-col py-6 justify-center gap-6">
						<h1 className="font-extrabold text-xl">{movie.name}</h1>
						<div className="flex gap-4 ">
							<h1 className="">{movie.category}</h1>
							<div className="flex">
								<SlCalender className="mr-1 translate-y-[3px]" />
								<span>{' ' + movie.year}</span>
							</div>
							<div className="flex">
								<AiOutlineClockCircle className="mr-1 translate-y-[3px]" />
								<p>{movie.time}</p>
							</div>
						</div>
						<p>
							Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod There
							are many variations of passages of lorem Ipsum available, but the
							majority have suffered alteration.
						</p>
						<div className="flex justify-between items-center bg-main p-6 rounded-md">
							<div className="pr-6 border-r border-r-gray-200">
								<div className="flex-colo p-3 bg-gray-600  rounded-md">
									<AiOutlineShareAlt className="text-gray-100 text-lg" />
								</div>
							</div>
							<div>Language : English</div>
							<Link to={`/watch/${movie.name}`}>
								<Button
									type="default"
									danger
									className="rounded-xl"
									icon={<BiSolidRightArrow />}
								>
									Watch
								</Button>
							</Link>
						</div>
					</div>
					<Button
						className="block w-full md:rotate-90 md:max-w-[200px]"
						type="primary"
						danger
					>
						Download
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MovieInfo;
