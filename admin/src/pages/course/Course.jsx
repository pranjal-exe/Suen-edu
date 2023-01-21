import { Link, useParams } from 'react-router-dom';
import { Publish } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { CourseContext } from '../../context/courseContext/CourseContext';
import { useEffect } from 'react';
import './course.css';
import axios from 'axios';
import { getHeaders } from '../../utils';

export default function Movie() {
	const { courseId } = useParams();
	const [course, setCourse] = useState({});
	const { courses } = useContext(CourseContext);

	useEffect(() => {
		setCourse(courses.find((mov) => mov._id === courseId));
		console.log({ courseId, courses });
	}, [courseId, courses, setCourse]);

	if (!courseId || !course || !course._id) {
		return <h1>Course not found...</h1>;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const newdata = {
			title: fd.get('title'),
			year: fd.get('year'),
			tag: fd.get('tag'),
			limit: fd.get('limit'),
			trailer: fd.get('trailer'),
			video: fd.get('video'),
		};

		const headers = getHeaders();
		const res = await axios.put(`/courses/${course._id}`, newdata, {
			headers,
		});
		console.log(res);
	};

	return (
		<div className='product'>
			<div className='productTitleContainer'>
				<h1 className='productTitle'>Course</h1>
				<Link to='/newCourse'>
					<button className='productAddButton'>Create Page</button>
				</Link>
			</div>
			<div className='productTop'>
				<div className='productTopRight'>
					<div className='productInfoTop'>
						<img src={course.img} alt='' className='productInfoImg' />
						<span className='productName'>{course.title}</span>
					</div>
					<div className='productInfoBottom'>
						<div className='productInfoItem'>
							<span className='productInfoKey'>tag:</span>
							<span className='productInfoValue'>{course.tag}</span>
						</div>
						<div className='productInfoItem'>
							<span className='productInfoKey'>year:</span>
							<span className='productInfoValue'>{course.year}</span>
						</div>
						<div className='productInfoItem'>
							<span className='productInfoKey'>limit:</span>
							<span className='productInfoValue'>{course.limit}</span>
						</div>
					</div>
				</div>
			</div>
			<div className='productBottom'>
				<form className='productForm' onSubmit={handleSubmit}>
					<div className='productFormLeft'>
						<label>Course Title</label>
						<input
							type='text'
							name='title'
							placeholder={course.title}
							defaultValue={course.title}
						/>
						<label>Year</label>
						<input
							type='text'
							name='year'
							placeholder={course.year}
							defaultValue={course.year}
						/>
						<label>Tag</label>
						<input
							type='text'
							name='tag'
							placeholder={course.tag}
							defaultValue={course.tag}
						/>
						<label>Limit</label>
						<input
							type='text'
							name='limit'
							placeholder={course.limit}
							defaultValue={course.limit}
						/>
						<label>Trailer</label>
						<input type='file' name='trailer' placeholder={course.trailer} />
						<label>Video</label>
						<input type='file' name='video' placeholder={course.video} />
					</div>
					<div className='productFormRight'>
						<div className='productUpload'>
							<img src={course.img} alt='' className='productUploadImg' />
							<label htmlFor='file'>
								<Publish />
							</label>
							<input type='file' id='file' style={{ display: 'none' }} />
						</div>
						<button className='productButton'>Update</button>
					</div>
				</form>
			</div>
		</div>
	);
}
