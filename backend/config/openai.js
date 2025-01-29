import OpenAI from "openai";
import { OPEN_API_KEY } from "./env.js";

const openai = new OpenAI({ apiKey: OPEN_API_KEY });

export default openai;
