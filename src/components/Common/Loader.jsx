import React from 'react';

export default function Loader({ fullScreen = true, size = 'md' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : ''}`}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-indigo-500 ${sizeClasses[size]}`}></div>
    </div>
  );
}
