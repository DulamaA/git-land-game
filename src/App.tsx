import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import GlobalFooter from './components/GlobalFooter';

const HomeScreen = lazy(() => import('./components/HomeScreen'));
const GameScreen = lazy(() => import('./components/GameScreen'));
const LevelsHub = lazy(() => import('./screens/LevelsHub'));
const LevelScreen = lazy(() => import('./screens/LevelScreen'));
const NotFound = lazy(() => import('./screens/NotFound'));
const FinishGame = lazy(() => import('./screens/FinishGame'));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Suspense fallback={<div className="p-6">Laddar…</div>}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />

            <Route path="/game">
              <Route index element={<Navigate to="/game/1" replace />} />
              <Route path=":level" element={<GameScreen />} />
            </Route>

            <Route path="/levels" element={<LevelsHub />} />
            <Route path="/levels/:levelId" element={<LevelScreen />} />
            <Route path="/congrats" element={<FinishGame />} />

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </main>

      <GlobalFooter />
    </div>
  );
}
