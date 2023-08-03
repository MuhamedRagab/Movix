import { useNavigate } from "react-router-dom";

const ErrorBoundary = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-6">Oops! Something went wrong.</h1>
        <p className="text-gray-600">
          An error occurred while trying to load this page. Please try again
          later.
        </p>
        <button
          onClick={() => navigate(0, { replace: true })}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
