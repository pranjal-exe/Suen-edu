import axios from 'axios';
import { useEffect, useState } from 'react';
import { getHeaders } from '../../utils';

export default function useUsers() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	const getAllUsers = async () => {
		setLoading(true);
		const headers = getHeaders();
		await axios.get('/users/', { headers }).then((res) => {
			setUsers(res.data.map((d) => ({ ...d, id: d._id })));
			setLoading(false);
		});
	};

	const getUserById = (id) => {
		return users.find((user) => user.id === id);
	};

	const updateUserInfo = async (data) => {
		const { id, ...rest } = data;
		const headers = getHeaders();
		await axios.put(`/users/${id}`, { ...rest }, { headers }).then((res) => {
			console.log(res);
		});
	};
	const user = JSON.parse(localStorage.getItem('user'));
	useEffect(() => {
		if (user && user.accessToken) {
			getAllUsers();
		}
	}, []);

	return {
		users,
		loading,
		updateUserInfo,
		getUserById,
		getAllUsers,
	};
}
