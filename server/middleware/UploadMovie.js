import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'video/raw'); //or accept absolute path
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.originalname.split(ext)[0] + '-' + uniqueSuffix + ext);
	},
});

export const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 500,
	},
	fileFilter: function (_req, file, cb) {
		if (file.mimetype === 'video/mp4') {
			cb(null, true);
		} else {
			cb(new createHttpError(400, 'Only mp4 files are allowed'));
		}
	},
});
