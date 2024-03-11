import express from 'express';
import multer from 'multer';
import expressAsyncHandler from 'express-async-handler';
import {bucket} from '../util/firebase.js';
import saltedMd5 from 'salted-md5';
import path from 'path';
import createHttpError from 'http-errors';
import fs from 'fs';

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer();

const router = express.Router();

router.post(
	'/',
	upload.single('file'),
	expressAsyncHandler(async (req, res, next) => {
		if (!req.file) return next(createHttpError(400, 'please provide a file'));
		const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!');
		const fileName = name + path.extname(req.file.originalname);
		await bucket.file(fileName).createWriteStream().end(req.file.buffer);
		const [url] = await bucket.file(fileName).getSignedUrl({
			version: 'v2',
			action: 'read',
			expires: Date.now() + 1000 * 60 * 60 * 24 * 60,
		});
		res.status(200).json({message: 'success', url});
	})
);

router.post('/video', upload.single('file'), async (req, res, next) => {
	const chunk = req.file.buffer;
	let {chunkNumber, totalChunks, originalname, newName} = req.body;

	chunkNumber = Number(chunkNumber);
	totalChunks = Number(totalChunks);

	const dir = path.resolve(__dirname, '../video/chunks');

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	fs.writeFileSync(dir + '/' + newName + '.' + chunkNumber, chunk);

	const mergeChunks = async () => {
		const mergedFilePath = path.resolve(
			__dirname,
			'../video/raw',
			newName + path.extname(originalname)
		);

		// if (!fs.existsSync(mergedFilePath)) {
		// 	fs.mkdirSync(mergedFilePath);
		// }

		const writeStream = fs.createWriteStream(mergedFilePath);
		for (let i = 0; i < totalChunks; i++) {
			const chunkFilePath = `${dir}/${newName}.${i}`;
			const chunkBuffer = fs.readFileSync(chunkFilePath);
			writeStream.write(chunkBuffer);
			fs.unlinkSync(chunkFilePath); // Delete the individual chunk file after merging
		}

		writeStream.end();
		console.log('Chunks merged successfully');
	};

	if (chunkNumber === totalChunks - 1) {
		console.log(3);
		mergeChunks();
	}
	res.status(200).json('ok');
});

export default router;
