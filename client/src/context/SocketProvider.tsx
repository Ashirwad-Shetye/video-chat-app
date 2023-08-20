import { createContext, useMemo, useContext, ReactNode } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

interface Props {
  children: ReactNode;
}

function SocketProvider(props: Props) {
  const socket = useMemo(() => io("http://localhost:5000"), []);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
