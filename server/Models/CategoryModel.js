import mongoose from 'mongoose';
const {Schema} = mongoose;

const categorySchema = new Schema({
	title: String,
});

export default mongoose.model('Category', categorySchema);
