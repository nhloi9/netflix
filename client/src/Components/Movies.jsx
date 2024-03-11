import React, {useState} from 'react';
import Movie from './Movie';
// import SwipeableViews from 'react-swipeable-views'

const Movies = ({movies}) => {
	return (
		<div>
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
				{movies.map((movie, index) => (
					<Movie
						movie={movie}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default Movies;
