import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import i18n from 'i18n';
// import {I18n, __} from 'i18n';
import path from 'path';
import {fileURLToPath} from 'url';

import connectDB from './config/DB.js';
import userRouter from './Routes/UserRoute.js';
import movieRouter from './Routes/MovieRoute.js';
import categoryRouter from './Routes/CategoryRoute.js';
import fileRouter from './Routes/FileRoute.js';
import {eventEmitter} from './emitter.js';

// eventEmitter.emit('test');
// console.log(2);

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

dotenv.config();
i18n.configure({
	// setup some locales - other locales default to en silently
	// locales: ['en', 'ru', 'de'],

	// sets a custom cookie name to parse locale settings from
	// cookie: 'yourcookiename',

	// where to store json files - defaults to './locales'
	directory: path.join(__dirname, '/locales'),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(i18n.init);
app.use('/video', express.static('video/transcoded'));

app.get('/', (req, res) => {
	console.log(12);
	res.send(i18n.__('hello'));
	// next()
});

app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/files', fileRouter);

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
	});
});

app.use((req, res, next) => {
	res.status(404).json({message: "Sorry can't find that!"});
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
	connectDB();
	console.log(`app listening on ${PORT}`);
});
