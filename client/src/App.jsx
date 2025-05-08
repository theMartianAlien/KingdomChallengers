import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import RootPage from '../pages/Layout/RootPage';

import { tokenLoader } from '../util/auth';
const HomePage = lazy(() => import('../pages/HomePage'));
import { action as loginRegisterAction } from '../pages/Auth/LoginRegisterPage';
const LoginRegisterPage = lazy(() => import('../pages/Auth/LoginRegisterPage'));

import { action as logout } from '../pages/Auth/Logout';
import { loader } from '../pages/Players/PlayersListPage';
import { action as createUpdatePlayerAction } from '../components/Players/PlayerForm';
const NewPlayerPage = lazy(() => import('../pages/Players/NewPlayerPage'));
const PlayerDetailsPage = lazy(() => import('../pages/Players/PlayerDetailsPage'));
import {loader as getPlayerDetailsLoader} from '../pages/Players/PlayerDetailsPage';
const PlayersListPage = lazy(() => import('../pages/Players/PlayersListPage'));
const PlayersRootPage = lazy(() => import('../pages/Players/PlayerRootPage'));

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
        },
        {
          path: 'players',
          element: <Suspense fallback={<p>Loading ....</p>}><PlayersRootPage /></Suspense>,
          children: [
            {
              index: true,
              element: <Suspense fallback={<p>Loading ....</p>}><PlayersListPage /></Suspense>,
              id: 'players-list',
              loader: loader
            },
            {
              path: ':id',
              id: 'player-detail',
              children: [
                {
                  index: true,
                  element: <Suspense fallback={<p>Loading ....</p>}><PlayerDetailsPage /></Suspense>,
                  loader: getPlayerDetailsLoader
                }
              ]
            },
            {
              path: 'new',
              element: <Suspense fallback={<p>Loading ....</p>}><NewPlayerPage /></Suspense>,
              action: createUpdatePlayerAction
            }
          ]
        },
        {
          path: 'bets',
          element: <p>bets</p>
        },
        {
          path: 'profile',
          element: <p>Profile</p>
        },
        {
          path: 'challenges',
          element: <p>Challenges</p>
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
