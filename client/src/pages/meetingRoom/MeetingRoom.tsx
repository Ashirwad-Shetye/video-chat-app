import { useEffect, useCallback, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { Button } from "../../components/ui/button";
import WebRTCService from "../../services/webRTC-service";
import ReactPlayer from "react-player";

interface User {
  name: string;
  id: string;
}

interface Call {
  from: string;
  offer: RTCSessionDescription;
  answer: RTCSessionDescription;
}

function MeetingRoom() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [userList, setUserList] = useState([]);

  const handleUserJoined = useCallback(({ name, id }: User) => {
    setUserList((prevUserList) => [...prevUserList, name]);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await WebRTCService.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: Call) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const answer = await WebRTCService.getAnswer(offer);
      socket.emit("call:accepted", { to: from, answer });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      WebRTCService.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ answer }: Call) => {
      WebRTCService.setLocalDescription(answer);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await WebRTCService.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    WebRTCService.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      WebRTCService.peer.removeEventListener(
        "negotiationneeded",
        handleNegoNeeded
      );
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const answer = await WebRTCService.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, answer });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ answer }) => {
    await WebRTCService.setLocalDescription(answer);
  }, []);

  const handleCallExit = useCallback(async () => {
    setMyStream(null);
    setUserList((prevUserList) => prevUserList.filter((id) => id !== name));
    socket.emit("call:exit", { to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    WebRTCService.peer.addEventListener("track", async (ev) => {
      const remoteStream: MediaStream[] = [...ev.streams];
      if (remoteStream.length > 0) {
        setRemoteStream(remoteStream[0]);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("userLeft", ({ name }: User) => {
      setUserList((prevUserList) => prevUserList.filter((id) => id !== name));
    });

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div>
      <h1>Room Page</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {myStream && <Button onClick={sendStreams}>Send Stream</Button>}
      {remoteSocketId && <Button onClick={handleCallUser}>CALL</Button>}
      {myStream && (
        <>
          <h1>My stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={myStream}
          />
          <Button onClick={handleCallExit} className="w-fit">
            Exit Call
          </Button>
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
        </>
      )}
    </div>
  );
}

export default MeetingRoom;
