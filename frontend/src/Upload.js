// Upload.js
import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file.');
            return;
        }

        const token = localStorage.getItem('jwt'); // ✅ 获取登录 token
        if (!token) {
            setMessage('You must be logged in to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('files', file);

        try {
            setUploading(true);
            const response = await axios.post('http://localhost:1337/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });

            setMessage('Upload successful!');
            console.log('Uploaded file:', response.data);
        } catch (error) {
            setMessage('Upload failed.');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>File Upload</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <p>{message}</p>
        </div>
    );
}

export default Upload;
