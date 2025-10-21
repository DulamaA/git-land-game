import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import LevelsHub from './screens/LevelsHub';
import LevelScreen from './screens/LevelScreen';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/game/:level" element={<GameScreen />} />
      <Route path="/levels" element={<LevelsHub />} />
      <Route path="/levels/:levelId" element={<LevelScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
