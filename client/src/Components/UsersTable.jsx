import React from 'react';
import {MdDelete} from 'react-icons/md';

import {Button, Space, Table} from 'antd';

const UsersTable = ({data, deleteUserHandler}) => {
	const columns = [
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'imageđ',
			render: (url) => (
				<div className="w-12 h-12 border border-border p-[2px]">
					<img
						src={url}
						alt=""
						className="w-full h-full block object-cover"
					/>
				</div>
			),
		},
		{
			title: 'Id',
			dataIndex: '_id',
			key: 'id',
		},
		{
			title: 'Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (timeStamp) => <span>{timeStamp?.slice(0, 10)}</span>,
		},
		{
			title: 'Full name',
			dataIndex: 'fullName',
			key: 'fullName',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},

		{
			title: 'Action',
			key: 'action',
			render: (_, record) =>
				!record?.isAdmin && (
					<Space size="middle">
						<Button
							icon={<MdDelete />}
							onClick={() => deleteUserHandler(record?._id)}
						>
							Delete
						</Button>
					</Space>
				),
		},
	];
	return (
		<div className="overflow-y-scroll user-table">
			<Table
				dataSource={data}
				columns={columns}
				pagination={{
					pageSize: 5,
					style: {
						backgroundColor: 'white',
					},
				}}
			></Table>
		</div>
	);
};

export default UsersTable;
