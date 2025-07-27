const badWords = ["nigga", "nigger", "fuck", "dumbass", "shit", "whore", "ass", "bitch", "dumbfuck"]; // Customize as needed

function containsBadWord(text) {
  text = text.toLowerCase();
  return badWords.some(word => text.includes(word));
}

function blockMessage() {
  alert("🚫 Your message contains inappropriate words and was blocked.");
}

function getMessageText() {
  // Discord's message input uses a div with contenteditable and a Slate editor
  const editor = document.querySelector('[data-slate-editor="true"]');
  if (!editor) return "";
  return editor.innerText || editor.textContent || "";
}

function interceptSend(event) {
  const message = getMessageText();
  if (containsBadWord(message)) {
    event.preventDefault();
    event.stopPropagation();
    blockMessage();
    return false;
  }
  return true;
}

function addListeners() {
  const editor = document.querySelector('[data-slate-editor="true"]');
  if (!editor) return;

  // Remove previous listeners to avoid duplicates
  editor.removeEventListener("keydown", onKeyDown);
  editor.addEventListener("keydown", onKeyDown);
}

function onKeyDown(event) {
  // Enter key pressed without Shift (Shift+Enter adds newline)
  if (event.key === "Enter" && !event.shiftKey) {
    if (!interceptSend(event)) {
      // Block sending
      return;
    }
  }
}

// Run periodically to attach listener (Discord recreates editor sometimes)
setInterval(() => {
  addListeners();
}, 1000);
