export const getHeaders = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const headers = { token: 'Bearer ' + user.accessToken };
	return headers;
};
