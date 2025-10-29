import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';

const HomeScreen = lazy(() => import('./components/HomeScreen'));
const GameScreen = lazy(() => import('./components/GameScreen'));
const LevelsHub = lazy(() => import('./screens/LevelsHub'));
const LevelScreen = lazy(() => import('./screens/LevelScreen'));
const NotFound = lazy(() => import('./screens/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />

      <Route path="/game">
        <Route index element={<Navigate to="/game/1" replace />} />
        <Route path=":level" element={<GameScreen />} />
      </Route>

      <Route path="/levels" element={<LevelsHub />} />
      <Route path="/levels/:levelId" element={<LevelScreen />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
