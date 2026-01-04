import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{role: "user", content: userMessage}],
        });

        res.json({
            reply: response.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
});

app.listen(3000, () => {
    console.log("✅ Server running at http://localhost:3000");
});
