import { Routes, Route } from "react-router-dom";
import MeetingRoom from "./pages/meetingRoom/MeetingRoom";
import Lobby from "./pages/lobby/Lobby";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/call/:callId" element={<MeetingRoom />} />
      </Routes>
    </div>
  );
}

export default App;
