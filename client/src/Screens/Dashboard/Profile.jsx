import React, {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import {Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {profileSchema} from '../../Validation/UserValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import {
	deleteProfileAction,
	updateUserProfileAction,
} from '../../Redux/Actions/UserActions';
import InlineError from '../../Components/Notifications/InlineError';
import UploadFile from '../../Components/UploadFile';
import toast from 'react-hot-toast';
import {UserConstants} from '../../Redux/Constants';

const Profile = () => {
	const dispatch = useDispatch();
	const {userInfo} = useSelector((state) => state.userLogin);
	const [imageUrl, setImageUrl] = useState(userInfo.image);
	const {isSuccess, isError, isLoading} = useSelector(
		(state) => state.userUpdateProfile
	);
	const {
		isSuccess: deleteSuccess,
		isError: deleteError,
		isLoading: deleteLoading,
	} = useSelector((state) => state.userDeleteProfile);

	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors},
	} = useForm({
		resolver: yupResolver(profileSchema),
	});

	const handleUpdateInfo = (data) => {
		dispatch(updateUserProfileAction({...data, image: imageUrl}));
	};

	const handleDeleteProfile = () => {
		dispatch(deleteProfileAction());
	};

	useEffect(() => {
		if (userInfo) {
			setValue('fullName', userInfo.fullName);
			setValue('email', userInfo.email);
		}
	}, [userInfo, setValue]);

	useEffect(() => {
		if (deleteSuccess) {
			toast.success('Delete Profile Success');
			dispatch({type: UserConstants.USER_DELETE_PROFILE_REQUEST});
		}
		if (deleteError) {
			toast.error(deleteError);
			dispatch({type: UserConstants.USER_DELETE_PROFILE_RESET});
		}
	}, [deleteSuccess, deleteError, dispatch]);

	useEffect(() => {
		if (isSuccess) {
			toast.success('User profile updated successfully');
			dispatch({type: UserConstants.USER_UPDATE_PROFILE_RESET});
		}
		if (isError) {
			toast.success(isError);
			dispatch({type: UserConstants.USER_UPDATE_PROFILE_RESET});
		}
	}, [isSuccess, isError, dispatch]);

	return (
		<Sidebar>
			<form
				className="w-full"
				onSubmit={handleSubmit(handleUpdateInfo)}
			>
				<h1 className="text-lg font-bold">Profile</h1>
				<br />
				<UploadFile
					setImageUrl={setImageUrl}
					type={'picture-circle'}
					imageUrl={imageUrl}
				/>
				<br />
				<label
					htmlFor=""
					className="block"
				>
					Full name
				</label>
				<input
					placeholder="enter your email address"
					className="block w-full h-[50px] mt-2 rounded bg-main p-3 border border-border"
					type="text"
					{...register('fullName')}
				/>
				{errors.fullName && <InlineError msg={errors.fullName.message} />}
				<br />
				<label
					htmlFor=""
					className="block"
				>
					Email
				</label>
				<input
					placeholder="enter your email address"
					className="block w-full h-[50px] mt-2 rounded bg-main p-3 border border-border"
					type="email"
					{...register('email')}
				/>
				{errors.email && <InlineError msg={errors.email.message} />}
				<br />
				<div className="flex justify-between">
					<Button
						type="primary"
						className="h-[40px]"
						danger
						disabled={deleteLoading}
						onClick={handleDeleteProfile}
					>
						{deleteLoading ? 'deleting...' : 'Delete Account'}
					</Button>
					<Button
						type="text"
						htmlType="submit"
						danger
						className="!border-gray-300 h-[40px]"
						disabled={isLoading}
					>
						{isLoading ? 'Updating...' : 'Update profile'}
					</Button>
				</div>
			</form>
		</Sidebar>
	);
};

export default Profile;
