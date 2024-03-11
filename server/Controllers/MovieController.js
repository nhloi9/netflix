import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import path from 'path';
import slug from 'slug';
// import ffmpeg from 'fluent-ffmpeg';
// import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
// import ffProbeInstaller from '@ffprobe-installer/ffprobe';

import Movie from '../Models/MovieModel.js';
import Review from '../Models/ReviewModel.js';
import {MoviesData} from '../Data/MoviesData.js';
import createHttpError from 'http-errors';
import fs from 'fs';
import {fileURLToPath} from 'url';
import {exec, execSync} from 'child_process';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const importMovies = asyncHandler(async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		await Movie.deleteMany({}, {session});
		const movies = await Movie.create(MoviesData, {session});
		await session.commitTransaction();
		res.status(200).json(movies);
	} catch (error) {
		session.abortTransaction();
		next(createHttpError(500, error.message));
	} finally {
		session.endSession();
		return 3;
	}
});

let omitObject = (object) => {
	for (const key in object) {
		if (object[key] === undefined || object[key] === null || object[key] === '') {
			delete object[key];
		}
	}
	return object;
};

const getMovies = asyncHandler(async (req, res, next) => {
	const {category, time, language, rate, year, search} = req.query;
	console.log({category, time, language, year});
	let queryFilter = omitObject({
		// ...(category && {category}),
		// ...(time && {time}),
		category,
		time,
		language,
		rate,
		year,
		...(search && {name: {$regex: search, $options: 'i'}}),
	});
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 5;
	const query = Movie.find(queryFilter)
		.sort({createdAt: -1})
		.skip((page - 1) * limit)
		.limit(limit);
	// const copy = query.clone();

	const movies = await query;
	// const count = await copy.count();
	const count = await Movie.countDocuments(queryFilter);
	res
		.status(200)
		.json({movies, page, pages: Math.ceil(count / limit), totalMovies: count});
});

const getMovieBySlug = asyncHandler(async (req, res, next) => {
	const movie = await Movie.findOne({slug: req.params.slug}).populate({
		path: 'reviews',
		populate: {
			path: 'userId',
			select: 'fullName image',
		},
	});
	if (!movie) return next(createHttpError(404, 'Movie not found'));
	res.status(200).json(movie);
});

const getTopRatedMovies = asyncHandler(async (req, res, next) => {
	const movies = await Movie.aggregate([
		{
			$match: {},
		},
		{
			$sort: {
				rate: -1,
			},
		},
		{$limit: 20},
	]);
	res.status(200).json(movies);
});

const getRandomMovies = asyncHandler(async (req, res, next) => {
	const movies = await Movie.aggregate([{$sample: {size: 20}}]);
	res.status(200).json({movies});
});

const createMovieReview = asyncHandler(async (req, res, next) => {
	const {text, rating} = req.body;
	const {id} = req.params;

	const newReview = await Review.findOneAndUpdate(
		{
			userId: req.user._id,
			movieId: id,
		},
		{
			$set: {
				text,
				rating,
			},
		},
		{
			upsert: true,
			new: true,
		}
	);

	const movie = await Movie.findById(id).populate('reviews');

	movie.numberOfReviews = movie.reviews.length;
	movie.rate =
		movie.reviews.reduce((sum, current) => {
			return sum + current.rating;
		}, 0) / movie.numberOfReviews;
	console.log(movie);
	await movie.save();
	res.status(200).json(newReview);
});

const updateMovie = asyncHandler(async (req, res, next) => {
	const {
		name,
		desc,
		titleImage,
		image,
		category,
		language,
		year,
		time,
		video,
		cast,
	} = req.body;
	const movie = await Movie.findByIdAndUpdate(
		req.params.id,
		{
			name,
			desc,
			titleImage,
			image,
			category,
			language,
			year,
			time,
			video,
			cast,
		},
		{new: true}
	);
	// if (!movie) return next(createHttpError(404, 'Movie not found'));
	res.status(200).json({message: 'Movie updated successfully'});
});

const createMovie = asyncHandler(async (req, res, next) => {
	const {
		name,
		desc,
		titleImage,
		image,
		category,
		language,
		year,
		time,
		video,
		casts,
	} = req.body;

	// if (!req.file) return next(createHttpError(404, 'File not found'));

	const inputFilePath = path.resolve(
		__dirname,
		'../video/raw/' + video + '.mp4'
	);
	// const videoName = Date.now() + '-' + Math.round(Math.random() * 1e9);
	const outputDir = path.resolve(__dirname, `../video/transcoded/${video}`);

	fs.mkdirSync(outputDir);

	// const manifestPath = `${outputDir}.m3u8`;
	// const command = ffmpeg(inputFilePath)
	// 	.setFfmpegPath(ffmpegInstaller.path)
	// 	// .setFfmpegPath('D:Softwares\ffmpeg\bin\ffmpeg.exe')
	// 	.setFfprobePath(ffProbeInstaller.path)
	// 	.outputOption([`-hls_time 100`, `-hls_list_size 0`, `-c:v h264`, `-c:a aac`]);

	// command.on('start', () => {
	// 	'start transcode video';
	// });

	// command.on('error', (err) => {
	// 	console.log(err);
	// 	throw err;
	// });

	// command.on('end', () => {
	// 	fs.unlink(inputFilePath, (err) => {
	// 		console.log(err);
	// 	});
	// 	res.status(200).json(123);
	// });
	// command.output(manifestPath).run();
	//******************* use fluent ffmpeg and ffmgeg installer */

	//use child process

	//get video resolution
	// const resolution = execSync(
	// 	`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${inputFilePath} `,
	// 	{
	// 		encoding: 'utf-8',
	// 	}
	// );
	// const width = resolution.split('x')[0];

	execSync(
		` ffmpeg   -i ${inputFilePath}  -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0 -map 0:v:0 -map 0:a:0  -c:v libx264 -crf 22 -c:a aac -ar 44100  -filter:v:0 scale=w=480:h=360  -maxrate:v:0 600k -b:a:0 500k  -filter:v:1 scale=w=640:h=480  -maxrate:v:1 1500k -b:a:1 1000k  -filter:v:2 scale=w=1280:h=720 -maxrate:v:2 3000k -b:a:2 2000k  -var_stream_map "v:0,a:0,name:360p v:1,a:1,name:480p v:2,a:2,name:720p" -preset fast -hls_list_size 0 -threads 0 -f hls -hls_time 100 -hls_flags independent_segments -master_pl_name "master.m3u8" -y "${outputDir}/%v.m3u8"`
	);
	fs.unlink(inputFilePath, (err) => {
		if (err) console.log(err);
	});

	const movie = await Movie.create({
		name,
		desc,
		titleImage,
		image,
		category,
		language,
		year,
		time,
		video,
		casts,
		slug: slug(name, '_'),
	});
	res.status(200).json(movie);
});

const getAllLanguages = asyncHandler(async (req, res, next) => {
	const languages = await Movie.distinct('language');
	res.status(200).json(languages);
});

export {
	updateMovie,
	createMovie,
	importMovies,
	getMovies,
	getMovieBySlug,
	getTopRatedMovies,
	getRandomMovies,
	createMovieReview,
	getAllLanguages,
};
