var style = getComputedStyle(document.body)
//console.log( style.getPropertyValue('--bar') ) // #336699

const gridContainer = document.getElementById("grid");
const rowsText = document.getElementById("rows");
const colsText = document.getElementById("cols");

let currColor = document.getElementById("colorPicker").value;
let randModeOn = document.getElementById("randomMode").value;


const createRandHex = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

function createGrid(size){  

  for (let i = 0; i < size * size ; i++) {
    //let gridRow = document.createElement("div");
    // for(let j = 0; j < size; j++ ){
    //   let cell = document.createElement("div");
    //   //cell.innerText = ("" + i + "," + j);
    //   gridRow.appendChild(cell).className = "cell-item";
    // }
    // gridContainer.appendChild(gridRow).className = "grid-row";
    let cell = document.createElement("div");

    cellSize = ( (size / (size*size)) * 100);
    cell.style.width = cellSize + "%";
    cell.style.paddingBottom = cellSize + "%";
    gridContainer.appendChild(cell).className = "cell-item";
    
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

// function colorCell() {
//   this.style.backgroundColor = "red";
// }

function main() {
  createGrid(10);
}

main();


//Fill in color
let cells = Array.from(document.getElementsByClassName('cell-item'));

cells.forEach(cell => {
  cell.addEventListener('mouseover', function handleHover(event) {
    //console.log('box clicked', event);
    console.log("Testing");
      if(randModeOn == false){
        console.log("false");
        cell.style.backgroundColor = currColor;
      }
      else{
        console.log("true");
        cell.style.backgroundColor = createRandHex();
      }
  });
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

//Generate new grid
const newGridSize = document.getElementById("gridSize");
newGridSize.addEventListener('input', function() {
  //console.log("testing");
  deleteGrid();
  let newSize = parseFloat(newGridSize.value)
  createGrid(newSize);
  setSizeText(newSize);
  cells = Array.from(document.getElementsByClassName('cell-item'));

  cells.forEach(cell => {
    cell.addEventListener('mouseover', function handleHover(event) {
      //console.log('box clicked', event);
      console.log("Testing");
      if(randModeOn == false){
        console.log("false");
        cell.style.backgroundColor = currColor;
      }
      else{
        console.log("true");
        cell.style.backgroundColor = createRandHex();
      }
    });
  });
});

