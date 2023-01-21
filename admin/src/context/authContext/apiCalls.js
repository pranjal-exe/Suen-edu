import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './AuthActions';

export const login = async (user, dispatch) => {
	dispatch(loginStart());

	try {
		const res = await axios.post('auth/login', user);
		if (res.data.isAdmin) {
			dispatch(loginSuccess(res.data));
			return true;
		} else return false;
	} catch (err) {
		dispatch(loginFailure());
		return false;
	}
};

export const signup = async (user) => {
	try {
		await axios.post('auth/register', user);
		return { success: true };
	} catch (err) {
		return { success: false };
	}
};
