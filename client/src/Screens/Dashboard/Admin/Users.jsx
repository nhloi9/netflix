import React, {useEffect} from 'react';
import Sidebar from '../Sidebar';
import UsersTable from '../../../Components/UsersTable';
import {UserData} from '../../../Data/UserData';
import {useDispatch, useSelector} from 'react-redux';
import {
	adminDeleteUserAction,
	adminGetAllUsersAction,
} from '../../../Redux/Actions/UserActions';
import toast from 'react-hot-toast';
import {UserConstants} from '../../../Redux/Constants';

const Users = () => {
	const dispatch = useDispatch();
	const {isLoading, isError, users} = useSelector(
		(state) => state.adminGetAllUsers
	);

	const {
		isLoading: deleteLoading,
		isError: deleteError,
		isSuccess: deleteSuccess,
	} = useSelector((state) => state.adminDeleteUser);

	const deleteUserHandler = (id) => {
		dispatch(adminDeleteUserAction(id));
	};

	useEffect(() => {
		dispatch(adminGetAllUsersAction());
	}, [dispatch]);

	useEffect(() => {
		if (isError) {
			toast.error(isError);
			dispatch({
				type: UserConstants.GET_ALL_USERS_RESET,
			});
		}
	}, [isError, dispatch]);

	useEffect(() => {
		if (deleteError) {
			toast.error(deleteError);
			dispatch({
				type: UserConstants.DELETE_USER_RESET,
			});
		}
	}, [deleteError, dispatch]);

	useEffect(() => {
		if (deleteSuccess) {
			toast.success('User deleted successfully');

			dispatch({type: UserConstants.DELETE_USER_RESET});
		}
	}, [deleteSuccess, dispatch]);
	return (
		<Sidebar>
			<div>
				<div className="flex justify-between">
					<h1 className="text-lg font-bold"> Users</h1>
				</div>
				<br />
				<UsersTable
					data={users}
					deleteUserHandler={deleteUserHandler}
				/>
			</div>
		</Sidebar>
	);
};

export default Users;
