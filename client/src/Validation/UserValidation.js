import * as yup from 'yup';

const registerSchema = yup.object().shape({
	email: yup.string().email().required('email is required').trim(),
	password: yup
		.string()
		.required('password is required')
		.max(20, 'password must be less than 20 characters')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
			'Minimum 6 characters, at least one letter and one number'
		),
	fullName: yup
		.string()
		.required('full name is required')
		.max(20, 'full name must be at least 20 characters')
		.matches(/^[a-zA-Z]/, 'full name must only contain letters'),
});

const loginSchema = yup.object().shape({
	email: yup.string().email().required('email is required').trim(),
	password: yup.string().required('password is required'),
	// .min(6, 'password must be at least 6 characters')
	// .max(20, 'password must be less than 20 characters')
	// .matches(
	// 	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
	// 	'Minimum 6 characters, at least one letter and one number'
	// ),
});
const profileSchema = yup.object().shape({
	fullName: yup
		.string()
		.required('full name is required')
		.max(20, 'full name must be at least 20 characters')
		.matches(/^[a-zA-Z]/, 'full name must only contain letters'),
	email: yup.string().email().required('email is required').trim(),
});

const passwordSchema = yup.object().shape({
	oldPassword: yup.string().required('old password is required'),
	newPassword: yup
		.string()
		.required('new password is required')
		.max(20, 'password must be less than 20 characters')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
			'Minimum 6 characters, at least one letter and one number'
		),
	confirmPassword: yup.string().required('confirm password is required'),
});

export {registerSchema, loginSchema, profileSchema, passwordSchema};
