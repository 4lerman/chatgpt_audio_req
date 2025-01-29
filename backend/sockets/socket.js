
import { generateResponse } from "../services/chat.js";

export const setUpChatSocket = (io) => {
	io.on("connection", (socket) => {
		console.log(`User connected: ${socket.id}`);

		socket.on("sendMessage", async (message) => {
			console.log(`Received message: ${message}`);

			try {
				const stream = await generateResponse(message);

				for await (const chunk of stream) {
					if (chunk.choices[0].delta?.content) {
						socket.emit("receiveMessage", chunk.choices[0].delta.content);
					}
				}
			} catch (err) {
				console.log("Error getting response", err)
				socket.emit("receiveMessage", "Error getting response.");
			}
		});

		socket.on("disconnect", () => `User disconnected: ${socket.id}`);
	});
};
