import { MoreVert } from '@material-ui/icons';
import { useContext, useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import { logout } from '../../authContext/AuthActions';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { dispatch } = useContext(AuthContext);

	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => (window.onscroll = null);
	};
	return (
		<div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
			<div className='container'>
				<div className='left'>
					<h1
						style={{
							display: 'flex',
							alignItems: 'center',
							fontWeight: 'normal',
							fontSize: '1.8rem',
							marginRight: '4rem',
							color: 'white',
						}}
					>
						<img
							className='logo'
							src='logosuen.svg'
							alt=''
						/>
						Suen
					</h1>
					<Link
						to='/'
						className='link'
					>
						<span>Home</span>
					</Link>
					<Link
						to='/module'
						className='link'
					>
						<span className='navbarmainLinks'>Module</span>
					</Link>
					<Link
						to='/courses'
						className='link'
					>
						<span className='navbarmainLinks'>Courses</span>
					</Link>
					{/* <span>New and Popular</span> */}
					{/* <Link to='/saved' className='link'>
						<span>My List</span>
					</Link> */}
				</div>
				<div className='right'>
					{/* <Search className='icon' /> */}
					{/* <Notifications className='icon' />
					<img
						src='https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
						alt=''
					/> */}
					<div className='profile'>
						<MoreVert className='icon' />
						<div className='options'>
							<span>Profile</span>
							<a
								style={{
									color: 'white',
									textDecoration: 'none',
								}}
								href='http://localhost:4000'
								target='_blank'
								rel='noopener noreferrer'
							>
								<span>Dashboard</span>
							</a>
							<span onClick={() => dispatch(logout())}>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
