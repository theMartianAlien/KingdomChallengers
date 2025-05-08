import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import RootPage from '../pages/Layout/RootPage';

import { tokenLoader } from '../util/auth';
const HomePage = lazy(() => import('../pages/HomePage'));
import { action as loginRegisterAction } from '../pages/Auth/LoginRegisterPage';
const LoginRegisterPage = lazy(() => import('../pages/Auth/LoginRegisterPage'));

import { action as logout } from '../pages/Auth/Logout';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootPage />,
      id: 'root',
      loader: tokenLoader,
      children: [
        {
          index: true,
          element: <Suspense fallback={<p>Loading ....</p>}><HomePage /></Suspense>,
        },
        {
          path: 'login',
          element: <Suspense fallback={<p>Loading ....</p>}><LoginRegisterPage /></Suspense>,
          action: loginRegisterAction
        },
        {
          path: 'register',
          element: <Suspense fallback={<p>Loading ....</p>}><LoginRegisterPage isLogin={false} /></Suspense>,
          action: loginRegisterAction
        },
        {
          path: 'logout',
          action: logout
        }
      ]
    }
  ]
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
