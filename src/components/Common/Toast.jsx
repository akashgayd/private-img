import { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationIcon, XIcon } from '@heroicons/react/solid';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    warning: 'bg-yellow-50'
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800'
  };

  const icons = {
    success: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
    error: <XCircleIcon className="h-5 w-5 text-red-400" />,
    warning: <ExclamationIcon className="h-5 w-5 text-yellow-400" />
  };

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`${bgColors[type]} rounded-lg shadow-lg overflow-hidden w-72`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {icons[type]}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className={`text-sm font-medium ${textColors[type]}`}>
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => {
                  setVisible(false);
                  onClose();
                }}
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}