import * as dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/auth", messageRoutes);

app.listen(3333, () => {
  console.log("Server is running on port");
});
