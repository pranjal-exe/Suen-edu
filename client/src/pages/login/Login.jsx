import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';
import './login.scss';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { dispatch } = useContext(AuthContext);

	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password }, dispatch);
	};
	return (
		<div className='login'>
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
					<Link to='/register'>
						<button className='loginButton'>Sign Up</button>
					</Link>
				</div>
			</div>

			<div className='container'>
				<form>
					<h1>Sign In</h1>
					<input
						type='email'
						placeholder='Email Address'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className='loginButton'
						onClick={handleLogin}
					>
						Sign In
					</button>
					<span>
						New to Suen?{' '}
						<Link
							to='/register'
							style={{
								cursor: 'pointer',
								textDecoration: 'none',
							}}
						>
							<b>Sign up now.</b>
						</Link>
					</span>
				</form>
			</div>
		</div>
	);
}
