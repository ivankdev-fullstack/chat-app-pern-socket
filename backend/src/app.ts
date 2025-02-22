import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
dotenv.config();

const PORT = process.env.PORT || 3333;
const app = express();
const server = http.createServer(app);

// configuration
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL!, credentials: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// socket
const userSocketMap: { [key: string]: string } = {};
const getReceiverSocketId = (receiverId: string) => userSocketMap[receiverId];

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL!,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

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

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

export { getReceiverSocketId, io };
