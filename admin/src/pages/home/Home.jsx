import Chart from '../../components/chart/Chart';
import './home.css';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { getHeaders } from '../../utils';

export default function Home() {
	const MONTHS = useMemo(
		() => [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Agu',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
		[]
	);

	const [userStats, setUserStats] = useState([]);

	useEffect(() => {
		const getStats = async () => {
			try {
				const headers = getHeaders();
				const res = await axios.get('/users/stats', { headers });

				const statsList = res.data.sort(function (a, b) {
					return a._id - b._id;
				});

				statsList.map((item) =>
					setUserStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], 'New User': item.total },
					])
				);
			} catch (err) {
				console.log(err);
			}
		};
		getStats();
	}, [MONTHS]);

	return (
		<div className='home'>
			<div
				style={{
					flexGrow: 1,
				}}
			>
				<Chart
					data={userStats}
					title='User Analytics'
					grid
					dataKey='New User'
				/>
			</div>
			<div
				className='homeWidgets'
				style={{
					flexGrow: 1,
				}}
			>
				<div>
					<WidgetSm />
				</div>
			</div>
		</div>
	);
}
