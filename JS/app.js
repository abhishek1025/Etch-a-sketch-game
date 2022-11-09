//Parent elemrent of small box
const box = document.querySelector(".box");
const boxWrapper = document.querySelector("#box-wrapper");

//grid size input element
const gridSizeEL = document.querySelector("#grid-size");
const rowColInfoEL = document.querySelector("#row-col-info")

// getting color input items
const bgColorPicker = document.querySelector("#bg-picker");
const penColorPicker = document.querySelector("#pen-color-picker");


//geting button elements
const randomColorModeBtn = document.querySelector("#random-color-mode")
const rainbowModeBtn = document.querySelector("#rainbow-mode")
const eraseBtn = document.querySelector("#erase-mode")
const clearBtn = document.querySelector("#clear-Btn")


//Creating the grid
function displayGrid(gridSize) {

    let lenghtOfSmallSquare = 500 / gridSize;

    box.style.gridTemplateColumns = `repeat(${gridSize}, ${lenghtOfSmallSquare}px)`;

    for (let i = 0; i < gridSize * gridSize; i++) {

        const smallBoxEL = document.createElement('div')
        smallBoxEL.classList.add('small-box')
        box.appendChild(smallBoxEL)
    }


}

//generating random color
function randomColorGenerate() {
    r = Math.floor(Math.random() * 255 + 1);
    g = Math.floor(Math.random() * 255 + 1);
    b = Math.floor(Math.random() * 255 + 1);


    return `rgb(${r}, ${g}, ${b})`;
}

//getting the random ranbow color 
function getRainbowColor() {
    const rainbowColors = ["voilet", "indigo", "blue", "green", "yellow", "orange", "red"];

    const index = Math.floor(Math.random() * 7)

    return rainbowColors[index];
}

//removing all the bg colors of square
function resetBgColor() {
    const smallBoxEl = document.querySelectorAll(".small-box");

    for (let i = 0; i < smallBoxEl.length; i++) {
        smallBoxEl[i].style.removeProperty("background-color");
    }
}




//changing the color of small boxes depending on different mode
function colorSmallBoxes(e, colorMode) {

    let bgcolor = "#67E258";

    if (colorMode === "randomColorMode") {
        bgcolor = randomColorGenerate();
    }

    if (colorMode === "rainbowMode") {
        bgcolor = getRainbowColor()
    }

    if (colorMode == "userColor") {
        bgcolor = penColorPicker.value;
    }

    if (e.target.classList.contains("small-box") && colorMode != "eraseMode") {
        if (e.target.style.backgroundColor == "") {
            e.target.style.backgroundColor = `${bgcolor}`
        }
    }
    else {
        e.target.style.removeProperty("background-color")
    }

}

//getting different color mode to color the small squares
let colorMode;

function getMode(mode) {
    colorMode = mode;
}

//generating squares initially
let gridSize = gridSizeEL.value;
rowColInfoEL.innerHTML = `${gridSize} X ${gridSize}`;
displayGrid(gridSize);


//Generating the squares based on user selection
gridSizeEL.addEventListener("click", () => {

    // const smallBoxEl = document.querySelectorAll(".small-box")

    gridSize = gridSizeEL.value;

    rowColInfoEL.innerHTML = `${gridSize} X ${gridSize}`;

    box.innerHTML = "";


    displayGrid(gridSize);

})


//adding the evenet listiner to the parent elemnt
box.addEventListener("mouseover", (e) => {

    colorSmallBoxes(e, colorMode);
    // console.log(colorMode);
})


//cleraing all the colored square boxes
clearBtn.addEventListener("click", resetBgColor);

//Random color mode
randomColorModeBtn.addEventListener("click", () => {
    getMode('randomColorMode');
    resetBgColor();
})

//rainbow mode
rainbowModeBtn.addEventListener("click", () => {
    getMode('rainbowMode');
})

//Erase mode
eraseBtn.addEventListener("click", () => {
    getMode('eraseMode')
})

//changing board background
bgColorPicker.addEventListener("input", () => {
    boxWrapper.style.backgroundColor = bgColorPicker.value
})

//Changing color picker
penColorPicker.addEventListener("input", () => {
    getMode("userColor")
})