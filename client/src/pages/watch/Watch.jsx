import { ArrowBackOutlined } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import './watch.scss';

export default function Watch() {
	const location = useLocation();
	const course = location.course;

	return (
		<div className='watch'>
			<Link to='/'>
				<div className='back' style={{ display: 'flex', gap: '1rem' }}>
					<ArrowBackOutlined />
					Home
				</div>
			</Link>
			<video className='video' autoPlay progress controls src={course.video} />
		</div>
	);
}
