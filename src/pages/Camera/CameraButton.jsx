import { useCallback, useRef } from 'react';

export default function CameraButton({ onCapture, visible, onClose }) {
  const videoRef = useRef();
  const canvasRef = useRef();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert('Camera access denied!');
      onClose();
    }
  }, []);

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    onCapture(canvas.toDataURL('image/jpeg'));
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Take Photo</h2>
        
        <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4" style={{ height: '400px' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={capturePhoto}
            className="px-4 py-2 bg-red-600 text-white rounded-full"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}