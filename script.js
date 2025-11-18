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