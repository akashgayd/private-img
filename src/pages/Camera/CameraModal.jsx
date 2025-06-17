import { useRef, useState } from 'react';

export default function CameraModal({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      setError('Camera access denied');
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    setImage(canvas.toDataURL('image/jpeg'));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Take Photo</h2>
        
        {!image ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              className="w-full bg-gray-200 rounded mb-4"
              style={{ height: '300px' }}
            />
            <div className="flex space-x-4">
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Start Camera
              </button>
              <button
                onClick={captureImage}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Capture
              </button>
            </div>
          </>
        ) : (
          <>
            <img 
              src={image} 
              alt="Captured" 
              className="w-full h-64 object-contain mb-4"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => setImage(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Retake
              </button>
              <button
                onClick={() => onCapture(image)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Use Photo
              </button>
            </div>
          </>
        )}
        
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}