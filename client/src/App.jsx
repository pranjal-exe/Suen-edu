import './app.scss';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import Login from './pages/login/Login';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';
import Profile from './pages/profile/Profile';

const App = () => {
	const { user } = useContext(AuthContext);

	return (
		<Router>
			<Switch>
				<Route
					exact
					path='/'
				>
					{user ? <Home type={null} /> : <Redirect to='/register' />}
				</Route>
				<Route path='/register'>
					{!user ? <Register /> : <Redirect to='/' />}
				</Route>
				<Route path='/login'>{!user ? <Login /> : <Redirect to='/' />}</Route>
				{user && (
					<>
						<Route path='/courses'>
							<div>
								<Home type='course' />
							</div>
						</Route>
						<Route path='/module'>
							<Home type='module' />
						</Route>
						<Route path='/watch'>
							<Watch />
						</Route>
						<Route path='/profile'>
							<Profile />
						</Route>
					</>
				)}
			</Switch>
		</Router>
	);
};

export default App;
