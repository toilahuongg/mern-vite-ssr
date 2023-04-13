import ErrorBoundary from '@client/components/ErrorBoundary';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: 'admin',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '2',
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
