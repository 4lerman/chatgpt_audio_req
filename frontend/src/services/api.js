import axios from "axios";
import { BASE_URL } from "../config/env";

const API_BASE_URL = BASE_URL + "/api";

export const sendAudio = async (audioBlob) => {
	const formData = new FormData();
	formData.append("file", audioBlob, "audio.webm");

	try {
		const response = await axios.post(API_BASE_URL + "/to_text", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		return response.data;
	} catch (err) {
		console.log("Error sending audio: ", err);
    	return { success: false, text: "⚠️ Transcription failed." };
	}
};
