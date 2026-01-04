import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await openai.responses.create({
            model: process.env.MODEL,
            input: userMessage,
        });

        res.json({
            reply: response.output_text,
        });
    } catch (err) {
        console.error("❌ OpenAI error:", err);
        res.status(500).json({
            reply: "<span class='error'>Error: </span>OpenAI request failed. Check server console.",
        });
    }
});

app.listen(3000, () => {
    console.log("✅ Server running at http://localhost:3000");
});