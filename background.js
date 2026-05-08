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

  let ticketStatusMapColor = [["Pianificato", "#421c6b"], ["In sospeso", "#00294aff"], ["In lavorazione", "#4bb213ab"], ["Aperto - 2Liv", "#008f39ab"]]
  let TextUnderlineMapColor = [["[Failed]", "#ff0000"], ["[Warning]", "#ffa500"], ["[Success]", "#00ff00"]]
  let style = document.createElement('style');
  
  style.textContent = `
    .styled-underline {
      position: relative;
      display: inline-block;
    }

    .styled-underline::after {
      content: "";
      position: absolute;
      left: 0;
      top: 1.3em;
      width: 100%;
      height: 2px;
      background-color: var(--underline-color, currentColor);
    }
  `

  function waitForElm(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector))
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          observer.disconnect()
          resolve(document.querySelector(selector))
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    })
  }

  const applyStyles = () => {

    if(!document.head.querySelector('style[data-ticket-style]')){
      style.setAttribute('data-ticket-style', 'true');
      document.head.appendChild(style);
    }

    ChangeElementColor(".sc-NsUQg", ticketStatusMapColor)
    UnderlineElement(".StyledButton-sc-qe3ace-0", TextUnderlineMapColor)
  }

  const ChangeElementColor = (element, mapColor) => {
    let elements = [...document.querySelectorAll(element)]
    console.log("call ChangeElementColor")

    elements.forEach(single => {
      mapColor.forEach(([param, color]) => {
        if (single.textContent == param) {
          single.style.backgroundColor = color
        }
      })
    })
  }

  const UnderlineElement = (element, mapColor) => {
    let elements = [...document.querySelectorAll(element)]
    console.log("call UnderlineElement");

    elements.forEach(single => {
      mapColor.forEach(([param, color]) => {
        if (single.textContent.includes(param)) {
          single.classList.add("styled-underline")
          single.style.setProperty('--underline-color', color);
        }
      })
    })
  }

  waitForElm('.sc-NsUQg').then(applyStyles)

  document.onclick = function (event) {
    waitForElm('.sc-NsUQg').then(applyStyles)
  }
}