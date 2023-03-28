// GLOBAL VARIABLES

var style = getComputedStyle(document.body)
//console.log( style.getPropertyValue('--bar') ) // #336699

// elements
const gridContainer = document.getElementById("grid");
const rowsText = document.getElementById("rows");
const colsText = document.getElementById("cols");
let cells = Array.from(document.getElementsByClassName('cell-item'))

const el_colorMode = document.getElementById("colorMode");
const el_randomMode = document.getElementById("randomMode");
let coloModeOn = true;
el_colorMode.classList.add("active");
let randModeOn = false;

// values
let currColor = document.getElementById("colorPicker").value;

const createRandHex = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor;
}

function createGrid(size){  

  for (let i = 0; i < size * size ; i++) {
    
    let cell = document.createElement("div");

    gridContainer.appendChild(cell).className = "cell-item";

    let gridSize = "1fr ";
    gridContainer.style.gridTemplateColumns = gridSize.repeat(size);
    gridContainer.style.gridTemplateRows = gridSize.repeat(size);
    setSizeText(size);
  };
}

function deleteGrid(){
  gridContainer.innerHTML = '';
}

function setSizeText(size) {
  rowsText.textContent=size;
  colsText.textContent=size;
}

//Fill in color
function fillColor() {
  cells = Array.from(document.getElementsByClassName('cell-item'));
  cells.forEach(cell => {
    cell.addEventListener('mouseover', function handleHover(event) {
        
        if(randModeOn == "false" || randModeOn == false){
          cell.style.backgroundColor = currColor;
        }
        else if (randModeOn == true) {
          let randColor = createRandHex();
          cell.style.backgroundColor = randColor;
        }
    });
  });
}

function main() {
  createGrid(10);
  fillColor();
}

main();

//Color Change
const el_colorPicker = document.getElementById("colorPicker");
el_colorPicker.addEventListener('input', function() {
  currColor = el_colorPicker.value;
});

//Color Mode On/Off 
el_colorMode.addEventListener('click', function() {
  //el_colorMode.focus();
  el_colorMode.classList.add("active");
  el_randomMode.classList.remove("active");
  colorModeOn = true;
  randModeOn = false;
});

//Random Mode On/Off 
el_randomMode.addEventListener('click', function() {
  //el_randomMode.focus();
  el_randomMode.classList.add("active");
  el_colorMode.classList.remove("active");
  randModeOn = true;
  colorModeOn = false;
});

//Clear Grid
const clearGrid = document.getElementById("clearGrid");
clearGrid.addEventListener('click', function() {
  
  cells.forEach(cell => {
    cell.style.backgroundColor = style.getPropertyValue('--gridBaseColor');
  });
});

//Generate new grid
const newGridSize = document.getElementById("gridSize");
newGridSize.addEventListener('input', function() {

  deleteGrid();

  let newSize = parseFloat(newGridSize.value)
  createGrid(newSize);
  setSizeText(newSize);

  fillColor();
});