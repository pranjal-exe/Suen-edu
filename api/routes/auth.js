const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
	console.log('tried registering new user');
	console.log(req.body);

	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.SECRET_KEY
		).toString(),
	});

	try {
		const user = await newUser.save();
		console.log('saved the user');
		return res.status(201).json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

//LOGIN
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		const { email, password: pass } = req.body;
		console.log({ user, email, password: pass });

		if (!user)
			return res.status(401).json({ message: 'Wrong password or username!' });
		else {
			const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
			const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

			originalPassword !== req.body.password &&
				res.status(401).json({ message: 'Wrong password or username!' });

			const accessToken = jwt.sign(
				{ id: user._id, isAdmin: user.isAdmin },
				process.env.SECRET_KEY,
				{ expiresIn: '5d' }
			);

			const { password, ...info } = user._doc;

			return res.status(200).json({ ...info, accessToken });
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});

module.exports = router;
