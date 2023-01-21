import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import './login.css';

export default function Login() {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isFetching, dispatch } = useContext(AuthContext);

	useEffect(() => {
		console.log({ email, password });
	}, [email, password]);

	const handleLogin = async (e) => {
		e.preventDefault();
		const success = await login({ email, password }, dispatch);
		console.log({ success });
		success && history.push('/');
	};

	return (
		<div
			className='login'
			style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
			<h3>Login Form</h3>

			<form className='loginForm' onSubmit={handleLogin}>
				<input
					type='text'
					placeholder='email'
					className='loginInput'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='password'
					className='loginInput'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit' className='loginButton' disabled={isFetching}>
					Login
				</button>
			</form>
		</div>
	);
}
