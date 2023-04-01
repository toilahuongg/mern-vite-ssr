import { RouteObject } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './routes/Home';
import Root from './routes/Root';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
];
