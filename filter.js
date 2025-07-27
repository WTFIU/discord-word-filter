// Load external profanity libraries if possible (e.g., leo-profanity)
// For demonstration, here's a robust custom implementation:

const badWords = [
  "nigga", "nigger", "fuck", "dumbass", "shit", "whore", "ass", "bitch", "dumbfuck",
  // Add more words and phrases here
];

const badPhrases = [
  "kill yourself", "go die", "commit suicide",
  // Add offensive phrases here
];

// Utility: Normalize message aggressively
function normalizeText(text) {
  // Remove accents, normalize unicode
  text = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  // Remove zero-width characters
  text = text.replace(/[\u200B-\u200F\uFEFF]/g, "");
  // Replace leetspeak and common substitutions
  const leetMap = {
    "@": "a", "4": "a", "1": "i", "!": "i", "3": "e", "0": "o", "$": "s", "5": "s", "7": "t", "|": "i"
  };
  text = text.replace(/[=@431!30$57|]/g, m => leetMap[m] || m);
  // Remove punctuation and spaces
  text = text.replace(/[\s\W_]+/g, "");
  // Collapse repeated letters (e.g., fuuuuuck -> fuck)
  text = text.replace(/(.)\1{2,}/g, "$1");
  return text.toLowerCase();
}

// Utility: Fuzzy match (matches off-by-one edits, etc.)
function fuzzyMatch(word, text) {
  // Simple implementation: allow one wrong or missing character
  let pattern = word.split('').map(char => `[${char}]+?`).join(".{0,1}");
  let regex = new RegExp(pattern, "i");
  return regex.test(text);
}

function containsBadContent(rawText) {
  let normText = normalizeText(rawText);
  // Check bad words (exact and fuzzy)
  for (const word of badWords) {
    let normWord = normalizeText(word);
    if (normText.includes(normWord) || fuzzyMatch(normWord, normText)) {
      return word;
    }
  }
  // Check bad phrases (normalize, remove spaces)
  for (const phrase of badPhrases) {
    let normPhrase = normalizeText(phrase);
    if (normText.includes(normPhrase)) {
      return phrase;
    }
  }
  return null;
}

function blockMessage(content) {
  alert(`🚫 Your message contains inappropriate content (${content}) and was blocked.`);
}

function getMessageText() {
  // Discord's message input uses a div with contenteditable and a Slate editor
  const editor = document.querySelector('[data-slate-editor="true"]');
  if (!editor) return "";
  return editor.innerText || editor.textContent || "";
}

function interceptSend(event) {
  const message = getMessageText();
  const badContent = containsBadContent(message);
  if (badContent) {
    event.preventDefault();
    event.stopPropagation();
    blockMessage(badContent);
    return false;const badWords = ["nigga", "nigger", "fuck", "dumbass", "shit", "whore", "ass", "bitch", "dumbfuck"]; // Customize as needed

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

  }
  return true;
}

function addListeners() {
  const editor = document.querySelector('[data-slate-editor="true"]');
  if (!editor) return;
  editor.removeEventListener("keydown", onKeyDown);
  editor.addEventListener("keydown", onKeyDown);
}

function onKeyDown(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    if (!interceptSend(event)) return;
  }
}

setInterval(() => {
  addListeners();
}, 1000);
