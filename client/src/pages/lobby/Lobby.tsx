import { useState, useCallback, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useSocket } from "../../context/SocketProvider";
import { useNavigate } from "react-router-dom";

interface BEdata {
  name: string;
  callID: string;
}

function Lobby() {
  const [name, setName] = useState("");
  const [callID, setCallID] = useState("");

  const socket = useSocket();

  const navigate = useNavigate();

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      socket.emit("room:join", { name, callID });
    },
    [callID, name, socket]
  );

  const handleJoinRoom = useCallback(
    (data: BEdata) => {
      const { callID } = data;
      navigate(`call/${callID}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="w-full h-24 flex items-center">
        <h1 className="px-12">Lobby</h1>
      </div>
      <section>
        <form className="flex flex-col">
          <label htmlFor="Name">
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="Meeting_ID">
            Call ID:{" "}
            <input
              type="text"
              value={callID}
              onChange={(e) => setCallID(e.target.value)}
            />
          </label>
          <Button
            type="button"
            onClick={handleFormSubmit}
            variant={"outline"}
            className="w-24"
          >
            Join Call
          </Button>
        </form>
      </section>
    </div>
  );
}

export default Lobby;
