chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log("Tab updated, executing script...");
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        function makeAlert() {
          document.body.style.backgroundColor = 'lightblue'; // Change to your desired color
          const elements = document.querySelectorAll(".sc-15mtwvo-0.gjlqHm");
          elements.forEach(element => {
            if (element.textContent === "Pianificato") { // Use strict equality check
              element.style.backgroundColor = "#bD42ff4d";
            }
          });
        };
        setInterval(makeAlert, 2000);
      }
    });
  }
});
