const colorRange = document.getElementById("colorRange");
const alphaRange = document.getElementById("alphaRange");
const lightnessRange = document.getElementById("lightnessRange");
const colorBox = document.getElementById("colorBox");
const hexCode = document.getElementById("hexCode");

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    let a = s * Math.min(l, 1 - l);
    let f = n => {
        let k = (n + h / 30) % 12;
        let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function updateColor() {
    let h = colorRange.value;
    let s = 100;
    let l = lightnessRange.value;
    let a = alphaRange.value / 100;

    let hexColor = hslToHex(h, s, l);
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    colorBox.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    document.documentElement.style.setProperty('--color', hexColor);
}

colorRange.addEventListener("input", updateColor);
alphaRange.addEventListener("input", updateColor);
lightnessRange.addEventListener("input", updateColor);

updateColor();