const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		type: { type: String },
		tag: { type: String },
		content: { type: Array },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
