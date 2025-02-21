import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL!],
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: process.env.CLIENT_URL!, credentials: true }));

const userSocketMap: { [key: string]: string } = {};
const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.data.userId = userId;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    const storedUserId = socket.data.userId;
    if (storedUserId) {
      delete userSocketMap[storedUserId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, getReceiverSocketId, io, server };
