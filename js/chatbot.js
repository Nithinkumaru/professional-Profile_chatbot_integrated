const launcher = document.getElementById("chatbotLauncher");
const container = document.getElementById("chatbotContainer");
const closeBtn = document.getElementById("chatbotClose");
const messagesEl = document.getElementById("chatbotMessages");
const inputEl = document.getElementById("chatbotInput");
const sendBtn = document.getElementById("chatbotSend");

function appendMessage(text, sender = "bot") {
  const bubble = document.createElement("div");
  bubble.className = `chatbot-message ${sender}`;
  bubble.textContent = text;
  messagesEl.appendChild(bubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

launcher.addEventListener("click", () => {
  container.style.display = "flex";
  launcher.style.display = "none";
  if (!messagesEl.dataset.initialized) {
    appendMessage(
      "Hi, I'm your portfolio assistant. Ask me about projects, skills, or experience!"
    );
    messagesEl.dataset.initialized = "true";
  }
});

closeBtn.addEventListener("click", () => {
  container.style.display = "none";
  launcher.style.display = "flex";
});

function buildReply(text) {
  const lower = text.toLowerCase();

  if (lower.includes("project")) {
    return "You can ask me about specific projects from my portfolio, like web apps, AI projects, and more.";
  }

  if (lower.includes("skill") || lower.includes("skills")) {
    return "I can tell you about my skills (e.g. frontend, backend, AI/ML, etc.) and where I used them.";
  }

  if (lower.includes("experience")) {
    return "I can summarize my experience, roles, and impact. Try asking about a specific company or role.";
  }

  return "Thanks for your question! I'm a simple demo for now, but I can be connected to a smarter backend later.";
}

function handleUserMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  inputEl.value = "";

  const reply = buildReply(text);
  setTimeout(() => appendMessage(reply, "bot"), 400);
}

sendBtn.addEventListener("click", handleUserMessage);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleUserMessage();
  }
});
