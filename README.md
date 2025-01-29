# **Voice Chat AI - React + Vite + Express + OpenAI Whisper**

## **📌 Project Overview**
The app records audio, transcribes it using **OpenAI Whisper**, and then processes the transcribed text through **ChatGPT (GPT-4)** to generate a response.

---

## **🚀 Tech Stack**
### **Frontend (Vite + React)**
- **React** (UI framework)
- **Vite** (Fast build tool)
- **Socket.io-client** (Real-time communication)
- **Axios** (HTTP requests)
- **CSS Modules** (For styling)

### **Backend (Express + OpenAI Whisper API)**
- **Node.js** + **Express.js** (Server)
- **Multer** (Handles audio file uploads)
- **OpenAI API** (Whisper for transcription + GPT-4 for responses)
- **Socket.io** (Real-time communication)
- **Cors & dotenv** (Security & configuration)

---

## **🎤 Features**
✅ **Record Voice Messages** – Users can record and send audio instead of typing.
✅ **Real-time Transcription** – Converts speech to text using OpenAI Whisper.
✅ **AI Chat Responses** – Uses ChatGPT to generate responses.
✅ **WebSocket Support** – Enables real-time messaging.
✅ **User-friendly UI** – Simple and responsive design.

---

## **📂 Project Structure**
```
/voice-chat-ai
│── /backend  (Express.js Server)
│   ├── /config           # API Keys & Configurations
│   ├── /controllers      # Handles routes & logic
│   ├── /routes           # Express API routes
│   ├── /services         # Handles OpenAI API & audio processing
│   ├── /sockets          # WebSocket logic
│   ├── .env              # Environment variables
│   ├── server.js         # Express server entry point
│── /frontend  (React + Vite)
│   ├── /src
│   │   ├── /components  # React components
│   │   ├── /services    # API & WebSocket services
│   │   ├── /config      # API Keys & Configurations
│   │   ├── App.jsx      # Main React component
│   ├── .env             # Frontend API keys & variables
│   ├── vite.config.js   # Vite config file
│── README.md            # Project Documentation
```

---



### **2️⃣ Setup the Backend**

- **Create a `.env` file** inside the `/backend` folder:
```ini
PORT=8000
OPENAI_API_KEY=your_openai_api_key_here
```

- **Start the backend server:**
```sh
npm run start:dev
```

### **3️⃣ Setup the Frontend**
```sh
cd ../frontend
npm install
```

- **Create a `.env` file** inside `/frontend`:
```ini
VITE_API_URL=http://localhost:8000
```

- **Start the frontend server:**
```sh
npm run dev
```

### **4️⃣ Open the App**
Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## **📌 How to Use**
1️⃣ Click the **Record** button and speak.
2️⃣ Click **Stop Recording**, and the app will transcribe your voice.
3️⃣ The transcribed text will be displayed in chat.
4️⃣ AI will respond based on the transcribed text.
5️⃣ Repeat to continue the conversation!

---