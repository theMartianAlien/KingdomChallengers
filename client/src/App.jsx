import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense, StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import RootPage from '../pages/Layout/RootPage';
import { checkAuthLoader, tokenLoader } from '../util/auth';
const HomePage = lazy(() => import('../pages/HomePage'));

import { action as loginRegisterAction } from '../pages/Auth/LoginRegisterPage';
import { action as logout } from '../pages/Auth/Logout';
import { action as discordLogin } from '../pages/Auth/DiscordPage';
const LoginRegisterPage = lazy(() => import('../pages/Auth/LoginRegisterPage'));
const DiscordPage = lazy(() => import('../pages/Auth/DiscordPage'));

import { loader as getAllPlayersLoader } from '../pages/Players/PlayersListPage';
import { action as createUpdatePlayerAction } from '../components/Players/PlayerForm';
import { loader as getPlayerDetailsLoader } from '../pages/Players/PlayerDetailsPage';
import { action as deletePlayerAction } from '../components/Players/PlayersList';
const NewPlayerPage = lazy(() => import('../pages/Players/NewPlayerPage'));
const PlayerDetailsPage = lazy(() => import('../pages/Players/PlayerDetailsPage'));
const EditPlayerPage = lazy(() => import('../pages/Players/EditPlayerPage'));
const PlayersListPage = lazy(() => import('../pages/Players/PlayersListPage'));
const PlayersRootPage = lazy(() => import('../pages/Players/PlayerRootPage'));

import { loader as getAllBetsLoader } from '../pages/Bets/BetsListPage';
import { loader as getBedDetailsLoader } from '../pages/Bets/BetDetailsPage';
import EditBetPage from '../pages/Bets/EditBetPage';
import { action as patchPostChallengeAction } from '../components/Challenges/ChallengesForm';
import { loader as getChallengeDetailsLoader } from '../pages/Challenges/ChallengeDetailsPage';
const BetDetailsPage = lazy(() => import('../pages/Bets/BetDetailsPage'));
const BetsRootPage = lazy(() => import('../pages/Bets/BetsRootPage'));
const BetsListPage = lazy(() => import('../pages/Bets/BetsListPage'));

import { action as postCounterChallengeAction } from '../pages/Challenges/ChallengeDetailsPage';
import { loader as getProfileLoader } from '../pages/Auth/ProfilePage';
import { action as patchCounterChallengeAction } from '../components/Challenges/CounterTable';
import DiscordRootPage from '../pages/Discord/DiscordRootPage';
import DiscordListPage from '../pages/Discord/DiscordListPage';
const ChallengesRootPage = lazy(() => import('../pages/Challenges/ChallengesRootPage'));
const ChallengesListPage = lazy(() => import('../pages/Challenges/ChallengesListPage'));
const NewChallengePage = lazy(() => import('../pages/Challenges/NewChallengesPage'));
const ChallengeDetailsPage = lazy(() => import('../pages/Challenges/ChallengeDetailsPage'));
const ChallengeEditPage = lazy(() => import('../pages/Challenges/ChallengeEditPage'));

const ProfilePage = lazy(() => import('../pages/Auth/ProfilePage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
})

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
          loader: () => import('../pages/HomePage').then((module) => module.loader()),
        },
        {
          path: 'login',
          element: <Suspense fallback={<p>Loading ....</p>}><LoginRegisterPage /></Suspense>,
          action: loginRegisterAction
        },
        {
          path: 'auth/discord',
          element: <Suspense fallback={<p>Loading ....</p>}><DiscordPage /></Suspense>,
          action: discordLogin
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
              loader: getAllPlayersLoader,
              action: deletePlayerAction
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
              loader: checkAuthLoader,
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
          element: <Suspense fallback={<p>Loading ....</p>}><ProfilePage /></Suspense>,
          loader: getProfileLoader
        },
        {
          path: 'challenges',
          id: 'challenges-root',
          element: <Suspense fallback={<p>Loading ....</p>}><ChallengesRootPage /></Suspense>,
          loader: () => import('../pages/Players/PlayersListPage').then((module) => module.loader()),
          children: [
            {
              index: true,
              element: <Suspense fallback={<p>Loading ....</p>}><ChallengesListPage /></Suspense>,
              loader: () => import('../pages/Challenges/ChallengesListPage').then((module) => module.loader()),
            },
            {
              path: ':id',
              id: 'challenge-detail',
              loader: getChallengeDetailsLoader,
              children: [
                {
                  index: true,
                  element: <Suspense fallback={<p>Loading ....</p>}><ChallengeDetailsPage /></Suspense>,
                  action: postCounterChallengeAction,
                },
                {
                  path: 'edit',
                  element: <Suspense fallback={<p>Loading ....</p>}><ChallengeEditPage /></Suspense>,
                  action: patchPostChallengeAction
                },
                {
                  path: ':counterId/counter/:action',
                  action: patchCounterChallengeAction
                }
              ]
            },
            {
              path: 'new',
              element: <Suspense fallback={<p>Loading ....</p>}><NewChallengePage /></Suspense>,
              action: patchPostChallengeAction
            }
          ]
        }, {
          path: 'discord',
          id: 'discord-root',
          element: <Suspense fallback={<p>Loading ....</p>}><DiscordRootPage /></Suspense>,
          children: [
            {
              index: true,
              element: <Suspense fallback={<p>Loading ....</p>}><DiscordListPage /></Suspense>,
              loader: () => import('../pages/Discord/DiscordListPage').then((module) => module.loader()),
            },
          ]
        }
      ]
    }
  ]
);

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
