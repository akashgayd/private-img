

export default function ImageTable({ images = [], onImageClick }) {




  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preview
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Documentation
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tags
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {images.length > 0 ? (
            images.map((image) => (
              <tr 
                key={image._id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onImageClick(image)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-12 rounded-md overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={image.imageUrl}
                      alt="Thumbnail"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900 line-clamp-2">
                    {image.documentation || 'No documentation'}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {image.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(image.uploadedAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No images available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
