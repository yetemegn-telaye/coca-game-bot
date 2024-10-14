import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameScreen from './features/mainGame';
import MainMenu from './features/mainMenu';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/game-screen" element={<GameScreen />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
