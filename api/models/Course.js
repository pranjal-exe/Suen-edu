const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		desc: { type: String },
		img: { type: String },
		imgTitle: { type: String },
		imgSm: { type: String },
		trailer: { type: String },
		video: { type: String },
		year: { type: String },
		limit: { type: Number },
		tag: { type: String },
		isModule: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
