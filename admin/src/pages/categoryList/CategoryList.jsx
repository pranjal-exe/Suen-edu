import './categoryList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CategoryContext } from '../../context/categoryContext/CategoryContext';
import {
	deleteCategory,
	getCategories,
} from '../../context/categoryContext/apiCalls';

export default function ListList() {
	const { categories, dispatch } = useContext(CategoryContext);

	useEffect(() => {
		getCategories(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		deleteCategory(id, dispatch);
	};

	const columns = [
		{ field: '_id', headerName: 'ID', width: 250 },
		{ field: 'title', headerName: 'title', width: 250 },
		{ field: 'tag', headerName: 'Tag', width: 150 },
		{ field: 'type', headerName: 'type', width: 150 },
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link
							to={{ pathname: '/category/' + params.row._id, category: params.row }}
						>
							<button className='productListEdit'>Edit</button>
						</Link>
						<DeleteOutline
							className='productListDelete'
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className='productList'>
			<DataGrid
				rows={categories}
				disableSelectionOnClick
				columns={columns}
				pageSize={8}
				checkboxSelection
				getRowId={(r) => r._id}
			/>
		</div>
	);
}
