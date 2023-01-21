import './newUser.css';
import { signup } from '../../context/authContext/apiCalls';
import { useRef } from 'react';

export default function NewUser() {
	const ref = useRef(null);

	const handleSignup = async (e) => {
		e.preventDefault();

		const formdata = new FormData(e.target);

		const data = {
			username: formdata.get('username'),
			email: formdata.get('email'),
			password: formdata.get('password'),
			phone: formdata.get('phone'),
			fullname: formdata.get('fullname'),
			gender: formdata.get('gender'),
		};

		try {
			const res = await signup(data);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='newUser'>
			<h1 className='newUserTitle'>New User</h1>
			<form className='newUserForm' ref={ref} onSubmit={handleSignup}>
				<div className='newUserItem'>
					<label>Username</label>
					<input name='username' type='text' placeholder='minesh' />
				</div>
				<div className='newUserItem'>
					<label>Full Name</label>
					<input name='fullname' type='text' placeholder='Minesh Smith' />
				</div>
				<div className='newUserItem'>
					<label>Email</label>
					<input name='email' type='email' placeholder='minesh@gmail.com' />
				</div>
				<div className='newUserItem'>
					<label>Password</label>
					<input name='password' type='password' placeholder='password' />
				</div>
				<div className='newUserItem'>
					<label>Phone</label>
					<input name='phone' type='text' placeholder='98798789876' />
				</div>
				<div className='newUserItem'>
					<label>Address</label>
					<input name='address' type='text' placeholder='Durg | Chhattisgarh' />
				</div>
				<div className='newUserItem'>
					<label>Gender</label>
					<div className='newUserGender'>
						<input type='radio' name='gender' id='male' value='male' />
						<label htmlFor='male'>Male</label>
						<input type='radio' name='gender' id='female' value='female' />
						<label htmlFor='female'>Female</label>
						<input type='radio' name='gender' id='other' value='other' />
						<label htmlFor='other'>Other</label>
					</div>
				</div>
				<div className='newUserItem'>
					<label>Active</label>
					<select className='newUserSelect' name='active' id='active'>
						<option value='yes'>Yes</option>
						<option value='no'>No</option>
					</select>
				</div>

				<button type='submit' className='newUserButton'>
					Create
				</button>

				{/* <ToastContainer /> */}
				{/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity='success'
						sx={{ width: '100%' }}>
						This is a success message!
					</Alert>
				</Snackbar> */}
			</form>
		</div>
	);
}
