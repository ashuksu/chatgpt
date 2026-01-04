import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const MODEL = process.env.MODEL || "gpt-4.1";

const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
    const {message} = req.body;

    if (!message || typeof message !== "string") {
        return res.status(400).json({
            reply: "<span class='error'>Error 400:</span><br>Invalid message",
        });
    }

    try {
        const response = await openai.responses.create({
            model: MODEL,
            input: message,
        });

        res.json({
            reply: response.output_text || "No response",
        });
    } catch (err) {
        console.error("❌ OpenAI error:", err);

        res.status(500).json({
            reply: "<span class='error'>Error 500:</span><br>OpenAI request failed. Check server console.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});