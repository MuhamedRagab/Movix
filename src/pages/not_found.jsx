const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 mr-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
