import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema(
	{
		fullName: {type: String, required: true},
		email: {
			type: String,
			required: [true, 'Please enter a valid email address'],
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter a valid password'],
			minLength: [6, 'Please enter at least 6 characters'],
		},
		image: {type: String},
		isAdmin: {type: Boolean, default: false},
		likedMovies: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Movie',
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', userSchema);
