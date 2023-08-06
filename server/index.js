import { Server } from "socket.io";
import { Express } from "express";

const PORT = process.env.PORT || 5000;

const io = new Server(PORT);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

Server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
