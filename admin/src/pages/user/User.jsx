import {
	LocationSearching,
	MailOutline,
	PhoneAndroid,
	Publish,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useUsers from '../../context/userContext/hook';
import './user.css';

export default function User() {
	const { getUserById, updateUserInfo } = useUsers();
	const { userId } = useParams();

	if (!userId) return <>No user selected.. Please select one :</>;

	const data = getUserById(userId);
	if (!data) return <>User not found...</>;

	const image_uri = `https://source.unsplash.com/user/${data.username}`;

	return (
		<div className='user'>
			{console.log(data)}
			<div className='userTitleContainer'>
				<h1 className='userTitle'>Edit User</h1>
				<Link to='/newUser'>
					<button className='userAddButton'>Create</button>
				</Link>
			</div>
			<div className='userContainer'>
				<div className='userShow'>
					<div className='userShowTop'>
						<img src={image_uri} alt='' className='userShowImg' />
						<div className='userShowTopTitle'>
							<span className='userShowInfoTitle'>{data.username}</span>
						</div>
					</div>
					<div className='userShowBottom'>
						<span className='userShowTitle'>Contact Details</span>
						<div className='userShowInfo'>
							<PhoneAndroid className='userShowIcon' />
							<span className='userShowInfoTitle'>
								{data.phone || '+91 9893784075'}
							</span>
						</div>
						<div className='userShowInfo'>
							<MailOutline className='userShowIcon' />
							<span className='userShowInfoTitle'>{data.email}</span>
						</div>
						<div className='userShowInfo'>
							<LocationSearching className='userShowIcon' />
							<span className='userShowInfoTitle'>
								{data.address || 'Durg, Chhattisgarh'}
							</span>
						</div>
					</div>
				</div>
				<div className='userUpdate'>
					<span className='userUpdateTitle'>Edit</span>
					<form className='userUpdateForm'>
						<div className='userUpdateLeft'>
							<div className='userUpdateItem'>
								<label>Username</label>
								<div style={{ color: 'gray' }}>{data.username}</div>
							</div>
							<div className='userUpdateItem'>
								<label>Email</label>
								<div style={{ color: 'gray' }}>{data.email}</div>
							</div>
							<div className='userUpdateItem'>
								<label>Full Name</label>
								<input
									type='text'
									placeholder={data.fullname || 'New name'}
									className='userUpdateInput'
								/>
							</div>
							<div className='userUpdateItem'>
								<label>Phone</label>
								<input
									type='text'
									placeholder='+91 7976456787'
									className='userUpdateInput'
								/>
							</div>
							<div className='userUpdateItem'>
								<label>Address</label>
								<input
									type='text'
									placeholder='Durg | Chattisgarh'
									className='userUpdateInput'
								/>
							</div>
						</div>
						<div className='userUpdateRight'>
							<div className='userUpdateUpload'>
								<img className='userUpdateImg' src={image_uri} alt='' />
								<label htmlFor='file'>
									<Publish className='userUpdateIcon' />
								</label>
								<input type='file' id='file' style={{ display: 'none' }} />
							</div>
							<button onClick={updateUserInfo} className='userUpdateButton'>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
