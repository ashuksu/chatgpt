const input = document.getElementById("input");
const chat = document.getElementById("chat");
const counterEl = document.getElementById("charCount");
const limitEl = document.getElementById("charLimit");

let MAX_CHARS = 500;
limitEl.textContent = MAX_CHARS;

fetch("/api/config")
    .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
    })
    .then(config => {
        MAX_CHARS = Number(config.maxInputChars);
        limitEl.textContent = MAX_CHARS;
    })
    .catch(err => {
        console.error("Failed to load config:", err);
    });

input.addEventListener("input", () => {
    const len = input.value.length;
    counterEl.textContent = len;
    counterEl.classList.toggle("error", len > MAX_CHARS);
});

async function send() {
    const message = input.value.trim();
    if (!message) return;

    if (message.length > MAX_CHARS) {
        appendMessage("System", "Message too long", "error");
        return;
    }

    appendMessage("You", message, "user", "block");
    input.value = "";
    counterEl.textContent = "0";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message}),
        });

        if (!res.ok) {
            throw new Error("Server error");
        }

        const data = await res.json();
        appendMessage("ChatGPT", data.reply, "bot");

    } catch (err) {
        appendMessage("ChatGPT", "Error connecting to server", "error");
    }
}

function appendMessage(author, text, className, extraClass = "") {
    chat.insertAdjacentHTML("beforeend", `<div class="message ${extraClass}">
            <span class="${className}">${author}:</span><br>
            ${text}
        </div>`);

    chat.scrollTop = chat.scrollHeight;
}

// Enter — to send, Shift+Enter — new string
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
    }
});
