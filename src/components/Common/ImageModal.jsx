export default function ImageModal({ isOpen, onClose, image }) {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">Image Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={image.imageUrl}
                alt="Full size"
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>

            <div>
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-1">Documentation</h3>
                <p className="whitespace-pre-line bg-gray-50 p-3 rounded">
                  {image.documentation || 'No documentation provided'}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-1">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {image.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-1">Upload Details</h3>
                <p className="text-sm text-gray-600">
                  Uploaded on: {new Date(image.uploadedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}