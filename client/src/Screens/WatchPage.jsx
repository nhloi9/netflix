import React, {useEffect, useState} from 'react';
import Layout from '../Layout/Layout';
import {Link, useParams} from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import {
	AiFillPlayCircle,
	AiOutlineDownload,
	AiOutlineHeart,
} from 'react-icons/ai';
import {Button} from 'antd';
import VideoJS from '../Components/VideoJS';
import {api} from '../Redux/Api/axios';
import toast from 'react-hot-toast';
import {messageFromError} from '../Redux/Protection';

const WatchPage = () => {
	const {slug} = useParams();
	const [movie, setMovie] = useState(null);

	const [play, setPlay] = useState(false);

	const playerRef = React.useRef(null);

	const videoJsOptions = {
		autoplay: true,
		controls: true,
		responsive: true,
		fluid: true,
		sources: [
			{
				src: `http://localhost:3333/video/${movie?.video}/master.m3u8`,
				// type: 'video/hls',
			},
		],
		plugins: {
			qualityLevel: {},
			hlsQualitySelector: {displayCurrentQuality: true},
		},
	};

	const handlePlayerReady = (player) => {
		playerRef.current = player;

		// You can handle player events here, for example:
		player.on('waiting', () => {
			videojs.log('player is waiting');
		});

		player.on('dispose', () => {
			videojs.log('player will dispose');
		});
	};

	useEffect(() => {
		api

			.get('/movies/' + slug)
			.then(({data}) => {
				setMovie(data);
			})
			.catch((err) => {
				toast.error(messageFromError(err));
			});
	}, [slug]);
	return (
		<div>
			<Layout>
				{movie && (
					<div className="container my-6 mx-auto p-6 bg-dry rounded">
						<div className="my-6 p-5 border border-gray-600  flex flex-wrap items-center justify-between min-h-[70px] rounded">
							<div className="flex gap-3 items-center">
								<Link to={'/movie/' + movie?.slug}>
									<BiArrowBack size={20} />
								</Link>
								<h1 className="text-lg font-bold">{movie?.name}</h1>
							</div>
							<div className="flex w-full md:w-min justify-between">
								<Button
									danger
									type="text"
								>
									<AiOutlineHeart size={20} />
								</Button>
								<Button
									className=""
									icon={<AiOutlineDownload size={20} />}
									type="primary"
									danger
								>
									Download
								</Button>
							</div>
						</div>
						{play ? (
							<VideoJS
								options={videoJsOptions}
								onReady={handlePlayerReady}
							/>
						) : (
							<div className="w-full h-screen rounded relative">
								<img
									src={movie.titleImage}
									alt=""
									className="w-full h-full block object-cover"
								/>
								<div className="absolute top-0 left-0 bottom-0 right-0 flex-colo ">
									<AiFillPlayCircle
										size={40}
										color="red"
										className="cursor-pointer"
										onClick={() => {
											setPlay(true);
										}}
									/>
								</div>
							</div>
						)}
					</div>
				)}
			</Layout>
		</div>
	);
};

export default WatchPage;
