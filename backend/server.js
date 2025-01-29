import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { setUpChatSocket } from "./sockets/socket.js";
import { PORT } from "./config/env.js";
import chatRouter from "./routes/index.js"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());

app.use("/api", chatRouter)

setUpChatSocket(io);

server.listen(PORT, () => {
	console.log(`Server is running on port - ${PORT}`);
});
