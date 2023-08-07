import { Routes, Route } from "react-router-dom";
import VideoCall from "./pages/videoCall/VideoCall";
import Lobby from "./pages/lobby/Lobby";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/videoCall" element={<VideoCall />} />
      </Routes>
    </div>
  );
}

export default App;
