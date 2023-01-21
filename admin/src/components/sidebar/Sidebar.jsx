import './sidebar.css';
import {
	PermIdentity,
	PlayCircleOutline,
	List,
	PersonAddOutlined,
	AddToQueue,
	QueuePlayNext,
	HomeOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Sidebar() {
	return (
		<div className='sidebar'>
			<div className='sidebarWrapper'>
				<div className='sidebarMenu'>
					<h3 className='sidebarTitle'>Manage and View</h3>
					<ul className='sidebarList'>
						<Link
							to='/'
							className='link'
						>
							<li className='sidebarListItem'>
								<HomeOutlined className='sidebarIcon' />
								Home
							</li>
						</Link>
						<Link
							to='/users'
							className='link'
						>
							<li className='sidebarListItem'>
								<PermIdentity className='sidebarIcon' />
								Users
							</li>
						</Link>
						<Link
							to='/courses'
							className='link'
						>
							<li className='sidebarListItem'>
								<PlayCircleOutline className='sidebarIcon' />
								Courses
							</li>
						</Link>
						<Link
							to='/categories'
							className='link'
						>
							<li className='sidebarListItem'>
								<List className='sidebarIcon' />
								Categories
							</li>
						</Link>
					</ul>
				</div>
				<div className='sidebarMenu'>
					<h3 className='sidebarTitle'>Create</h3>
					<ul className='sidebarList'>
						<Link
							to='/newUser'
							className='link'
						>
							<li className='sidebarListItem'>
								<PersonAddOutlined className='sidebarIcon' />
								Add User
							</li>
						</Link>
						<Link
							to='/newCourse'
							className='link'
						>
							<li className='sidebarListItem'>
								<AddToQueue className='sidebarIcon' />
								Add Course
							</li>
						</Link>
						<Link
							to='/newCategory'
							className='link'
						>
							<li className='sidebarListItem'>
								<QueuePlayNext className='sidebarIcon' />
								Add Category
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);
}
