import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import UploadModal from '../components/Upload/UploadModal';
import CameraButton from '../pages/Camera/CameraButton';
import Loader from '../components/Common/Loader';
import Toast from '../components/Common/Toast';

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/images/my-images');
      setImages(res.data.data.images);
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to load images' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCapture = async (imageData) => {
    try {
      const blob = await fetch(imageData).then((r) => r.blob());
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('image', file);

      await api.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setToast({ type: 'success', message: 'Photo uploaded successfully!' });
      fetchData();
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to upload photo' });
    }
    setShowCamera(false);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/images/delete/${id}`);
      setImages(images.filter((img) => img._id !== id));
      setToast({ type: 'success', message: 'Image deleted successfully' });
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to delete image' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-4 justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-700">
            📂 My Image Dashboard
          </h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              📤 <span>Upload</span>
            </button>
            <button
              onClick={() => navigate('/gallery')}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              🖼️ <span>Gallery</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white shadow rounded-xl p-5 text-center">
                <h3 className="text-sm font-medium text-gray-500">Total Uploads</h3>
                <p className="mt-2 text-3xl font-bold text-indigo-600">{images.length}</p>
              </div>
              <div className="bg-white shadow rounded-xl p-5 text-center">
                <h3 className="text-sm font-medium text-gray-500">Storage Used</h3>
                <p className="mt-2 text-3xl font-bold text-indigo-600">
                  {(images.length * 0.5).toFixed(1)} MB
                </p>
              </div>
              <div className="bg-white shadow rounded-xl p-5 text-center">
                <h3 className="text-sm font-medium text-gray-500">Last Upload</h3>
                <p className="mt-2 text-md font-semibold text-gray-700">
                  {images[0]?.uploadedAt
                    ? new Date(images[0].uploadedAt).toLocaleString()
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Image Gallery */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                📸 Recent Images
              </h2>
              {images.length === 0 ? (
                <div className="text-center text-gray-500 p-10 bg-white rounded-lg shadow">
                  No images uploaded yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {images.map((img) => (
                    <div
                      key={img._id}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                    >
                      <img
                        src={img.imageUrl}
                        alt="Uploaded"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500 truncate w-32">
                          {new Date(img.uploadedAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDelete(img._id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadComplete={() => {
          fetchData();
          setToast({
            type: 'success',
            message: 'Images uploaded successfully!',
          });
        }}
      />

      {/* Camera */}
      <CameraButton
        onCapture={handleCapture}
        visible={showCamera}
        onClose={() => setShowCamera(false)}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
