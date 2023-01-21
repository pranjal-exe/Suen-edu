import './categoryItem.scss';
import {
	PlayArrow,
	Add,
	ThumbUpAltOutlined,
	ThumbDownOutlined,
} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CategoryItem({ index, item }) {
	const [isHovered, setIsHovered] = useState(false);
	const [course, setCourse] = useState({});

	useEffect(() => {
		const getCourse = async () => {
			console.log({ item, index });

			try {
				const token =
					'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken;

				const res = await axios.get('/courses/find/' + item, {
					headers: { token },
				});
				setCourse(res.data);
			} catch (err) {
				console.error(err);
			}
		};

		getCourse();
	}, [item]);

	return (
		<Link to={{ pathname: '/watch', course: course }}>
			<div
				className='listItem'
				style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<img src={course?.imgSm} alt='' />
				{isHovered && (
					<>
						<video src={course.trailer} autoPlay={true} loop />
						<div className='itemInfo'>
							<div className='icons'>
								<PlayArrow className='icon' />
								<Add className='icon' />
								<ThumbUpAltOutlined className='icon' />
								<ThumbDownOutlined className='icon' />
							</div>
							<div className='itemInfoTop'>
								<span>{course.duration}</span>
								<span className='limit'>+{course.limit}</span>
								<span>{course.year}</span>
							</div>
							<div className='desc'>{course.desc}</div>
							<div className='genre'>{course.genre}</div>
						</div>
					</>
				)}
			</div>
		</Link>
	);
}
