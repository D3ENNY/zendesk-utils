chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log("Tab updated, executing script...")

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: main
    });
  }
});

function main() {
  const ChangeElementColor = (element, content, color) => {
    const elements = document.querySelectorAll(element)
    elements.forEach(element => {
      if (element.textContent.trim() === content) {
        element.style.backgroundColor = color
      }
    })
  }

  setInterval(() => {
    ChangeElementColor(".ljoqst", "Pianificato", "#421c6b")
  }, 2000)
}