import { useState, useRef } from 'react';
import api from '../../utils/api';

export default function UploadModal({ isOpen, onClose, onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [documentation, setDocumentation] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    const file = files[0];
    console.log('Selected file:', file);
    console.log('File details:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    });
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    // Validate file type
    if (!file.type || !file.type.startsWith('image/')) {
      alert("Please select a valid image file");
      return;
    }

    setUploading(true);

    // Create FormData properly
    const formData = new FormData();
    formData.append('image', file, file.name);
    
    if (documentation && documentation.trim()) {
      formData.append('documentation', documentation.trim());
    }

    // Log FormData contents
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      console.log('Starting upload...');

      const response = await api.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 second timeout
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Upload progress:', percentCompleted + '%');
          }
        }
      });

      console.log('Upload successful:', response.data);
      
      // Reset form
      setFiles([]);
      setDocumentation('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Callback to parent component
      if (onUploadComplete) {
        onUploadComplete();
      }
      
      onClose();
      alert('Image uploaded successfully!');
      
    } catch (err) {
      console.error('Upload failed:', err);
      console.error('Error details:', {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status
      });
      
      let errorMessage = 'Image upload failed. Please try again.';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Upload timeout. Please try with a smaller file or check your connection.';
      } else if (err.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setFiles([]);
      setDocumentation('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Upload Images</h2>

        <form onSubmit={handleSubmit}>
          {/* File Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Images</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={uploading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center text-gray-500">
                <svg
                  className="w-12 h-12 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Click to select files</span>
                {files.length > 0 && (
                  <span className="text-sm mt-2">{files.length} file(s) selected</span>
                )}
              </div>
            </button>
          </div>

          {/* File Preview */}
          {files.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Selected Files:</label>
              <div className="max-h-32 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded mb-1">
                    <span className="text-sm truncate">{file.name}</span>
                    <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documentation Textarea */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Documentation</label>
            <textarea
              value={documentation}
              onChange={(e) => setDocumentation(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Add notes about these images..."
              disabled={uploading}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={uploading}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}