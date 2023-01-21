import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { CourseContextProvider } from './context/courseContext/CourseContext';
import { CategoryContextProvider } from './context/categoryContext/CategoryContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<CourseContextProvider>
				<CategoryContextProvider>
					<App />
				</CategoryContextProvider>
			</CourseContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
