chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log("Tab updated, executing script...");
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        function makeAlert() {
          const elements = document.querySelectorAll(".sc-15mtwvo-0.gjlqHm");
          elements.forEach(element => {
            if (element.textContent === "Pianificato") { 
              element.style.backgroundColor = "#421c6b";
            }
          });
        };
        setInterval(makeAlert, 2000);
      }
    });
  }
});
