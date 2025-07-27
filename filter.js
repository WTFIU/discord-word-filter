const badWords = ["nigga", "nigger", "fuck", "dumbass", "shit", "whore", "ass", "bitch", "dumbfuck"]; // Customize as needed

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const messageBox = document.querySelector('[data-slate-editor="true"]');
    if (!messageBox) return;

    const text = messageBox.textContent.toLowerCase();
    const found = badWords.find(word => text.includes(word));

    if (found) {
      event.preventDefault();
      alert(`🚫 Message blocked for containing: "${found}"`);
    }
  }
});
