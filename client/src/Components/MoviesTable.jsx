import {Button, Space, Table} from 'antd';
import React from 'react';
import {
	AiOutlineDelete,
	AiOutlineDownload,
	AiOutlineEdit,
	AiOutlineEye,
} from 'react-icons/ai';
import {Link} from 'react-router-dom';

const MoviesTable = ({data, isAdmin}) => {
	const columns = [
		{
			title: 'Image',
			dataIndex: 'titleImage',
			key: 'image',
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
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
		},
		{
			title: 'Language',
			dataIndex: 'language',
			key: 'language',
		},
		{
			title: 'Year',
			dataIndex: 'year',
			key: 'year',
		},
		{
			title: 'Hours',
			dataIndex: 'time',
			key: 'hours',
		},

		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					{isAdmin ? (
						<>
							<Button icon={<AiOutlineEdit />}>Edit</Button>
							<Button>
								<AiOutlineDelete />
							</Button>
						</>
					) : (
						<>
							<Button icon={<AiOutlineDownload />}>Download</Button>
							<Link to={'/movie/' + record?._id}>
								<Button>
									<AiOutlineEye />
								</Button>
							</Link>
						</>
					)}
				</Space>
			),
		},
	];
	return (
		<div className="overflow-x-scroll movie-table">
			<Table
				// className='!bg-main'
				columns={columns}
				dataSource={data}
				size="small"
				pagination={{
					pageSize: 5,
					style: {
						backgroundColor: 'white',
					},
				}}
			/>
		</div>
	);
};

export default MoviesTable;
