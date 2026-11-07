# Resume Analyzer — evidence-based suggestions

A Chrome extension with a local Node backend, extending Jinal Dave's original Resume Analyzer. The original random 70–94% score has been removed.

## What it does

1. Paste résumé text, or extract it locally from PDF, DOCX or TXT (under 5 MB; PDFs up to 25 pages).
2. Capture the current LinkedIn/Indeed job description on demand, or paste it. Review the text before continuing.
3. Compare locally against a fixed skill dictionary: source excerpts, uncertain wording and missing phrases. No ATS score or hiring probability.
4. Optionally consent to send both displayed texts to OpenAI for source-backed rewrite suggestions, clarification questions, and future project ideas.
5. Export a Markdown review. Nothing automatically edits the résumé.

## Run

Requires Node.js 22.16+ and npm. From this directory:

```sh
npm ci
# Create .env.local using secure key setup; never commit or share it.
# For local-only comparison without an API key, copy .env.example to .env.local.
npm start
```

Then open http://127.0.0.1:8766. The browser preview supports pasting, extraction and suggestions, but page capture and remembered résumé storage need the Chrome extension. `start-local.command` also starts the installed local checkout.

To use the extension: run `npm run package:extension` first. This copies only browser files into `dist-extension`, excluding the backend and key. Then open `chrome://extensions`, enable Developer mode, click Load unpacked and choose the `dist-extension` directory. Rebuild that folder and reload the extension after updates. Open a job posting, click the extension, capture the description and check it. The Node server must be running for extraction and AI. Plain pasted-text comparison runs inside the extension without a server.

The key belongs only in ignored `.env.local`, using `OPENAI_API_KEY`. Optional variables: `OPENAI_MODEL` (default `gpt-4.1-mini`), `EXTENSION_ID` (restrict the backend to a specific Chrome extension ID). Keep the default port 8766 because the extension origin permission and client URL use it.

## Honest verification status

- Ten unit tests pass for phrase matching, aliases, uncertain context, validation, API request construction, simulated structured responses, source-excerpt filtering, refusal/incomplete handling and quota messages.
- Local integration checks pass for synthetic PDF, DOCX and TXT extraction, denying access to `.env.local`, rejecting untrusted web origins, and requiring consent.
- Browser walkthrough verified fictional data, real local comparison, evidence results and consent-required behavior.
- A tiny live OpenAI access request on 8 November 2026 returned HTTP 429 `credit_balance_exhausted`. **Live AI suggestions are implemented but not successfully verified.** Simulated API unit tests are not a successful live integration or a quality evaluation. Add credits in OpenAI Platform billing, then test with fictional data before using personal documents.
- On-page Chrome extension capture and Chrome storage have not been exercised on live LinkedIn/Indeed pages. Website changes, collapsed descriptions and protected browser pages can break capture. Paste fallback is available.

## Privacy and limits

No résumé or job text is sent to OpenAI until Generate AI suggestions is clicked with consent. File extraction remains local; files are processed in memory, not saved by the backend. Remembering résumé text is opt-in and uses `chrome.storage.local`, which is not an encrypted vault. Clear removes the original extension's legacy `localStorage` résumé too. Browser-preview memory does not persist after reload. Downloaded reports are separate files and must be deleted separately.

The API key is never delivered to the browser; only explicitly whitelisted static files are served. Backend binds to loopback. Default development mode accepts Chrome extension origins; set `EXTENSION_ID` to your loaded extension ID for tighter restriction. This is a local prototype, not a public authenticated backend. Do not expose its port to a network. API requests have size/output limits, a timeout, one-request concurrency and a 20-call limit per server session. These are basic local safeguards, not production billing controls.

OpenAI requests use `store:false`; that is not a claim of zero provider retention. Review OpenAI's data policies for your use case. Requests incur separate API usage charges when credits are available; no automatic retries occur.

Local matching is deliberately simple: dictionary coverage is limited, language is English, and phrase presence is not proficiency. It may miss synonyms, compare the wrong context, or find skills in optional/negated job requirements. Inspect every excerpt. Scanned PDFs have no OCR; paste text instead. Complex formatting and DOCX text boxes may extract imperfectly.

AI is instructed not to invent skills, accomplishments, numbers or credentials; unsupported original quotations are filtered against the input. **This does not guarantee that every suggested rewrite is factual.** Human review is required. Suggested projects are future work and must not be listed as completed before being built.

## Architecture

- `engine.js`: deterministic dictionary matching and source excerpts, shared by browser and tests.
- `popup.js` / `popup.html`: extension and local browser UI; safe DOM text rendering; opt-in capture, consent, storage and report download.
- `server.mjs`: local extraction and OpenAI proxy; key isolation, bounded requests, origin checks and failure handling.
- `ai.mjs`: structured output schema, prompt, response validation and user-readable errors.
- `tests/`: unit tests and synthetic document fixtures.

```sh
npm test
# With the server running:
node tests/http-check.mjs
```

No GitHub push, Chrome Store publishing or public hosting is included. Original repository: https://github.com/jinaldave3/resumeAnalyzer, baseline `455dc5ef7b9aee765f1c1a34c3ba9f2b64a9b9e3`. Improvements built with AI coding assistance. Current repository license must be explicitly chosen by its owner; no MIT claim is made merely because the old README had a badge.
