const router = require('express').Router();
const Course = require('../models/Course');
const verify = require('../verifyToken');

//CREATE

router.post('/', verify, async (req, res) => {
	if (req.user.isAdmin) {
		const newCourse = new Course(req.body);
		try {
			const savedCourse = await newCourse.save();
			return res.status(201).json(savedCourse);
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json('You are not allowed!');
	}
});

//UPDATE

router.put('/:id', verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const updatedCourse = await Course.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			return res.status(200).json(updatedCourse);
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json('You are not allowed!');
	}
});

//DELETE

router.delete('/:id', verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			await Course.findByIdAndDelete(req.params.id);
			return res.status(200).json('The course has been deleted...');
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json('You are not allowed!');
	}
});

//GET

router.get('/find/:id', verify, async (req, res) => {
	try {
		const course = await Course.findById(req.params.id);
		return res.status(200).json(course);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//GET RANDOM

router.get('/random', verify, async (req, res) => {
	const type = req.query.type;
	let course;
	try {
		if (type === 'module') {
			course = await Course.aggregate([
				{ $match: { isModule: true } },
				{ $sample: { size: 1 } },
			]);
		} else {
			course = await Course.aggregate([
				{ $match: { isModule: false } },
				{ $sample: { size: 1 } },
			]);
		}
		return res.status(200).json(course);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//GET ALL

router.get('/', verify, async (req, res) => {
	console.log('get all courses...');

	if (req.user.isAdmin) {
		try {
			const courses = await Course.find();
			return res.status(200).json(courses.reverse());
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json('You are not allowed!');
	}
});

module.exports = router;
