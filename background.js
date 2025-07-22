chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log("Tab updated, executing script...")

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: main
    })
  }
})

function main() {


  const ChangeElementColor = (element, content, color) => {
    let elements = [...document.querySelectorAll(element)]

    elements.filter(el => el.textContent.trim() == content).forEach(el => {
      el.style.backgroundColor = color

    })
  } 

  const UnderlineElement = (element,content, color) => {
    let elements = [...document.querySelectorAll(element)]

    elements.filter(el => el.textContent.includes(content)).forEach(el => {
      el.style.textDecoration = "underline"
      el.style.textDecorationColor = color
      el.style.textUnderlineOffset = "4px"
      el.style.textDecorationThickness = "2px"
    })
  }
  

  setInterval(() => {
    ChangeElementColor(".sc-15mtwvo-0", "Pianificato", "#421c6b")
    ChangeElementColor(".sc-15mtwvo-0", "In sospeso", "#00294aff")
    ChangeElementColor(".sc-15mtwvo-0", "In lavorazione", "#4bb213ab")
    ChangeElementColor(".sc-15mtwvo-0", "Aperto - 2Liv", "#008f39ab")

    UnderlineElement(".StyledButton-sc-qe3ace-0", "[Failed]", "#ff0000")
    UnderlineElement(".StyledButton-sc-qe3ace-0", "[Warning]", "#ffa500")
    UnderlineElement(".StyledButton-sc-qe3ace-0", "[Success]", "#00ff00")
  }, 2000)

}