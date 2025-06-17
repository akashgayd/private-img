export default function AuthFormContainer({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-indigo-100 mt-1">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}