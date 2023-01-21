import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import './home.scss';
import Category from '../../components/category/Category';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ type }) => {
	const [categories, setCategories] = useState([]);
	const [tag, setTag] = useState(null);

	useEffect(() => {
		const getRandomCategories = async () => {
			try {
				console.log(JSON.parse(localStorage.getItem('user')).accessToken);

				const res = await axios.get(
					`categories${type ? '?type=' + type : ''}${
						tag ? '&genre=' + tag : ''
					}`,
					{
						headers: {
							token:
								'Bearer ' +
								JSON.parse(localStorage.getItem('user')).accessToken,
						},
					}
				);

				console.log('data', res.data);

				setCategories(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		getRandomCategories();

		return () => {};
	}, [type, tag, setCategories]);

	return (
		<div className='home'>
			<Navbar />
			<Featured type={type} setTag={setTag} />
			{categories.map((category) => (
				<Category key={category._id} category={category} />
			))}
		</div>
	);
};

export default Home;
