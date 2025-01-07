chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log("Tab updated, executing script...")

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: main()
    })
  }
})

function main(){
  const ChangeColor = (content, color) => {
    const elements = document.querySelectorAll(".sc-15mtwvo-0.gjlqHm");
    elements.forEach(element => {
      if (element.textContent === content) { 
        element.style.backgroundColor = color
      }
    })
  }

  setInterval( () => {
    ChangeColor("Pianificato", "#421c6b")
  }, 2000)

}