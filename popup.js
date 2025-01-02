document.addEventListener('DOMContentLoaded', () => {
  changeDocument();
});

let changeDocument = () => {
  console.log('start');
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: main,
          args: []
      }, (injectionResults) => {
          const result = injectionResults[0]?.result; // Controllo sul risultato dell'iniezione
          console.log(result);
      });
  });
}

let main = () => {
  replaceColor()
}

let replaceColor = () => {
  console.log("QUIIII");
  document.querySelectorAll(".sc-15mtwvo-0.gjlqHm").forEach(element => {
      if (element.textContent == "Pianificato"){
        element.style.backgroundColor = "#bD42ff4d"
        console.log(element)
      }
  });
}
