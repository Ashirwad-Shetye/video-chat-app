type RTCService = {
  peer: RTCPeerConnection;
  getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit>;
  setLocalDescription(answer: RTCSessionDescriptionInit): Promise<void>;
  getOffer(): Promise<RTCSessionDescriptionInit>;
  exitCall(): Promise<void>
};

const WebRTCService = (): RTCService => {
  let peer = new RTCPeerConnection({
    iceServers: [{
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:global.stun.twilio.com:3478",
      ],
    }],
  });

  const getAnswer = async (offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> => {
    if (peer) {
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(new RTCSessionDescription(answer));
      return answer;
    } else {
      throw new Error("Peer connection is not initialized.");
    }
  };

  const setLocalDescription = async (answer: RTCSessionDescriptionInit): Promise<void> => {
    if (peer) {
      await peer.setRemoteDescription(new RTCSessionDescription(answer));
    } else {
      throw new Error("Peer connection is not initialized.");
    }
  };

  const getOffer = async (): Promise<RTCSessionDescriptionInit> => {
    if (peer) {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    } else {
      throw new Error("Peer connection is not initialized.");
    }
  };

  const exitCall = async (): Promise<void> => {
    if (peer) {
      peer.close();
      peer = null;
    }
  };

  return {
    peer,
    getAnswer,
    setLocalDescription,
    getOffer,
    exitCall,
  };
};

export default WebRTCService();
