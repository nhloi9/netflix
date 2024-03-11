import React, {useEffect, useState} from 'react';
import Sidebar from '../Sidebar';
import {Button, Form, Input, Modal, Progress, Select, Spin} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import {InboxOutlined} from '@ant-design/icons';
import {MdDelete} from 'react-icons/md';
import {FaRegEdit} from 'react-icons/fa';
import {PlusOutlined} from '@ant-design/icons';
import UploadFile from '../../../Components/UploadFile';
import {useSelector} from 'react-redux';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {api} from '../../../Redux/Api/axios';

const AddMovie = () => {
	const navigate = useNavigate();
	const token = useSelector((state) => state.userLogin).userInfo?.token;
	const [progessUpload, setProgressUpload] = useState(0);

	const {categories} = useSelector((state) => state.getAllCategories);
	const [loading, setLoading] = useState(false);

	const [openAddCast, setOpenAddCast] = useState(false);

	const [casts, setCasts] = useState([]);
	const [editingCast, setEditingCast] = useState(null);
	const [titleImage, setTitleImage] = useState(null);
	const [image, setImage] = useState(null);

	const [video, setVideo] = useState(null);

	const handleAddCast = (name, image) => {
		setCasts([...casts, {name, image}]);
		setOpenAddCast(false);
	};

	const handleEditCast = (name, image) => {
		const copied = [...casts];
		copied[editingCast] = {name, image};
		setCasts(copied);
		setEditingCast(null);
	};

	// const uploadVideo = (video, newName) => {
	// 	const sizeOfChunk = 2 * 1024 * 1024;
	// 	const totalChunks = Math.ceil(video.size / sizeOfChunk);
	// 	let chunkNumber = 0;
	// 	const uploadChunk = () => {
	// 		const start = chunkNumber * sizeOfChunk;
	// 		const end = Math.min((chunkNumber + 1) * sizeOfChunk, video.size);
	// 		const formData = new FormData();

	// 		formData.append('file', video.slice(start, end));
	// 		formData.append('chunkNumber', chunkNumber);
	// 		formData.append('totalChunks', totalChunks);
	// 		formData.append('originalname', video.name);
	// 		formData.append('newName', newName);
	// 		axios
	// 			.post('http://localhost:3333/api/files/video', formData, {
	// 				headers: {
	// 					'Content-Type': 'multipart/form-data',
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			})
	// 			.then((res) => {
	// 				setProgressUpload(((chunkNumber + 1) / totalChunks) * 100);
	// 				if (chunkNumber < totalChunks - 1) {
	// 					chunkNumber++;
	// 					uploadChunk();
	// 				}
	// 			})
	// 			.catch((err) => toast.error('something went wrong'));
	// 	};
	// 	uploadChunk();
	// };

	const onFinish = async (value) => {
		const newName = Date.now() + '-' + Math.round(Math.random() * 1e9);
		setLoading(true);

		const sizeOfChunk = 2 * 1024 * 1024;
		const totalChunks = Math.ceil(video.size / sizeOfChunk);
		let chunkNumber = 0;
		const uploadChunk = () => {
			const start = chunkNumber * sizeOfChunk;
			const end = Math.min((chunkNumber + 1) * sizeOfChunk, video.size);
			const formData = new FormData();

			formData.append('file', video.slice(start, end));
			formData.append('chunkNumber', chunkNumber);
			formData.append('totalChunks', totalChunks);
			formData.append('originalname', video.name);
			formData.append('newName', newName);
			api
				.post('http://localhost:3333/api/files/video', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					setProgressUpload(((chunkNumber + 1) / totalChunks) * 100);
					if (chunkNumber < totalChunks - 1) {
						chunkNumber++;
						uploadChunk();
					} else {
						api
							.post(
								'http://localhost:3333/api/movies',
								{
									...value,
									video: newName,
									casts,
									image,
									titleImage,
								},
								{
									headers: {
										Authorization: `Bearer ${token}`,
									},
								}
							)
							.then(({data}) => {
								toast.success('Movie created successfully');
								navigate('/watch/' + data.slug);
							})
							.catch((error) => {
								console.log('Something went wrong');
							});
					}
				})
				.catch((err) => toast.error('something went wrong'));
		};
		uploadChunk();
	};

	useEffect(() => {});

	return (
		<div>
			<Sidebar>
				<div className="add-movie">
					<div className="flex justify-between">
						<h1 className="text-lg font-bold"> Create movie</h1>
					</div>
					<br />

					<Form
						onFinish={onFinish}
						layout="vertical"
						name="basic"
						initialValues={{
							remember: true,
						}}
						// onFinish={onFinish}
						// onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<div className="flex justify-between">
							<Form.Item
								className="w-[calc(50%-5px)] "
								label={<label className="text-gray-200">Movie Title</label>}
								name="name"
								rules={[
									{
										required: true,
										message: 'Please input movie title',
									},
								]}
							>
								<Input className="!bg-main !text-white" />
							</Form.Item>

							<Form.Item
								className="w-[calc(50%-5px)] "
								label={<label className="  text-gray-200">Hours</label>}
								name="time"
								rules={[
									{
										required: true,
										message: 'Please input movie time',
									},
								]}
							>
								<Input className="!bg-main !text-white" />
							</Form.Item>
						</div>
						<div className="flex justify-between">
							<Form.Item
								className="w-[calc(50%-5px)] "
								label={<label className="text-gray-200">Language</label>}
								name="language"
								rules={[
									{
										required: true,
										message: 'Please input movie language',
									},
								]}
							>
								<Input className="!bg-main !text-white" />
							</Form.Item>

							<Form.Item
								className="w-[calc(50%-5px)] "
								label={<label className="  text-gray-200">Year of relase</label>}
								name="year"
								rules={[
									{
										required: true,
										message: 'Please input year of relase',
									},
								]}
							>
								<Input className="!bg-main !text-white" />
							</Form.Item>
						</div>
						<div className="flex justify-between">
							<Form.Item
								className="w-[calc(50%-5px)] "
								label={<label className="text-gray-200">Image with title</label>}
								// name="username"
							>
								<UploadFile
									imageUrl={titleImage}
									setImageUrl={setTitleImage}
									type={'picture-card'}
								>
									<button
										style={{
											border: 0,
											background: 'none',
										}}
										type="button"
									>
										<PlusOutlined className="!text-white" />
										<div
											style={{
												marginTop: 8,
												color: 'white',
											}}
										>
											Upload
										</div>
									</button>
								</UploadFile>
							</Form.Item>

							<Form.Item
								className="w-[calc(50%-5px)] "
								label={<label className="text-white">Image without title</label>}
							>
								{/* <Dragger
							maxCount={1}
							onRemove={(file) => {
								setVideo(null);
							}}
							beforeUpload={(file) => {
								setVideo(file);
								return false;
							}}
							fileList={video ? [video] : []}
						>
							<p className="">
								<InboxOutlined
									color="white"
									className="!text-white"
								/>
							</p>
							<p className="ant-upload-text !text-gray-300">
								Click or drag file to this area to upload
							</p>
						</Dragger> */}
								<UploadFile
									imageUrl={image}
									setImageUrl={setImage}
									type={'picture-card'}
								>
									<button
										style={{
											border: 0,
											background: 'none',
										}}
										type="button"
									>
										<PlusOutlined className="!text-white" />
										<div
											style={{
												marginTop: 8,
												color: 'white',
											}}
										>
											Upload
										</div>
									</button>
								</UploadFile>
							</Form.Item>
						</div>

						<Form.Item
							className="w-full "
							label={<label className="text-gray-200">Description</label>}
							name="desc"
						>
							<Input.TextArea
								className="!bg-main !text-white"
								maxLength={100}
								rows={3}
							/>
						</Form.Item>

						<Form.Item
							className="w-full "
							label={<label className="text-gray-200">Category</label>}
							name="category"
						>
							<Select
								className="!bg-main !text-white "
								options={categories.map((category) => ({
									value: category.title,
									label: category.title,
								}))}
								// dropdownStyle={{backgroundColor: '#080a1a', color: '#ffff'}}
							/>
						</Form.Item>

						<Form.Item
							className="w-[calc(50%-5px)] "
							label={<label className="text-white">Movie video</label>}
						>
							<Dragger
								maxCount={1}
								onRemove={(file) => {
									setVideo(null);
								}}
								beforeUpload={(file) => {
									console.log(file.type);
									if (file.type === 'video/mp4') {
										setVideo(file);
									}
									return false;
								}}
								fileList={video ? [video] : []}
							>
								<p className="">
									<InboxOutlined
										color="white"
										className="!text-white"
									/>
								</p>
								<p className="ant-upload-text !text-gray-300">
									Click or drag file to this area to upload
								</p>
							</Dragger>
						</Form.Item>

						<div className="flex justify-between">
							<label
								className="text-white"
								htmlFor=""
							>
								Casts
							</label>
							<Button
								type="primary"
								className="bg-blue-500"
								onClick={() => setOpenAddCast(true)}
							>
								+
							</Button>
						</div>
						<div className="flex mb-5 overflow-x-hidden w-full hover:overflow-x-scroll">
							{casts?.map((cast, index) => (
								<div className="group relative p-2 italic border border-gray-500 flex flex-col items-center rounded mb-2">
									<img
										src={cast?.image}
										alt=""
										className=" w-[120px] h-[100px]  rounded object-cover block"
									/>
									<h1 className="text-sm text-white mt-1">{cast.name}</h1>
									<div className=" group-hover:flex hidden absolute rounded bg-[#0000008d] w-full h-full  items-center justify-center">
										<div className="flex gap-1 text-white">
											<MdDelete
												onClick={() => {
													setCasts(casts.filter((item, i) => i !== index));
												}}
												size={23}
												className="cursor-pointer"
											/>
											<FaRegEdit
												onClick={() => {
													setEditingCast(index);
												}}
												size={23}
												className="cursor-pointer"
											/>
										</div>
									</div>
								</div>
							))}
						</div>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}
						>
							<Button
								disabled={!video || !image || !titleImage}
								className="!bg-blue-400"
								type="primary"
								htmlType="submit"
								onClick={() => {}}
							>
								Create
							</Button>
						</Form.Item>
					</Form>

					{openAddCast && (
						<AddCastModal
							open={openAddCast}
							onCancel={() => {
								setOpenAddCast(false);
							}}
							onOk={handleAddCast}
						/>
					)}
					{editingCast !== null && (
						<AddCastModal
							open={editingCast !== null}
							onCancel={() => {
								setEditingCast(null);
							}}
							cast={casts[editingCast]}
							onOk={handleEditCast}
						/>
					)}
				</div>
			</Sidebar>
			{loading && (
				<div className="fixed top-0 left-0 bottom-0 right-0 z-30 bg-[#000000a0] flex items-center justify-center">
					{progessUpload < 100 ? (
						<div className="flex flex-col items-center">
							<Progress
								type="circle"
								percent={progessUpload}
							/>
							<p className="animate-pulse text-gray-400 ">Uploading </p>
						</div>
					) : (
						<div className="flex flex-col items-center">
							<Spin />
							<p className="animate-pulse text-gray-400 ">Processing</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

const AddCastModal = ({open, onCancel, onOk, cast}) => {
	const [name, setName] = useState('');
	const [image, setImage] = useState(null);

	useEffect(() => {
		if (cast) {
			setName(cast.name);
			setImage(cast.image);
		}
	}, [cast]);
	return (
		<Modal
			title={cast ? 'Edit Cast' : 'Add Cast'}
			open={open}
			destroyOnClose={true}
			onCancel={onCancel}
			footer={
				<div>
					<Button
						onClick={() => {
							onOk(name, image);
						}}
						className="bg-blue-500"
						type="primary"
						disabled={name.trim().length === 0 || image === null}
					>
						{cast ? 'Edit' : 'Add'}
					</Button>
				</div>
			}
		>
			<Form layout="vertical">
				<Form.Item label="Name">
					<Input
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</Form.Item>
				<Form.Item label="Image">
					<UploadFile
						imageUrl={image}
						setImageUrl={setImage}
						type={'picture-card'}
					>
						<button
							style={{
								border: 0,
								background: 'none',
							}}
							type="button"
						>
							<PlusOutlined className="!text-white" />
							<div
								style={{
									marginTop: 8,
									color: 'white',
								}}
							>
								Upload
							</div>
						</button>
					</UploadFile>
					{/* <label htmlFor="input-cast-img">
						<img
							alt=""
							src={image && URL.createObjectURL(image)}
							className=" block object-cover w-20 h-20 border rounded cursor-pointer"
						/>
					</label>
					<div>
						<input
							onChange={(e) => {
								if (e.target.files[0]) setImage(e.target.files[0]);
							}}
							id="input-cast-img"
							type="file"
							className="!hidden"
						/>
					</div> */}
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddMovie;
