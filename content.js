function getJobDescription() {
  const jd = document.querySelector(
    ".jobs-description-content, .jobsearch-JobComponent-description"
  );
  return jd ? jd.innerText : "No job description found.";
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "scrapeJD") {
    sendResponse({ jobDescription: getJobDescription() });
  }
});
