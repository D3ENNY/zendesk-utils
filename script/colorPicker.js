const colorRange = document.getElementById("colorRange");
const colorBox = document.getElementById("colorBox");
const hexCode = document.getElementById("hexCode");

function hslToHex(h, s, l) {
    s /= 100; // Divido la saturazione per 100 per ottenere un valore tra 0 e 1
    l /= 100; // Divido la luminosità per 100 per ottenere un valore tra 0 e 1

    let a = s * Math.min(l, 1 - l); // Calcolo l'intensità del colore
    let f = n => {
        let k = (n + h / 30) % 12; // Calcolo il valore dell'angolo dell'HSL 
        let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); // Calcolo il valore finale del colore
        return Math.round(255 * color).toString(16).padStart(2, '0'); // Converto in esadecimale
    };
    return `#${f(0)}${f(8)}${f(4)}`; // Ritorno il colore esadecimale completo
}

colorRange.addEventListener("input", function() {
    let h = this.value; 
    let s = 100; 
    let l = 50;  
    let color = hslToHex(h, s, l); 
    colorBox.style.backgroundColor = color; 
    hexCode.textContent = color; 
});
