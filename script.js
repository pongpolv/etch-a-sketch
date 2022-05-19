'use strict';
const container = document.querySelector('.container');
const gridSizeForm = document.querySelector('.grid-size-form');
const submit = document.querySelector('.submit-btn');
const gridSizeInput = document.querySelector('.size-input');
const wrongMsg = document.querySelector('.wrong-input');
const colorSelectorList = document.querySelectorAll('.color-btn');
const resetBtn = document.querySelector('.reset');
let gridSize;
let colorSelector;
// Append each grid to html using loops

function generateGrid(gridSize = 16) {
  // Clear all grids
  container.innerHTML = '';
  for (let i = 1; i < gridSize ** 2 + 1; i++) {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    // grid.innerHTML = `${i}`;
    container.insertAdjacentElement('beforeend', grid);
    container.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;
  }
  // Add Eventlistener to grid
  const grids = document.querySelectorAll('.grid');
  grids.forEach((grid) =>
    grid.addEventListener('mouseover', function (e) {
      genGridColor(e);
    })
  );

  // Add Eventlistener to color button
  colorSelectorList.forEach((btn) =>
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      colorSelector = e.target.attributes['data-set'].value;
      console.log(colorSelector);
    })
  );
}
generateGrid(gridSize);

// Add color to grid when hover on
function genGridColor(e) {
  const target = e.target;
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  let color;
  if (colorSelector === 'black') {
    color = 'black';
  } else if (colorSelector === 'rgb') {
    color = randomColor;
  }
  target.setAttribute('style', `background-color:${color}`);
}

// Change Grid size
submit.addEventListener('click', function (e) {
  e.preventDefault();
  wrongMsg.classList.add('hidden');
  if (!gridSizeInput.value || gridSizeInput.value > 100) {
    wrongMsg.classList.remove('hidden');
    return;
  }
  gridSize = gridSizeInput.value;
  gridSizeInput.value = '';
  generateGrid(gridSize);
});

resetBtn.addEventListener('click', function (e) {
  e.preventDefault();
  generateGrid(gridSize);
  colorSelector = '';
});
