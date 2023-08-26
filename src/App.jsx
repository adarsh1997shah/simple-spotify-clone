import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import MusicList from '@/common/components/MusicList';

import Home from '@/views/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <Navigate to="/for-you" replace />,
      },
      {
        path: 'for-you',
        element: <MusicList />,
      },
      {
        path: 'top-tracks',
        element: <div>Top tracks</div>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/for-you" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
