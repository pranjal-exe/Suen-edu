require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Category = require('./models/Category');
const CryptoJS = require('crypto-js');

const seed = async () => {
	const newuser = new User({
		isAdmin: true,
		username: 'user',
		email: 'user@app.com',
		password: CryptoJS.AES.encrypt(
			'user123',
			process.env.SECRET_KEY
		).toString(),
	});

	const adminuser = new User({
		isAdmin: true,
		username: 'admin',
		email: 'admin@app.com',
		password: CryptoJS.AES.encrypt(
			'admin123',
			process.env.SECRET_KEY
		).toString(),
	});

	const pitchers = new Course({
		title: 'JS Begginer',
		desc: 'A short course on basics of javascript',
		img: '',
		imgTitle: '',
		imgSm: '',
		trailer: '',
		video: '',
		year: '2022',
		limit: 3,
		tag: 'js',
		isModule: true,
	});

	const course = new Course({
		title: 'Course',
		desc: 'course',
		img: 'https://img.icons8.com/color/512/javascript.png',
		imgTitle: 'JsCoding',
		imgSm:
			'https://img.icons8.com/color/512/javascript.png',
		trailer: '',
		video: '',
		year: '2022',
		limit: 4,
		tag: 'js',
		isModule: false,
	});

	const category = new Category({
		title: 'newcategory',
		type: 'main',
		tag: 'coding',
		content: [],
	});

	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('DB Connection Successfull');

		await User.deleteMany({});
		await Course.deleteMany({});
		await Category.deleteMany({});

		await adminuser.save();
		await newuser.save();
		console.log('Users saved...');

		await pitchers.save();
		await course.save();
		console.log('Course saved...');

		await category.save();
		console.log('Category saved...');
	} catch (err) {
		console.error(err);
	}
};

seed();
