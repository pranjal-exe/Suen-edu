import './userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useUsers from '../../context/userContext/hook';

export default function UserList() {
	const { users, loading } = useUsers();

	const columns = [
		{ field: '_id', headerName: 'ID', width: 90 },
		{
			field: 'user',
			headerName: 'User',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='userListUser'>
						<img
							className='userListImg'
							src={`https://source.unsplash.com/user/${params.row.username}`}
							alt=''
						/>
						{params.row.username}
					</div>
				);
			},
		},
		{ field: 'email', headerName: 'Email', width: 200 },

		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={'/user/' + params.row.id}>
							<button className='userListEdit'>Edit</button>
						</Link>
						<DeleteOutline
							className='userListDelete'
							// onClick={() => handleDelete(params.row.id)}
						/>
					</>
				);
			},
		},
	];

	if (loading) {
		return (
			<div
				style={{
					flexGrow: 4,
				}}
			>
				Loading....
			</div>
		);
	} else {
		return (
			<div className='userList'>
				<DataGrid
					rows={users}
					disableSelectionOnClick
					columns={columns}
					pageSize={8}
					checkboxSelection
				/>
			</div>
		);
	}
}
