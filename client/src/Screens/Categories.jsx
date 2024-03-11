import React, {useEffect, useState} from 'react';
import Sidebar from './Dashboard/Sidebar';
import {
	Button,
	Input,
	InputNumber,
	Popconfirm,
	Table,
	Form,
	Typography,
	Modal,
} from 'antd';
import {AiFillPlusCircle, AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {createCategoryAction} from '../Redux/Actions/CategoryActions';
import toast from 'react-hot-toast';
import {CategoryConstants} from '../Redux/Constants';
const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const Categories = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const {categories, isError} = useSelector((state) => state.getAllCategories);
	const {isError: createError, isSuccess: createSuccess} = useSelector(
		(state) => state.createCategory
	);
	const [editingKey, setEditingKey] = useState('');
	const isEditing = (record) => record._id === editingKey;
	const [onCreate, setOnCreate] = useState(false);
	const [title, setTitle] = useState('');

	const edit = (record) => {
		form.setFieldsValue({
			_id: '',
			title: '',
			...record,
		});
		setEditingKey(record._id);
	};

	const columns = [
		{
			title: 'Id',
			dataIndex: '_id',
		},
		{
			title: 'Title',
			dataIndex: 'title',

			editable: true,
		},

		{
			title: 'Action',
			key: 'action',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							// onClick={() => save(record.key)}
							style={{
								marginRight: 8,
							}}
						>
							Save
						</Typography.Link>
						<Popconfirm
							title="Sure to cancel?"
							// onConfirm={cancel}
						>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link
						disabled={editingKey !== ''}
						onClick={() => edit(record)}
					>
						Edit
					</Typography.Link>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const handleCreateCategory = () => {
		dispatch(createCategoryAction(title));
	};

	useEffect(() => {
		if (createSuccess) {
			toast.success('Create category successfully');
			setOnCreate(false);
			setTitle('');
		}
		if (createError) {
			toast.error(createError);
		}
		dispatch({type: CategoryConstants.CREATE_CATEGORY_RESET});
	}, [createError, createSuccess, dispatch]);

	useEffect(() => {
		if (isError) {
			toast.error(isError);
			dispatch({
				type: CategoryConstants.GET_ALL_CATEGORIES_RESET,
			});
		}
	}, [dispatch, isError]);
	return (
		<Sidebar>
			<div>
				<div className="flex justify-between py-1">
					<h1 className="text-lg font-bold">Categories</h1>
					<Button
						onClick={() => setOnCreate(true)}
						className="!w-[70px]"
						type="primary"
						danger
						icon={<AiFillPlusCircle className="-my-[2px]" />}
					></Button>
				</div>
				<Form
					form={form}
					component={false}
				>
					<Table
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						bordered
						dataSource={categories}
						columns={mergedColumns}
						rowClassName="editable-row"
					/>
				</Form>

				<Modal
					title="Create a new category"
					onCancel={() => setOnCreate(false)}
					footer={
						<div>
							<Button
								type="primary"
								disabled={title?.trim()?.length === 0}
								className="!w-full bg-blue-500"
								onClick={handleCreateCategory}
							>
								Create
							</Button>
						</div>
					}
					open={onCreate}
					destroyOnClose={true}
				>
					<Input
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						className=""
						placeholder="Enter a name"
					/>
				</Modal>

				{/* <Table
					columns={columns}
					dataSource={categories}
					size="small"
					pagination={{
						pageSize: 5,
						style: {
							backgroundColor: 'white',
						},
					}}
				/> */}
			</div>
		</Sidebar>
	);
};

export default Categories;
