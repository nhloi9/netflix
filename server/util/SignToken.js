import jwtkk from 'jsonwebtoken';
export const signToken = (data) => {
	return jwtkk.sign(data, process.env.SECRET_KEY, {
		expiresIn: '10d',
	});
};
