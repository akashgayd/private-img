import { useState } from 'react';
import api from '../utils/api';
import CameraModal from './Camera/CameraModal';

export default function ImageUploadForm() {
  const [file, setFile] = useState(null);
  const [documentation, setDocumentation] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleCapture = (imageData) => {
    setFile(dataURLtoFile(imageData, 'capture.jpg'));
    setPreview(imageData);
    setShowCamera(false);
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('documentation', documentation);
    formData.append('tags', JSON.stringify(tags));

    try {
      await api.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Reset form
      setFile(null);
      setPreview('');
      setDocumentation('');
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Image</h2>
      
      {showCamera && (
        <CameraModal 
          onCapture={handleCapture} 
          onClose={() => setShowCamera(false)} 
        />
      )}

      <form onSubmit={handleSubmit}>
        {/* Image Preview */}
        {preview && (
          <div className="mb-4">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-64 mx-auto rounded"
            />
          </div>
        )}

        {/* Upload Options */}
        <div className="flex space-x-4 mb-4">
          <label className="flex-1 cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded text-center">
              Choose File
            </div>
          </label>
          <button
            type="button"
            onClick={() => setShowCamera(true)}
            className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded"
          >
            Take Photo
          </button>
        </div>

        {/* Documentation Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={documentation}
            onChange={(e) => setDocumentation(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Add documentation about this image..."
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            placeholder="Add tags (comma separated)"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const tag = e.target.value.trim().replace(',', '');
                if (tag) setTags([...tags, tag]);
                e.target.value = '';
              }
            }}
            className="w-full p-2 border rounded"
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter(t => t !== tag))}
                  className="ml-1 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!file}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded disabled:opacity-50"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}