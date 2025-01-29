import openai from "../config/openai.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_RETRIES = 3;

export const generateResponse = (userMessage) => {
	try {
		const stream = openai.beta.chat.completions.stream({
			model: "gpt-4o-mini-realtime-preview",
			messages: [{ role: "user", content: userMessage }],
			stream: true,
		});

		return stream;
	} catch (err) {
		console.error(`OpenAI error: ${err}`);
		throw new Error("Failed to fetch response from OpenAI");
	}
};

export const transcribeAudio = async (file, retries = 0) => {
	try {
		const tempFilePath = path.join(__dirname, "audio.webm");
		fs.writeFileSync(tempFilePath, file.buffer);

		const response = await openai.audio.transcriptions.create({
			model: "whisper-1",
			file: fs.createReadStream(tempFilePath),
		});

		fs.unlinkSync(tempFilePath);

		return response;
	} catch (err) {
		if (retries < MAX_RETRIES && err.code === "ECONNRESET") {
			const delay = Math.pow(2, retries) * 1000; // 2s, 4s, 8s
			console.warn(`Retrying in ${delay / 1000} seconds...`);
			await new Promise((resolve) => setTimeout(resolve, delay));
			return transcribeAudio(file, retries + 1);
		}

		throw new Error("Failed to transcribe audio after multiple attempts: ", err);
	}
};
