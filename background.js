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


  const ChangeElementColor = (element, mapColor) => {
    let elements = [...document.querySelectorAll(element)]

    console.log("elements", elements)
    elements.forEach(single => {
      mapColor.forEach(el => {
        console.log(single.textContent == el[0], single.textContent, el[0], el[1])
        if (single.textContent == el[0]) {
          single.style.backgroundColor = el[1]
        }

      });
    });



    // elements.filter(el => el.textContent.trim() == content).forEach(el => {
    //   el.style.backgroundColor = color

    // })
  }

  const UnderlineElement = (element, content, color) => {
    let elements = [...document.querySelectorAll(element)]

    elements.filter(el => el.textContent.includes(content)).forEach(el => {
      el.style.textDecoration = "underline"
      el.style.textDecorationColor = color
      el.style.textUnderlineOffset = "4px"
      el.style.textDecorationThickness = "2px"
    })
  }


  waitForElm('.sc-15mtwvo-0').then(() => {
    console.log('Element is loaded');

    let mapColor = [["Pianificato", "#421c6b"], ["In sospeso", "#00294aff"], ["In lavorazione", "#4bb213ab"], ["Aperto - 2Liv", "#008f39ab"]]
    ChangeElementColor(".sc-15mtwvo-0", mapColor)

    UnderlineElement(".StyledButton-sc-qe3ace-0", "[Failed]", "#ff0000")
    UnderlineElement(".StyledButton-sc-qe3ace-0", "[Warning]", "#ffa500")
    UnderlineElement(".StyledButton-sc-qe3ace-0", "[Success]", "#00ff00")
  });


  function waitForElm(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

}