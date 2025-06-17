import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, removeAuthToken } from '../../utils/auth';

export default function Navbar() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="DailyPicTrack Logo" 
            className="h-8 w-auto mr-2"
          />
          <h1 className="text-2xl font-bold text-indigo-600">DailyPicTrack</h1>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-1">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}