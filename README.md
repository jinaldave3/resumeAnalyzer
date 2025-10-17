<h1 align="center">🧩 Resume Analyzer Chrome Extension</h1>

<p align="center">
  <b>Analyze your resume directly against job descriptions — right from LinkedIn or Indeed.</b><br>
  Built with ❤️ by <a href="https://jinaldave3.github.io/jinaldave-portfolio/">Jinal Dave</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Chrome-Extension-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-orange?style=flat-square" />
</p>

---

## 🌟 Overview

The **Resume Analyzer** is a Chrome extension that helps job seekers instantly evaluate how well their resume aligns with a job description.  
Upload your resume once, visit any LinkedIn or Indeed job post, and get a match score within seconds — all inside a sleek, privacy-friendly popup interface.

---

## ✨ Features

- 📄 **Upload Once → Analyze Anytime** — resume stored locally via `localStorage`.  
- 🧠 **Smart Text Extraction** — automatically captures job descriptions from LinkedIn & Indeed.  
- 💡 **Quick Match Score** — estimates how closely your resume fits the job post.  
- 🎨 **Polished UI** — minimal popup design with persistent footer & smooth animations.  
- 🔒 **Private & Secure** — all data stays on your device; no external servers involved.

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend (Popup)** | HTML5 · CSS3 · JavaScript |
| **Extension APIs** | Chrome Manifest V3 · chrome.scripting · chrome.tabs |
| **Logic** | DOM Parsing · Keyword Matching · localStorage |
| **Design** | CSS Variables · Responsive Layout |

---

## 📁 Project Structure

```bash
resume-analyzer/
├── manifest.json       # Extension metadata & permissions
├── popup.html          # Popup UI
├── popup.js            # Main logic for upload & analysis
├── content.js          # Extracts job descriptions
├── style.css           # UI styling
└── icons/              # Extension icons

⚙️ Setup & Installation

Clone the Repository

git clone https://github.com/jinaldave3/resume-analyzer.git


Load into Chrome

Visit chrome://extensions

Enable Developer mode

Click Load unpacked

Select the project folder

Use

Open any LinkedIn or Indeed job post

Upload your resume

Click Analyze Resume to view your match score

🧩 How It Works

User uploads a resume file → stored locally (Base64).

content.js scrapes job description text.

popup.js calculates keyword similarity.

Result displays as a percentage match with a summary message.

🎨 UI Preview
<p align="center"> <img src="./icons/demo.png" width="500px" alt="Resume Analyzer Preview"/> </p>
🔮 Future Enhancements

🤖 AI-powered semantic matching via OpenAI API

🕵️ Keyword highlighting & improvement suggestions

🧾 Application tracker dashboard

🌙 Dark mode toggle

👩🏻‍💻 Author

Jinal Dave
🎓 M.S. Software Engineering – NJIT
🌐 Portfolio
 · 💼 LinkedIn
 · 💻 GitHub
