const previousValue = document.querySelector(".prev-value");
const currentValue = document.querySelector(".curr-value");
const tempValue = document.querySelector(".temp-value");
const nums = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const equal = document.getElementById("equal");
const clearAll = document.getElementById("all_clear");
const clearLastNum = document.getElementById("clear_last");
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");

let prevNum = "";
let currNum = "";
let result = null;
let haveDec = false;
let lastOperation = "";

//Add numbers
function addition(n1, n2) {
  return n1 + n2;
}

// console.log(addition(1,2))
// Subtract numbers
function subtraction(n1, n2) {
  if (n1 > n2) {
    return n1 - n2;
  } else {
    let sub = n1 - n2;
    return -sub;
  }
}

// Multiply numbers
function multiplication(n1, n2) {
  return n1 * n2;
}

// Division numbers
function division(n1, n2) {
  return n1 / n2;
}

// Operator function

function mathOperation() {
  if (lastOperation === "*") {
    result = parseFloat(result) * parseFloat(currNum);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(currNum);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(currNum);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(currNum);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(currNum);
  }
}

nums.forEach((num) => {
  num.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDec) {
      haveDec = true;
    } else if (e.target.innerText === "." && haveDec) {
      return;
    }
    currNum += e.target.innerText;
    currentValue.innerText = currNum;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!currNum) return;
    haveDec = false;
    const operatorName = e.target.innerText;
    if (prevNum && currNum && lastOperation) {
      mathOperation(prevNum, currNum);
    } else {
      result = parseFloat(currNum);
    }

    tempResult(operatorName);
    lastOperation = operatorName;
    // console.log(result);
  });
});

function tempResult(name = "") {
  prevNum += currNum + " " + name + " ";
  previousValue.innerText = prevNum;
  currentValue.innerText = "";
  currNum = "";
  tempValue.innerText = result;
}

equal.addEventListener("click", () => {
  if (!currNum || !prevNum) return;
  haveDec = false;
  mathOperation();
  tempResult();
  currentValue.innerText = result;
  tempValue.innerText = "";
  currNum = result;
  prevNum = "";
})

clearAll.addEventListener("click", () => {
  prevNum = "";
  currNum = "";
  previousValue.innerText = "";
  currentValue.innerText = "";
  result = "";
  tempValue.innerText = "";
});

clearLastNum.addEventListener("click", () => {
  currNum = currNum.slice(0,-1)
  currentValue.innerText = currNum;
})