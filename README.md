<h1 align="center">🧩 Resume Analyzer</h1>

<p align="center">
  <b>Analyze your résumé against job descriptions and discover ways to improve it.</b><br>
  Built by <a href="https://jinaldave3.github.io/jinaldave-portfolio/">Jinal Dave</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Chrome-Manifest_V3-4285F4?logo=googlechrome&logoColor=white" alt="Chrome Manifest V3">
  <img src="https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Node.js-22.16%2B-339933?logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/OpenAI-Suggestions-412991" alt="OpenAI">
</p>

---

## 🌟 Overview

**Resume Analyzer** is a Chrome extension with a local backend that helps job seekers compare their résumé with a job description.

Upload or paste your résumé, capture a job description from a supported page, and view an estimated match percentage. Request AI-powered guidance for clearer résumé wording, questions about missing experience, and relevant project ideas.

The application also includes a local browser interface for working with pasted text and uploaded documents.

## ✨ Features

- **📄 Flexible Résumé Input** — upload PDF, DOCX, or TXT files, or paste text directly.
- **📌 Job Description Capture** — capture supported LinkedIn and Indeed descriptions, with a manual paste fallback.
- **📊 Estimated Match Percentage** — compare résumé phrases with skills detected in the job description.
- **✍️ AI Rewrite Suggestions** — receive suggested wording grounded in excerpts from your résumé.
- **🔎 Experience Clarification** — identify relevant experience that may need further explanation.
- **🛠️ Project Recommendations** — explore future projects with defined scopes and completion criteria.
- **🔐 Consent-Based AI Requests** — review your text before choosing to send it to OpenAI.
- **💾 Optional Local Storage** — remember résumé text in the extension and clear it when needed.
- **🧱 Backend Key Protection** — keep API credentials outside the browser extension.

## 🔄 How It Works

1. **Upload or paste your résumé.**
2. **Capture or paste a job description.**
3. **Review both texts for accuracy.**
4. **Click Analyze résumé** to view the estimated match.
5. **Optionally request AI suggestions** after providing consent.
6. **Review suggested rewrites, clarification questions, and future project ideas.**

Nothing automatically changes your résumé.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript ES modules |
| Chrome Extension | Manifest V3, `chrome.scripting`, `activeTab`, `chrome.storage.local` |
| Backend | Node.js HTTP server, native Fetch API |
| Matching | Dictionary-based phrase matching and aliases |
| Document Extraction | PDF.js, Mammoth |
| AI Integration | OpenAI Responses API, structured JSON outputs |
| Testing | Node.js test runner, synthetic document fixtures, HTTP integration checks |

## 🚀 Getting Started

### Prerequisites

- Node.js **22.16 or newer**
- npm
- Google Chrome for extension functionality

### 1. Clone the Repository

```sh
git clone https://github.com/jinaldave3/resumeAnalyzer.git
cd resumeAnalyzer
npm ci
```

### 2. Configure the Environment

Create `.env.local` using `.env.example` as a template.

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | Backend credential for AI suggestions |
| `OPENAI_MODEL` | Optional model override; defaults to `gpt-4.1-mini` |
| `EXTENSION_ID` | Optional restriction to your loaded Chrome extension ID |

Keep `.env.local` private. It is ignored by Git and must never be included in the browser extension.

### 3. Start the Backend

```sh
npm start
```

Open **http://127.0.0.1:8766** to use the local browser interface.

Keep the default port **8766**, which is used by the client and extension permissions.

### 4. Load the Chrome Extension

Build the browser-only package:

```sh
npm run package:extension
```

Then:

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the generated **`dist-extension`** folder.
5. Open a supported job posting and click the extension icon.

The generated package excludes backend files and API credentials.

After updating extension files, rebuild the package and click **Reload** in Chrome.

## 🧪 Testing

Run automated unit tests:

```sh
npm test
```

With the local backend running, execute integration checks:

```sh
node tests/http-check.mjs
```

## 📁 Project Structure

```text
resumeAnalyzer/
├── manifest.json
├── popup.html
├── popup.js
├── style.css
├── engine.js
├── ai.mjs
├── server.mjs
├── scripts/
│   └── package-extension.mjs
├── tests/
│   ├── core.test.mjs
│   ├── http-check.mjs
│   └── fixtures/
├── icons/
├── .env.example
├── package.json
└── start-local.command
```

## 🔮 Future Improvements

- Broader skill coverage and stronger context handling.
- Evaluation of live AI suggestion quality.
- More resilient job-description capture.
- OCR support for scanned résumés.

## 👩🏻‍💻 Author

**Jinal Dave**  
M.S. Software Engineering — New Jersey Institute of Technology

[GitHub](https://github.com/jinaldave3) · [Portfolio](https://jinaldave3.github.io/jinaldave-portfolio/)
