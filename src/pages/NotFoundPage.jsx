import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-bold text-emerald-600 dark:text-emerald-400">
        404
      </p>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        Page not found
      </h2>
      <p className="mt-2 max-w-prose text-gray-600 dark:text-gray-400">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
