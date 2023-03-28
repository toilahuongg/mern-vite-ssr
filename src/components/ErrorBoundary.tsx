import { useMemo } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  const messageError = useMemo(() => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return "This page doesn't exist!";
      }

      if (error.status === 401) {
        return "You aren't authorized to see this";
      }

      if (error.status === 503) {
        return 'Looks like our API is down';
      }

      if (error.status === 418) {
        return '🫖';
      }
    }
    return 'Something went wrong!!';
  }, [error]);
  if (isRouteErrorResponse(error))
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-white font-extrabold text-9xl">{error.status}</h1>
          <p className="text-gray text-2xl mt-4">{messageError} </p>
          <div className="text-gray underline hover:text-primary mt-2 cursor-pointer">
            <Link to="/"> Back to home {'~~>'}</Link>
          </div>
        </div>
      </div>
    );
  throw error;
};

export default ErrorBoundary;
