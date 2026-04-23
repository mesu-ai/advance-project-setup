import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-[90vh] text-center">
      <h1 className="text-5xl text-red-500">404 — Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default NotFound;
