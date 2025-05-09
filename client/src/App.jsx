import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import RootPage from '../pages/Layout/RootPage';
import { tokenLoader } from '../util/auth';
import { loader as getStatsForHomePageLoader } from '../pages/HomePage';
const HomePage = lazy(() => import('../pages/HomePage'));

import { action as loginRegisterAction } from '../pages/Auth/LoginRegisterPage';
import { action as logout } from '../pages/Auth/Logout';
const LoginRegisterPage = lazy(() => import('../pages/Auth/LoginRegisterPage'));

import { loader as getAllPlayersLoader } from '../pages/Players/PlayersListPage';
import { action as createUpdatePlayerAction } from '../components/Players/PlayerForm';
import { loader as getPlayerDetailsLoader } from '../pages/Players/PlayerDetailsPage';
const NewPlayerPage = lazy(() => import('../pages/Players/NewPlayerPage'));
const PlayerDetailsPage = lazy(() => import('../pages/Players/PlayerDetailsPage'));
const EditPlayerPage = lazy(() => import('../pages/Players/EditPlayerPage'));
const PlayersListPage = lazy(() => import('../pages/Players/PlayersListPage'));
const PlayersRootPage = lazy(() => import('../pages/Players/PlayerRootPage'));

import { loader as getAllBetsLoader } from '../pages/Bets/BetsListPage';
import { loader as getBedDetailsLoader } from '../pages/Bets/BetDetailsPage';
import EditBetPage from '../pages/Bets/EditBetPage';
const BetDetailsPage = lazy(() => import('../pages/Bets/BetDetailsPage'));
const BetsRootPage = lazy(() => import('../pages/Bets/BetsRootPage'));
const BetsListPage = lazy(() => import('../pages/Bets/BetsListPage'));

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
          loader: getStatsForHomePageLoader
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
              loader: getAllPlayersLoader
            },
            {
              path: ':id',
              id: 'player-detail',
              loader: getPlayerDetailsLoader,
              children: [
                {
                  index: true,
                  element: <Suspense fallback={<p>Loading ....</p>}><PlayerDetailsPage /></Suspense>,
                },
                {
                  path: 'edit',
                  element: <Suspense fallback={<p>Loading ....</p>}><EditPlayerPage /></Suspense>,
                  action: createUpdatePlayerAction
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
          id: 'bets-root',
          element: <Suspense fallback={<p>Loading ....</p>}><BetsRootPage /></Suspense>,
          loader: getAllPlayersLoader,
          children: [
            {
              index: true,
              element: <Suspense fallback={<p>Loading ....</p>}><BetsListPage /></Suspense>,
              id: 'bets-list',
              loader: getAllBetsLoader
            },
            {
              path: ':id',
              id: 'bet-detail',
              loader: getBedDetailsLoader,
              children: [
                {
                  index: true,
                  element: <Suspense fallback={<p>Loading ....</p>}><BetDetailsPage /></Suspense>,
                },
                {
                  path: 'edit',
                  element: <Suspense fallback={<p>Loading ....</p>}><EditBetPage /></Suspense>,
                },
              ]
            }
          ]
        },
        {
          path: 'profile',
          element: <p>Page currently unavailable</p>
        },
        {
          path: 'challenges',
          element: <p>Page currently unavailable</p>
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
