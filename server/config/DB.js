import mongoose from 'mongoose';

export default async function connectDB() {
	try {
		await mongoose.connect(process.env.DB_CONNECT_URL);

		console.log('connectDB: ' + process.env.DB_CONNECT_URL);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}
