import { Link } from 'react-router-dom';

export default function AuthFooter({ text, linkText, linkTo }) {
  return (
    <div className="bg-gray-50 px-6 py-4 text-center">
      <p className="text-sm text-gray-600">
        {text}{' '}
        <Link to={linkTo} className="text-indigo-600 font-medium hover:text-indigo-500">
          {linkText}
        </Link>
      </p>
    </div>
  );
}