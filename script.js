// GLOBAL VARIABLES

var style = getComputedStyle(document.body)
//console.log( style.getPropertyValue('--bar') ) // #336699

// elements
const gridContainer = document.getElementById("grid");
const rowsText = document.getElementById("rows");
const colsText = document.getElementById("cols");
let cells = Array.from(document.getElementsByClassName('cell-item'))

// values
let currColor = document.getElementById("colorPicker").value;
let randModeOn = document.getElementById("randomMode").value;
let lightBrushOn = document.getElementById("lightBrush").value;

const createRandHex = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

function createGrid(size){  

  for (let i = 0; i < size * size ; i++) {
    
    let cell = document.createElement("div");

    //based on the grid dimensions - calc the cell width
    let cellSize = ( (size / (size*size)) * 100);

    //cell.style.width = cellSize + "%";
    //cell.style.paddingBottom = cellSize + "%";

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

function lightBrushEffect(cellItem) {
  let currOpacity = cellItem.style.opacity.value;

  console.log(cellItem.style.opacity.value);
  if( cellItem.style.backgroundColor.value === currColor && 
    cellItem.currOpacity === 1){
    return;
  }
  else{
    cellItem.style.opacity = currOpacity + .1;
  }
  
}

//Fill in color
function fillColor() {
  cells = Array.from(document.getElementsByClassName('cell-item'));
  cells.forEach(cell => {
    cell.addEventListener('mouseover', function handleHover(event) {
        //console.log(randModeOn);
        //console.log(lightBrushOn);

        cell.style.opacity = 1;
        
        if(randModeOn == "false" || randModeOn == false){
          cell.style.backgroundColor = currColor;
        }
        else if (randModeOn == true) {
          let randColor = createRandHex();
          cell.style.backgroundColor = "#" + randColor;
        }
  
        if(lightBrushOn == true){
          console.log(cell.style.opacity.value);
          lightBrushEffect(cell);
        }
    });
  });
}

function main() {
  createGrid(10);
  fillColor();
}

main();

//Generate new grid
const newGridSize = document.getElementById("gridSize");
newGridSize.addEventListener('input', function() {

  deleteGrid();

  let newSize = parseFloat(newGridSize.value)
  createGrid(newSize);
  setSizeText(newSize);

  //cells = Array.from(document.getElementsByClassName('cell-item'));
  fillColor();
});

//Clear Grid
const clearGrid = document.getElementById("clearGrid");
clearGrid.addEventListener('click', function() {
  
  cells.forEach(cell => {
    cell.style.backgroundColor = style.getPropertyValue('--gridBaseColor');
  });
});

//Color Change
const el_colorPicker = document.getElementById("colorPicker");
el_colorPicker.addEventListener('input', function() {
  currColor = el_colorPicker.value;
});

//Random Mode On/Off 
const el_randomMode = document.getElementById("randomMode");
el_randomMode.addEventListener('input', function() {
  randModeOn = el_randomMode.checked;
  //console.log(randModeOn);
});

//Light Brush On/Off 
const el_lightBrush = document.getElementById("lightBrush");
el_lightBrush.addEventListener('input', function() {
  lightBrushOn = el_lightBrush.checked;
  console.log(lightBrushOn);
});