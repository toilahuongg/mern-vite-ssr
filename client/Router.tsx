import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './routes/Home';
import Root from './routes/Root';
import './styles/app.scss';

const router = createBrowserRouter([
  {
    path: '',
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
