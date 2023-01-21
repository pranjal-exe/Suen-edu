import CourseReducer from './CourseReducer';
import { createContext, useEffect, useReducer } from 'react';
import { getCourses } from './apiCalls';

const INITIAL_STATE = {
	courses: [],
	isFetching: false,
	error: false,
};

export const CourseContext = createContext(INITIAL_STATE);

export const CourseContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CourseReducer, INITIAL_STATE);

	useEffect(() => getCourses(dispatch), []);

	return (
		<CourseContext.Provider
			value={{
				courses: state.courses,
				isFetching: state.isFetching,
				error: state.error,
				dispatch,
			}}>
			{children}
		</CourseContext.Provider>
	);
};
