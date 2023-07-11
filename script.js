function generatePercent(num = 256) {
    return `${Math.floor(Math.random() * num)}%`;
}

function generateMeasure() {
    let num = Math.random() * 4 * 25;
    if (num < 20) num = 20;
    const numString = `${num.toFixed(2)}%`;
    return `${numString} ${Math.random() < 0.5 ? "100%" : numString}`;
}

function generateOpacity() {
    const opacity = +Math.random().toFixed(2);
    return opacity > 0.5 ? 0.5 : opacity < 0.14 ? 0.14 : opacity;
}

function generateRgbaColor() {
    const colorString = [...Array(3)]
        .map(() => generatePercent().slice(0, -1))
        .concat(generateOpacity())
        .join(",");
    return `rgba(${colorString})`;
}

function getBackgroundLayerCount() {
    return Math.floor(Math.random() * 24);
}

function generateDegrees() {
    return `${Math.floor(Math.random() * 361)}deg`;
}

function generateGradient(type) {
    const stop = generatePercent(101);
    const degrees = generateDegrees();
    const measure = generateMeasure();
    const color = generateRgbaColor();
    const isFixed = Math.random() > 0.5 ? " fixed" : "";
    if (type === 0) {
        return `linear-gradient(${degrees}, ${color} ${stop}, transparent ${stop}) 50% 0/${measure}${isFixed}`;
    }
    const color2 = generateRgbaColor();
    return `linear-gradient(${degrees}, ${color} ${stop}, ${color2} ${stop}) 50% 0/${measure}${isFixed}`;
}

function generateBackground() {
    let num = getBackgroundLayerCount();
    if (num < 4) {
        num = 4;
    }
    const str = [...Array(num).keys()]
        .map((i) => {
            const isLast = i === num - 1;
            const gradients = isLast ? [1] : [2, 0];
            return gradients.map(generateGradient).join(", ");
        })
        .join(", ");
    return [str, num];
}

let body;
let child;

function createInitialColors() {
    body = document.getElementById("gen_body");
    child = document.getElementById("gen_child");

    const [bg] = generateBackground();
    body.style.background = bg;
}




function updateColors() {
    const isVisible = +child.style.opacity === 1;
    const [bg] = generateBackground();

    let selector = isVisible ? body : child;
    selector.style.background = bg;
    if (isVisible) {
        child.style.opacity = 0;
    } else {
        child.style.opacity = 1;
    }
}

setInterval(() => {
    updateColors();
},  2500);

document.onload = createInitialColors();