/* 
pseudocode

insert numbers into a variable called current that is displayed
- if the operator flag contains a symbol then move current into memory 
  and clear the operator

given an operator do something, then store the operator in the operator flag
- if nothing in memory then store current in memory
- if memory contains a number 
  1. operate on memory and current
  2. clear memory and return the value into current
*/
let memory;
let current;
let operator;

const numberButtons = document.querySelectorAll('.calculator__button__number');
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click',(event) => {
    pressNumber(event.target.value)
  })
})

const operatorButtons = document.querySelectorAll('.calculator__button__operator')
operatorButtons.forEach((operatorButton) => pressOperator(operatorButton))

const deleteButton = document.querySelector('.calculator__delete');
deleteButton.addEventListener('click', () => {
  deleteNumber();
});


function pressNumber(num) {
  const calculatorDisplay = document.querySelector('.calculator__display');
  if (calculatorDisplay.textContent.length > 8) 
    return;
  let newDisplay = calculatorDisplay.textContent + num;
  updateDisplay(newDisplay);
}

function pressOperator(operatorButton) {
  operatorButton.addEventListener('click', (event) => {
    if (!current) return;
    const operatorButtons = document.querySelectorAll('.calculator__button__operator')
    operatorButtons.forEach((op) => op.classList.remove('highlight'));
    operator = event.target.value
    event.target.classList.add('highlight');
  })
}

function deleteNumber() {
  const calculatorDisplay = document.querySelector('.calculator__display');
  let newDisplay = calculatorDisplay.textContent.slice(0,calculatorDisplay.textContent.length-1);
  updateDisplay(newDisplay);
}

function updateDisplay(num) {
  const display = document.querySelector('.calculator__display')
  display.textContent = num;
  current = Number(num);
}

function add(a,b) {
  return a+b;
}

function subtract(a,b) {
  return a-b;
}

function multiply(a,b) {
  return a*b;
}

function divide(a,b) {
  return a/b;
}

function operate(sign,a,b) {
  if (sign === '+') return add(a,b);
  if (sign === '-') return subtract(a,b);
  if (sign === '*') return multiply(a,b);
  if (sign === '/') return divide(a,b);
}