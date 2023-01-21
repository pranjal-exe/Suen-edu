import { useContext, useState } from 'react';
import './newCourse.css';
import storage from '../../firebase';
import { createCourse } from '../../context/courseContext/apiCalls';
import { CourseContext } from '../../context/courseContext/CourseContext';
import { useRef } from 'react';

export default function NewMovie() {
	const [course, setCourse] = useState(null);
	const [img, setImg] = useState(null);
	const [imgTitle, setImgTitle] = useState(null);
	const [imgSm, setImgSm] = useState(null);
	const [trailer, setTrailer] = useState(null);
	const [video, setVideo] = useState(null);
	const [uploaded, setUploaded] = useState(0);

	const { dispatch } = useContext(CourseContext);

	const ref = useRef();

	const handleChange = (e) => {
		const value = e.target.value;
		setCourse({ ...course, [e.target.name]: value });
	};

	const upload = (items) => {
		items.forEach((item) => {
			const fileName = new Date().getTime() + item.label + item.file.name;
			const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = Math.floor(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					console.log('Upload is ' + progress + '% done');
				},
				(error) => console.log(error),
				() => {
					uploadTask.snapshot.ref.getDownloadURL().then((url) => {
						setCourse((prev) => {
							return { ...prev, [item.label]: url };
						});
						setUploaded((prev) => prev + 1);
					});
				}
			);
		});
	};

	const handleUpload = (e) => {
		e.preventDefault();
		upload([
			{ file: img, label: 'img' },
			{ file: imgTitle, label: 'imgTitle' },
			{ file: imgSm, label: 'imgSm' },
			{ file: trailer, label: 'trailer' },
			{ file: video, label: 'video' },
		]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createCourse(course, dispatch);

		//reset state...
		setCourse(null);
		setImg(null);
		setImgTitle(null);
		setImgSm(null);
		setTrailer(null);
		setVideo(null);
		setUploaded(0);

		ref.current.reset();
	};

	return (
		<div className='newProduct'>
			<h1 className='addProductTitle'>New Course</h1>
			<form
				ref={ref}
				className='addProductForm'
			>
				<div className='addProductItem'>
					<label>Image</label>
					<input
						type='file'
						id='img'
						name='img'
						onChange={(e) => setImg(e.target.files[0])}
					/>
				</div>
				<div className='addProductItem'>
					<label>Title image</label>
					<input
						type='file'
						id='imgTitle'
						name='imgTitle'
						onChange={(e) => setImgTitle(e.target.files[0])}
					/>
				</div>
				<div className='addProductItem'>
					<label>Thumbnail image</label>
					<input
						type='file'
						id='imgSm'
						name='imgSm'
						onChange={(e) => setImgSm(e.target.files[0])}
					/>
				</div>
				<div className='addProductItem'>
					<label>Title</label>
					<input
						type='text'
						placeholder='Javascript Basics'
						name='title'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Description</label>
					<input
						type='text'
						placeholder='description'
						name='desc'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Year</label>
					<input
						type='text'
						placeholder='Year'
						name='year'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Tag</label>
					<input
						type='text'
						placeholder='Tag'
						name='tag'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Duration</label>
					<input
						type='text'
						placeholder='Duration'
						name='duration'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Limit</label>
					<input
						type='text'
						placeholder='limit'
						name='limit'
						onChange={handleChange}
					/>
				</div>
				<div className='addProductItem'>
					<label>Is Module?</label>
					<select
						name='isModule'
						id='isModule'
						onChange={handleChange}
					>
						<option value='false'>No</option>
						<option value='true'>Yes</option>
					</select>
				</div>
				<div className='addProductItem'>
					<label>Preview</label>
					<input
						type='file'
						name='trailer'
						onChange={(e) => setTrailer(e.target.files[0])}
					/>
				</div>
				<div className='addProductItem'>
					<label>Video</label>
					<input
						type='file'
						name='video'
						onChange={(e) => setVideo(e.target.files[0])}
					/>
				</div>

				{uploaded !== 0 && <div>uploaded {uploaded} / 5</div>}

				{uploaded === 5 ? (
					<button
						className='addProductButton'
						onClick={handleSubmit}
					>
						Create
					</button>
				) : (
					<button
						disabled={uploaded !== 0}
						className='addProductButton'
						onClick={handleUpload}
					>
						Upload
					</button>
				)}
			</form>
		</div>
	);
}
