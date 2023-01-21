import axios from 'axios';
import {
	createCourseFailure,
	createCourseStart,
	createCourseSuccess,
	deleteCourseFailure,
	deleteCourseStart,
	deleteCourseSuccess,
	getCoursesFailure,
	getCoursesStart,
	getCoursesSuccess,
} from './CourseActions';

export const getCourses = async (dispatch) => {
	dispatch(getCoursesStart());
	try {
		const res = await axios.get('/courses', {
			headers: {
				token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			},
		});

		console.log(res);
		dispatch(getCoursesSuccess(res.data));
	} catch (err) {
		dispatch(getCoursesFailure());
	}
};

//create
export const createCourse = async (course, dispatch) => {
	dispatch(createCourseStart());
	try {
		const res = await axios.post('/courses', course, {
			headers: {
				token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			},
		});
		dispatch(createCourseSuccess(res.data));
	} catch (err) {
		dispatch(createCourseFailure());
	}
};

//delete
export const deleteCourse = async (id, dispatch) => {
	dispatch(deleteCourseStart());
	try {
		await axios.delete('/courses/' + id, {
			headers: {
				token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
			},
		});
		dispatch(deleteCourseSuccess(id));
	} catch (err) {
		dispatch(deleteCourseFailure());
	}
};
