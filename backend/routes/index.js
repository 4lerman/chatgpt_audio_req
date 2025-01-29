import { Router } from "express";
import multer, { memoryStorage } from "multer";
import { sendAudio } from "../controllers/chat.js";

const chatRouter = Router();
const upload = multer({ storage: memoryStorage() });

chatRouter.post("/to_text", upload.single("file"), sendAudio);

export default chatRouter;
