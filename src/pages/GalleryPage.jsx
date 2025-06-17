import { useEffect, useState } from 'react';
import api from '../utils/api';
import Pagination from '../components/Common/Pagination';
import Loader from '../components/Common/Loader';

const ITEMS_PER_PAGE = 12;

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await api.get('/images/my-images');
        setImages(res.data?.data?.images || []);
      } catch (err) {
        console.error('Error fetching images:', err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const paginatedImages = images.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-indigo-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700">📸 My Gallery</h1>
          <p className="text-gray-600 mt-2">All your uploaded memories in one place.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : paginatedImages.length === 0 ? (
          <p className="text-center text-gray-500">No images uploaded yet.</p>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paginatedImages.map((image) => (
                <div
                  key={image._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div
                    className="h-48 sm:h-56 md:h-64 bg-gray-100 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.imageUrl}
                      alt="User upload"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(image.uploadedAt).toLocaleDateString()}</span>
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
                        {image.tags?.[0] || 'Uncategorized'}
                      </span>
                    </div>
                    {image.documentation && (
                      <p className="text-gray-700 text-sm line-clamp-2">{image.documentation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>

      {/* Full Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full rounded-xl overflow-auto shadow-xl">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-indigo-700">Image Details</h2>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-500 hover:text-red-500 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <img
                  src={selectedImage.imageUrl}
                  alt="Large preview"
                  className="w-full max-h-[75vh] object-contain rounded-lg"
                />
                <div className="space-y-4">
                  <p>
                    <strong>Uploaded:</strong> {new Date(selectedImage.uploadedAt).toLocaleString()}
                  </p>
                  {selectedImage.documentation && (
                    <div>
                      <strong>Documentation:</strong>
                      <p className="bg-gray-100 p-3 rounded mt-1 text-gray-700">
                        {selectedImage.documentation}
                      </p>
                    </div>
                  )}
                  {selectedImage.tags?.length > 0 && (
                    <div>
                      <strong>Tags:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedImage.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
