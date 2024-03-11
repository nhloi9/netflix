import React, {useState} from 'react';
import Title from '../Title';
import {BsFillBookmarkFill} from 'react-icons/bs';
import {Rating} from '@mui/material';
import {UserData} from '../../Data/UserData';
import {Button} from 'antd';
import {api} from '../../Redux/Api/axios';
import toast from 'react-hot-toast';
import {messageFromError} from '../../Redux/Protection';

const MovieReview = ({movie, setMovie}) => {
	const [text, setText] = useState('');
	const [rate, setRate] = useState(5);

	const handleReview = () => {
		api
			.post(`/movies/${movie?._id}/review`, {
				text,
				rating: rate,
			})
			.then(({data}) => {
				setMovie((pre) => ({
					...pre,
					reviews: [
						data,
						...pre?.reviews?.filter((item) => item?._id !== data?._id),
					],
				}));
			})
			.catch((err) => {
				toast.error(messageFromError(err));
			});
	};
	return (
		<div className="container mx-auto px-2 py-10">
			<Title
				Icon={BsFillBookmarkFill}
				text={'Reviews'}
			/>
			<div className=" bg-dry lg:grid grid-cols-5 my-6">
				<div className="p-5 lg:col-span-2 ">
					<h1 className="font-semibold">Review {movie.name}</h1>
					<br />
					<h1>
						Write a review for this movie. It will be posted on this page. lorem ipsum
						dolor sit amet, consectetur adipiscing elit. Donec
					</h1>
					<br />
					<Rating
						name="simple-controlled"
						value={rate}
						onChange={(event, value) => {
							setRate(value);
						}}
					/>
					<br />
					<br />
					<h1 className="font-bold">Message</h1>
					<br />
					<textarea
						name=""
						id=""
						className="w-full min-h-[200px] bg-main p-3 resize-none "
						placeholder="Enter your review"
						onChange={(e) => setText(e.target.value?.trim())}
					></textarea>
					<br />
					<br />
					<Button
						onClick={handleReview}
						className="w-full h-[50px]"
						type="primary"
						danger
					>
						Submit
					</Button>
				</div>
				<div className="lg:col-span-3 p-6">
					<div>
						<h1 className="font-bold ">Reviews ({movie?.reviews?.length})</h1>
						<br />
						<div className="h-[80vh] bg-main p-5 rounded-md overflow-y-scroll">
							{movie?.reviews?.map(({userId, text, _id}) => (
								<div
									key={_id}
									className="w-full mb-3 rounded-md p-3 md:flex items-center bg-dry  "
								>
									<img
										src={userId?.image}
										alt=""
										className="hidden md:block h-[80px] w-[70px] rounded "
									/>
									<div className="flex flex-col gap-1 md:px-2  md:border-r">
										<h1 className="text-lg ">{userId?.fullName}</h1>
										<p className="text-sm pb-2 md:pb-0 ">{text}</p>
									</div>
									<div>
										<Rating value={4} />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieReview;
