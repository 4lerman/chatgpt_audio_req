import { transcribeAudio } from "../services/chat.js";

export const sendAudio = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No audio file provided" });
		}

		const response = await transcribeAudio(req.file);
		res.json(response);
	} catch (err) {
		console.log("Transcription failed:", err)
		res.json({text: "Transcription failed!"})
	}
};
