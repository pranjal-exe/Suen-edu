import { PlayArrow, InfoOutlined } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './featured.scss';

export default function Featured({ type, setTag }) {
	const [content, setContent] = useState({});
	const [course, setCourse] = useState({});

	useEffect(() => {
		const getCourse = async () => {
			if (!content && !content._id) return;

			try {
				const token =
					'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken;
				const res = await axios.get('/courses/find/' + content._id, {
					headers: { token },
				});

				setCourse(res.data);
			} catch (err) {
				console.error(err);
			}
		};

		getCourse();
	}, [content._id]);

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axios.get(`/courses/random?type=${type}`, {
					headers: {
						token:
							'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
					},
				});
				console.log(res.data);

				setContent(res.data[0]);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomContent();
	}, [type]);

	return (
		<div className='featured'>
			{type && (
				<div className='category'>
					<span>{type === 'course' ? 'Courses' : 'Modules'}</span>
					{/* TODO: if tag filteration required... */}
					{/* <select
						name='tag'
						id='tag'
						onChange={(e) => setTag(e.target.value)}
					>
						<option>Tag</option>
						<option value='ui'>UI/UX</option>
						<option value='web'>WebDev</option>
						<option value='mobile'>AndroidDev</option>
					</select> */}
				</div>
			)}
			<img
				height='100%'
				src={content.imgTitle}
				alt=''
			/>

			<div className='info'>
				<span className='title'>{content.title}</span>
				<span className='desc'>{content.desc}</span>
				<div className='buttons'>
					<button className='play'>
						<PlayArrow />
						<Link
							style={{
								textDecoration: 'none',
							}}
							to={{ pathname: `/watch`, course: course }}
						>
							<span>Watch</span>
						</Link>
					</button>
					<button className='more'>
						<InfoOutlined />
						<span>Info</span>
					</button>
				</div>
			</div>
		</div>
	);
}
