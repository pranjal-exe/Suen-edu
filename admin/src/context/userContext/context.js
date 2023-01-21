import { createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useUsers from './hook';

export const UsersContext = createContext({
	users: [],
	getAllUsers: () => {},
	loading: false
});

export const UserProvider = ({ children }) => {
	const hook = useUsers();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (!user || !user.accessToken) {
			history.push('/login');
			return;
		}

		hook.getAllUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <UsersContext.Provider value={hook}>{children}</UsersContext.Provider>;
};
