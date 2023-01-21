import { useContext, useEffect, useState } from 'react';
import './newCategory.css';
import { getCourses } from '../../context/courseContext/apiCalls';
import { CourseContext } from '../../context/courseContext/CourseContext';
import { CategoryContext } from '../../context/categoryContext/CategoryContext';
import { createCategory } from '../../context/categoryContext/apiCalls';
import { useHistory } from 'react-router-dom';

export default function NewList() {
	const [category, setCategory] = useState(null);
	const history = useHistory();

	const { dispatch } = useContext(CategoryContext);
	const { courses, dispatch: dispatchCourse } = useContext(CourseContext);

	useEffect(() => {
		getCourses(dispatchCourse);
	}, [dispatchCourse]);

	const handleChange = (e) => {
		const value = e.target.value;
		setCategory({ ...category, [e.target.name]: value });
	};

	const handleSelect = (e) => {
		let value = Array.from(e.target.selectedOptions, (option) => option.value);
		setCategory({ ...category, [e.target.name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createCategory(category, dispatch);
		history.push('/category');
	};

	return (
		<div className='newProduct'>
			<h1 className='addProductTitle'>New Category</h1>
			<form className='addProductForm'>
				<div className='formLeft'>
					<div className='addProductItem'>
						<label>Title</label>
						<input
							type='text'
							placeholder='Popular Course'
							name='title'
							onChange={handleChange}
						/>
					</div>
					<div className='addProductItem'>
						<label>Tag</label>
						<input
							type='text'
							placeholder='web dev'
							name='tag'
							onChange={handleChange}
						/>
					</div>
					<div className='addProductItem'>
						<label>Type</label>
						<select name='type' onChange={handleChange}>
							<option>Type</option>
							<option value='course'>Course</option>
							<option value='module'>Module</option>
						</select>
					</div>
				</div>
				<div className='formRight'>
					<div className='addProductItem'>
						<label>Content</label>
						<select
							multiple
							name='content'
							onChange={handleSelect}
							style={{ height: '280px' }}>
							{courses.map((course) => (
								<option key={course._id} value={course._id}>
									{course.title}
								</option>
							))}
						</select>
					</div>
				</div>
				<button className='addProductButton' onClick={handleSubmit}>
					Create
				</button>
			</form>
		</div>
	);
}
