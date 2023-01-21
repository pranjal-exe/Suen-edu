import axios from 'axios';
import { Snackbar } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import { useRef } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './register.scss';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const history = useHistory();

	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();

	const handleStart = (e) => {
		e.preventDefault();

		setEmail(emailRef.current.value);
	};

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleFinish = async (e) => {
		e.preventDefault();
		setPassword(passwordRef.current.value);
		setUsername(usernameRef.current.value);
		try {
			await axios.post('auth/register', { email, username, password });
			history.push('/login');
		} catch (err) {
			handleClick();
		}
	};

	return (
		<div className='register'>
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity='error'
				>
					An error occured!!
				</Alert>
			</Snackbar>
			<div className='top'>
				<div className='wrapper'>
					<h1
						style={{
							display: 'flex',
							alignItems: 'center',
							fontWeight: 'normal',
							fontSize: '2.2rem',
							marginRight: '4rem',
							color: 'white',
							gap: '10px',
						}}
					>
						<img
							className='logo'
							src='logosuen.svg'
							alt=''
						/>
						Suen
					</h1>

					<Link to='/login'>
						<button className='loginButton'>Sign In</button>
					</Link>
				</div>
			</div>
			<div className='container'>
				<h1>Wide Range of courses, Tutorials, and more.</h1>
				<h2>Watch anywhere, anytime.</h2>
				<p>Ready to explore? Enter your email to create your account.</p>
				{!email ? (
					<form
						className='input'
						onSubmit={handleStart}
					>
						<input
							required
							type='email'
							placeholder='email address'
							ref={emailRef}
						/>
						<button
							className='registerButton'
							type='submit'
						>
							Get Started
						</button>
					</form>
				) : (
					<form className='input'>
						<input
							type='username'
							placeholder='username'
							ref={usernameRef}
						/>
						<input
							type='password'
							placeholder='password'
							ref={passwordRef}
						/>
						<button
							className='registerButton'
							onClick={handleFinish}
						>
							Start
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
