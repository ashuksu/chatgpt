const input = document.getElementById("input");
const chat = document.getElementById("chat");

async function send() {
    const message = input.value.trim();
    if (!message) return;

    appendMessage("You", message, "user");
    input.value = "";

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

function appendMessage(author, text, className) {
    chat.insertAdjacentHTML("beforeend", `<div class="message">
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
