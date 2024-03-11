import mongoose from 'mongoose';
const {Schema} = mongoose;

const reviewsSchema = new Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	movieId: {
		type: mongoose.Types.ObjectId,
		ref: 'Movie',
	},
	text: {
		type: String,
	},

	rating: {type: Number, required: [true, 'please provide a valid rating']},
});

reviewsSchema.index(
	{userId: 1, movieId: 1},
	{
		unique: true,
	}
);

export default mongoose.model('Review', reviewsSchema);
