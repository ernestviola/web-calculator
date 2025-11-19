let memory = null;
let current = null;
let operator = null;
let lastButton = null;

const numberButtons = document.querySelectorAll('.calculator__button__number');
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click',(event) => {
    pressNumber(event.target.value)
  })
});

const operatorButtons = document.querySelectorAll('.calculator__button__operator')
operatorButtons.forEach((operatorButton) => pressOperator(operatorButton));

const deleteButton = document.querySelector('.calculator__delete');
deleteButton.addEventListener('click', () => {
  deleteNumber();
});

const clearButton = document.querySelector('.calculator__clear');
clearButton.addEventListener('click', () => {
  clearAll();
});

const equalButton = document.querySelector('.calculator__button__equal')
equalButton.addEventListener('click',() => {
  evaluate();
});

function pressNumber(num) {
  const calculatorDisplay = document.querySelector('.calculator__display');
  if (lastButton == 'operator') {
    clearDisplay();
  }

  if (lastButton == 'evaluate') {
    clearAll();
  }

  if (calculatorDisplay.textContent.length > 8) 
    return;

  let newDisplay = calculatorDisplay.textContent + num;
  if (isNaN(newDisplay)) return;

  updateDisplay(newDisplay);
  lastButton = 'number';
  logVars();
}

function pressOperator(operatorButton) {
  operatorButton.addEventListener('click', (event) => {
    if (current == null) return;
    if (lastButton == 'operator') {
      clearOperators();
    }
    if (memory && operator && current) {
      // evaluate
      evaluate();
    }
    operator = event.target.value
    event.target.classList.add('highlight');
    // copy current into memory so that way can perform some arthimetic on it
    memory = current;
    current = null;
    lastButton = 'operator';
  })
}

function deleteNumber() {
  const calculatorDisplay = document.querySelector('.calculator__display');
  let newDisplay = calculatorDisplay.textContent.slice(0,calculatorDisplay.textContent.length-1);
  updateDisplay(newDisplay);
}

function updateDisplay(num) {
  const display = document.querySelector('.calculator__display');
  display.textContent = num;
  current = num ? Number(num) : null;
}

function clearDisplay() {
  const display = document.querySelector('.calculator__display')
  display.textContent = '';
  current = null;
}

function clearOperators() {
  const operatorButtons = document.querySelectorAll('.calculator__button__operator')
  operatorButtons.forEach((op) => op.classList.remove('highlight'));
  operator = null;
}

function clearAll() {
  clearOperators();
  clearDisplay();
  operator = memory = current = lastButton = null;
}

function evaluate() {
  console.log(memory === null)
  if (operator !== null && memory !== null && current !== null) {
    if (operator == '/' && current == 0) {
      // divide by 0
      const display = document.querySelector('.calculator__display');
      display.textContent = 'ERROR';  
      setTimeout(() => {
        clearAll();
      }, 500);
      
      
    } else {
      let results = operate(operator,memory,current);
      updateDisplay(results);
      clearOperators();
      memory = null;
      operator = null;
      lastButton = 'evaluate';
    }
    
  }
}

function logVars() {
  console.table({memory,operator,current,lastButton});
}

function add(a,b) {
  let results = a + b;
  return limit(results);
}

function subtract(a,b) {
  let results = a-b;
  return limit(results);
}

function multiply(a,b) {
  let results = a*b;
  return limit(results);
}

function divide(a,b) {
  let results = a/b;
  return limit(results);
}

function limit(results) {
  if (results > 999999999) return 999999999;
  if (results < -99999999) return -99999999;
  if (results.toString().length >= 8 && (results > 1 && results > -1)) {
    return parseFloat(results.toFixed(0));
  }
  return parseFloat(results.toFixed(8));
}

function operate(sign,a,b) {
  if (sign === '+') return add(a,b);
  if (sign === '-') return subtract(a,b);
  if (sign === '*') return multiply(a,b);
  if (sign === '/') return divide(a,b);
}