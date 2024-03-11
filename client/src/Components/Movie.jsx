import React from 'react';
import {AiFillHeart} from 'react-icons/ai';
import {Link} from 'react-router-dom';

const Movie = ({movie}) => {
	return (
		<div className=" w-full h-[300px] p-1 rounded-md border border-gray-300 hover:scale-[0.99] transition  duration-500 relative shrink-0">
			<Link to={`/movie/${movie?.slug}`}>
				<img
					src={movie.titleImage ?? ''}
					alt=""
					className="w-full h-full object-cover"
				/>
			</Link>
			<div className="absolute bg-[#00000078] w-full h-[50px] bottom-0 left-0 flex justify-between items-center  px-5">
				<h1>{movie.name}</h1>
				<div className=" h-[40px] flex-colo px-3 ">
					<AiFillHeart
						size={20}
						color="red"
						className="cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
};

export default Movie;
