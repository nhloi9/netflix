import {Spin} from 'antd';
import React from 'react';

const Loading = () => {
	return (
		<div className="w-full h-[50vh] flex items-center justify-center">
			<Spin />
		</div>
	);
};

export default Loading;
