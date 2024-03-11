import React from 'react';
import {useSelector} from 'react-redux';
import {Outlet, Navigate} from 'react-router-dom';

export const UserProtectedRouter = () => {
	const {userInfo} = useSelector((state) => state.userLogin);
	return userInfo?.token ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			replace={true}
		/>
	);
};

export const AdminProtectedRouter = () => {
	const {userInfo} = useSelector((state) => state.userLogin);
	return userInfo?.token ? (
		userInfo?.isAdmin ? (
			<Outlet />
		) : (
			<Navigate to={'/*'} />
		)
	) : (
		<Navigate to={'/login'} />
	);
};
