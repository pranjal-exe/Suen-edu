import { Link, useLocation } from 'react-router-dom';
import './category.css';
import { Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { CourseContext } from '../../context/courseContext/CourseContext';

export default function List() {
	const location = useLocation();
	const category = location.category;
	const { courses } = useContext(CourseContext);

	if (!category) return <div className='product'>No Category found</div>

	return (
		<div className='product'>
			<div className='productTitleContainer'>
				<h1 className='productTitle'>Category</h1>
				<Link to='/newcategory'>
					<button className='productAddButton'>Create</button>
				</Link>
			</div>
			<div className='productTop'>
				<div className='productTopRight'>
					<div className='productInfoTop'>
						<span className='productName'>{category.title}</span>
					</div>
					<div className='productInfoBottom'>
						<div className='productInfoItem'>
							<span className='productInfoKey'>id:</span>
							<span className='productInfoValue'>{category._id}</span>
						</div>
						<div className='productInfoItem'>
							<span className='productInfoKey'>tag:</span>
							<span className='productInfoValue'>{category.tag}</span>
						</div>
						<div className='productInfoItem'>
							<span className='productInfoKey'>type:</span>
							<span className='productInfoValue'>{category.type}</span>
						</div>
					</div>
				</div>
			</div>

			<div style={{ margin: '20px' }}>
				<h3>Active Videos</h3>
				<div
					style={{ display: 'flex', gap: '0.25rem', flexDirection: 'column' }}>
					{category.content
						.map((lid) => courses.find((l) => l._id === lid))
						.filter((x) => x)
						.map((data, i) => {
							return (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										margin: '5px 0',
										background: '#ccc',
										gap: '2rem',
									}}
									key={i}>
									<img
										width={170}
										height={100}
										style={{ objectFit: 'cover' }}
										src={data.imgTitle}
										alt=''
									/>
									<div>
										<div
											style={{
												fontSize: '1.2rem',
												fontWeight: 400,
												marginBottom: '5px',
											}}>
											{i + 1}. {data.title}
										</div>
										<Button
											color='secondary'
											startIcon={<Delete />}
											size='small'
											variant='contained'
											onClick={(e) => {
												// TODO: if time left..
											}}>
											Delete
										</Button>
									</div>
								</div>
							);
						})}
				</div>
			</div>

			<div className='productBottom'>
				<form className='productForm'>
					<div className='productFormLeft'>
						<label>List Title</label>
						<input type='text' placeholder={category.title} />
						<label>Type</label>
						<input type='text' placeholder={category.type} />
						<label>Genre</label>
						<input type='text' placeholder={category.tag} />
					</div>
					<div className='productFormRight'>
						<button className='productButton'>Update</button>
					</div>
				</form>
			</div>
		</div>
	);
}
