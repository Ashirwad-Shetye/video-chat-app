import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

const io = new Server(PORT, {
  cors: true,
});

const nameToSocketIDMap = new Map();
const socketIDToNameMap = new Map();

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // join meeting lobby
  socket.on("room:join", (data) => {
    const { name, callID } = data;
    nameToSocketIDMap.set(name, socket.id);
    socketIDToNameMap.set(socket.id, name);
    io.to(callID).emit("user:joined", { name, id: socket.id });
    socket.join(callID);
    io.to(socket.id).emit("room:join", data);
  });

  // join meeting
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  // accept user
  socket.on("call:accepted", ({ to, answer }) => {
    io.to(to).emit("call:accepted", { from: socket.id, answer });
  });

  // exit meeting
  socket.on("call:exit", (data) => {
    const { name, callID } = data;
    socket.leave(callID);
    socket.to(callID).emit("call:exit", name);
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, answer }) => {
    console.log("peer:nego:done", answer);
    io.to(to).emit("peer:nego:final", { from: socket.id, answer });
  });
});

Server.EventEmitter(console.log("socket connected"));
