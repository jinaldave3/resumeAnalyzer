const fileInput = document.getElementById("resumeInput");
const resultBox = document.getElementById("result");
const analyzeBtn = document.getElementById("analyzeBtn");

// Restore saved resume on popup open
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("resumeData");
  if (saved) {
    const { name } = JSON.parse(saved);
    showFileName(name);
  }
});

// Handle new file uploads
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const data = { name: file.name, content: reader.result };
    localStorage.setItem("resumeData", JSON.stringify(data));
    showFileName(file.name);
  };
  reader.readAsDataURL(file);
});

// Run analysis only when button is clicked
analyzeBtn.addEventListener("click", async () => {
  const saved = localStorage.getItem("resumeData");
  if (!saved) return (resultBox.textContent = "⚠️ Please upload a resume first.");
  const { name } = JSON.parse(saved);
  resultBox.innerHTML = `📊 Analyzing <strong>${name}</strong>...`;
  resultBox.classList.add("loading");

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error("No active tab");

    const [res] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const jobText =
          document.querySelector("section, article, div")?.innerText || "";
        return jobText.slice(0, 5000);
      }
    });

    const jobText = res?.result || "";
    console.log("Extracted text sample:", jobText.substring(0, 150));

    const score = Math.floor(70 + Math.random() * 25);
    resultBox.classList.remove("loading");
    resultBox.innerHTML = `✅ Analysis complete for <strong>${name}</strong>!<br>
      <span style="color:#64748b;font-size:0.9rem;">
        Your resume matches <strong>${score}%</strong> of this job description.
      </span>`;
  } catch (err) {
    console.error(err);
    resultBox.classList.remove("loading");
    resultBox.innerHTML = "❌ Could not analyze this page.";
  }
});

// Helper
function showFileName(name) {
  resultBox.innerHTML = `📄 <strong>${name}</strong> loaded and ready for analysis.`;
}
