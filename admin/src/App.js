import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './app.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import Login from './pages/login/Login';
import { AuthContext } from './context/authContext/AuthContext';
import { useContext } from 'react';
import CategoryList from './pages/categoryList/CategoryList';
import Category from './pages/category/Category';
import NewCategory from './pages/newCategory/NewCategory';
import CourseList from './pages/courseList/CourseList';
import Course from './pages/course/Course';
import NewCourse from './pages/newCourse/NewCourse';
import { UserProvider } from './context/userContext/context';

function App() {
	const { user } = useContext(AuthContext);

	return (
		<div className='container'>
			<Router>
				<Switch>
					{!user ? (
						<Route path='/'>
							<Login />
						</Route>
					) : (
						<UserProvider>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									width: '100%',
								}}
							>
								<Topbar />
								<div style={{ display: 'flex' }}>
									<Sidebar />

									<Route
										exact
										path='/'
									>
										<Home />
									</Route>

									<Route path='/users'>
										<UserList />
									</Route>
									<Route path='/user/:userId'>
										<User />
									</Route>
									<Route path='/newUser'>
										<NewUser />
									</Route>
									<Route path='/courses'>
										<CourseList />
									</Route>
									<Route path='/course/:courseId'>
										<Course />
									</Route>
									<Route path='/newCourse'>
										<NewCourse />
									</Route>
									<Route path='/categories'>
										<CategoryList />
									</Route>
									<Route path='/category/:categoryId'>
										<Category />
									</Route>
									<Route path='/newCategory'>
										<NewCategory />
									</Route>
								</div>
							</div>
						</UserProvider>
					)}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
