async function send() {
    const input = document.getElementById("input");
    const chat = document.getElementById("chat");

    const message = input.value.trim();
    if (!message) return;

    chat.innerHTML += `<div class="message user">You: ${message}</div>`;
    input.value = "";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message}),
        });

        const data = await res.json();

        chat.innerHTML += `<div class="message bot">ChatGPT: ${data.reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    } catch (err) {
        chat.innerHTML += `<div class="message bot">Error connecting to server</div>`;
    }
}