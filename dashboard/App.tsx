import { RouteObject } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './routes/Home';
import Root from './routes/Root';
import './styles/app.scss';

export const routes: RouteObject[] = [
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
];
