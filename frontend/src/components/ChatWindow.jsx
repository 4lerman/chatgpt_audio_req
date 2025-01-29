import { useEffect, useRef, useState } from "react";
import socket from "../services/socket";
import Message from "./Message";
import { sendAudio } from "../services/api";

const ChatWindow = () => {
	const [messages, setMessages] = useState([]);
	const [recording, setRecording] = useState(false);
	const mediaRecorderRef = useRef(null);
	const audioChunksRef = useRef([]);

	useEffect(() => {
		socket.on("receiveMessage", (data) => {
			setMessages((prev) => [...prev, { text: data, sender: "bot" }]);
		});

		return () => socket.off("receiveMessage");
	}, []);

	const startRecording = async () => {
		setRecording(true);

		audioChunksRef.current = [];

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunksRef.current.push(event.data);
				}
			};

			mediaRecorder.start();
		} catch (err) {
			console.error("Error accessing microphone:", err);
		}
	};
	const stopRecording = async () => {
		setRecording(false);
		const mediaRecorder = mediaRecorderRef.current;
		if (!mediaRecorder) return;

		mediaRecorder.stop();

		const loadingMessageId = Date.now(); // Unique ID for tracking the message
		setMessages((prev) => [
			...prev,
			{ id: loadingMessageId, text: "Transcribing", sender: "system" },
		]);

		mediaRecorder.onstop = async () => {
			const audioBlob = new Blob(audioChunksRef.current, {
				type: "audio/webm",
			});
			const response = await sendAudio(audioBlob);

			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === loadingMessageId ? { ...msg, text: response.text, sender: "user" } : msg
				)
			);

			if (response.text) {
				socket.emit("sendMessage", response.text);
			}
		};
	};

	return (
		<div className="chat-container">
			<h2 className="chat-header">Chat with AI</h2>
			<div className="chat-messages">
				{messages.map((msg, idx) => (
					<Message key={idx} text={msg.text} sender={msg.sender} />
				))}
			</div>
			<div className="chat-input-container">
				<button
					onClick={recording ? stopRecording : startRecording}
					className={recording ? "stop-recording" : "start-recording"}
				>
					{recording ? "Stop Recording" : "Record Message"}
				</button>
			</div>
		</div>
	);
};

export default ChatWindow;
