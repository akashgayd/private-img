import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Common/Navbar';
import Loader from './components/Common/Loader';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import GalleryPage from './pages/GalleryPage';

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {loading && <Loader fullScreen />}

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/login" element={<Login setLoading={setLoading} />} />
          <Route path="/signup" element={<Signup setLoading={setLoading} />} />
          <Route path="/dashboard" element={<Dashboard setLoading={setLoading} />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
               <Route path="/gallery" element={<GalleryPage/>} />

        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
