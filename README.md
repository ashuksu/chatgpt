# ChatGPT Web Client

Web client for ChatGPT using the OpenAI API.

* Backend: Node.js + Express
* Frontend: HTML/CSS/JS

<img width="300" alt="Screenshot" src="https://github.com/user-attachments/assets/8e04b54e-5108-421f-8d02-e826f0115d3d" />



## Setup

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

## Notes

* This only works with a valid OpenAI API key.
* Server errors are displayed in the Node.js console.

## How to check your OpenAI limit and plan

* This means your API key has reached its request limit.
* The server caught the error `429` and returned it to the frontend:

```
{ reply: "Error: OpenAI request failed. Check server console." }
```
* Check the Billing API: https://platform.openai.com/account/billing/overview
* Go to: https://platform.openai.com/account/usage
* See how many tokens/requests are remaining
