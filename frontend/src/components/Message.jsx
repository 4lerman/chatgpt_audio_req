import "./index.css";
import PropTypes from "prop-types";

const Message = ({ text, sender }) => {
	const isTranscribing = text.includes("Transcribing");
	return (
		<div
			className={`message ${
				sender === "user"
					? "message-user"
					: sender === "bot"
					? "message-bot"
					: "message-system"
			} ${isTranscribing ? "message-transcribing" : ""}`}
		>
			{text}
		</div>
	);
};

Message.propTypes = {
	text: PropTypes.string.isRequired,
	sender: PropTypes.string.isRequired,
};

export default Message;
