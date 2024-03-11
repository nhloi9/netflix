import mongoose from 'mongoose';
const {Schema} = mongoose;

const movieSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			//  required: true
		},
		name: {type: String, required: true},
		desc: {type: String},
		titleImage: {
			type: String,
			required: true,
		},
		image: {
			type: String,

			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
		year: {type: Number, required: true},
		time: {type: Number, required: true},
		video: {
			type: String,
			//  required: true
		},
		rate: {
			type: Number,
			default: 0,
		},
		numberOfReviews: {type: Number, default: 0},

		casts: [
			{
				name: {
					type: String,
					required: true,
				},
				image: {
					type: String,
					required: true,
				},
			},
		],
		slug: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

movieSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'movieId',
	toObject: {virtuals: true},
});

movieSchema.set('toObject', {virtuals: true});
movieSchema.set('toJSON', {virtuals: true});

export default mongoose.model('Movie', movieSchema);
