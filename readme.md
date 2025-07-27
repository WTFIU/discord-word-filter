# Discord Message Filter (Chrome Extension)

This extension blocks messages with inappropriate words before sending them on Discord.

## 🧠 How It Works
It monitors typed messages and blocks them if they contain flagged words.

## 📦 How to Install

1. Download or clone this repo.
2. Open Chrome or Chromium and go to: `chrome://extensions`
3. Enable **Developer Mode** (top right)
4. Click **“Load unpacked”**
5. Select the folder with these files.

You're done! Try sending a Discord message with a bad word — it will block it.

## 📝 To Customize the Word List
Edit `filter.js` and change this line:

```js
const badWords = ["badword1", "poop", "stupid"];
