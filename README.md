# ChatGPT Web Client

Web client for ChatGPT using the OpenAI API.

* Backend: Node.js + Express
* Frontend: HTML/CSS/JS

# Setup

1. Copy `.env` and paste your OpenAI API key:

```env
OPENAI_API_KEY=PASTE_YOUR_API_KEY_HERE
```

> get the key: https://platform.openai.com/api-keys

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open in a browser:
   http://localhost:3000

## Usage

* Enter a message in the text field and click Send.
* The ChatGPT response will appear in the chat.

# Notes

* This only works with a valid OpenAI API key.
* Server errors are displayed in the Node.js console.