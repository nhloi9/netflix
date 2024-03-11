import React, {useState} from 'react';
import {Upload} from 'antd';
import toast from 'react-hot-toast';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		toast.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		toast.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

const UploadFile = ({imageUrl, setImageUrl, type}) => {
	const [loading, setLoading] = useState(false);
	const handleChange = (info) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			// getBase64(info.file.originFileObj, url => {
			setLoading(false);
			setImageUrl(info.file.response.url);
			// })
		}
	};
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);
	return (
		<Upload
			name="file"
			listType={type}
			className="avatar-uploader"
			showUploadList={false}
			action="http://localhost:3333/api/files"
			beforeUpload={beforeUpload}
			onChange={handleChange}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt="avatar"
					className={`${type === 'picture-card' ? 'rounded-sm' : 'rounded-full'}`}
					style={{
						width: '100%',
						height: '100%',
						display: 'block',
						// borderRadius: '10000px',
						objectFit: 'cover',
					}}
				/>
			) : (
				uploadButton
			)}
		</Upload>
	);
};

export default UploadFile;
