const router = require('express').Router();
const Category = require('../models/Category');
const verify = require('../verifyToken');

//CREATE

router.post('/', verify, async (req, res) => {
	if (req.user.isAdmin) {
		const newCategory = new Category(req.body);
		try {
			const savedCategory = await newCategory.save();
			return res.status(201).json(savedCategory);
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json('You are not allowed!');
	}
});

router.put('/', verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			console.log(req.params);
			await Category.findOneAndUpdate({ _id: req.params.id, });
			return res.status(201).json('The category has been updated...');
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
			await Category.findByIdAndDelete(req.params.id);
			return res.status(201).json('The category has been deleted...');
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json('You are not allowed!');
	}
});

//GET

router.get('/', verify, async (req, res) => {
	const typeQuery = req.query.type;
	const tagQuery = req.query.tag;
	let category = [];
	try {
		if (typeQuery) {
			if (tagQuery) {
				category = await Category.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type: typeQuery, tag: tagQuery } },
				]);
			} else {
				category = await Category.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type: typeQuery } },
				]);
			}
		} else {
			category = await Category.aggregate([{ $sample: { size: 10 } }]);
		}
		return res.status(200).json(category);
	} catch (err) {
		return res.status(500).json(err);
	}
});

module.exports = router;
