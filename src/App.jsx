import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameTable from "./components/GameTable/GameTable";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GameTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
