let expTable = [100];

const cost = 10;
let afterDP = 0;

let level = 1;
let exp = 0;
let exp_now = 0;
let remaining = expTable[0] - exp_now;
let x = 0;
let y = 0;
let move = 0;
let click = 0;
let x_now = 0;
let y_now = 0;
let progOverOne = 0;
let progOverTen = 0;

let MoveMouse = (e) => {
  x_now = e.clientX;
  y_now = e.clientY;

  if (x_now !== x) {
    move++;
    x = x_now;
    AddExp(1);
  }

  if (y_now !== y) {
    move++;
    y = y_now;
    AddExp(1);
  }
};

let ClickMouse = (e) => {
  click++;
  AddExp(30);
};

let AddExp = (val) => {
  afterDP += val;

  while (afterDP >= cost) {
    exp++;
    exp_now++;
    afterDP -= cost;
    remaining = expTable[level - 1] - exp_now;

    if (remaining <= 0) {
      exp_now = 0;
      level++;

      expTable.push(Math.floor(expTable[0] * Math.sqrt(level)));
      console.log(expTable.length +", "+ expTable[expTable.length - 1]);

      remaining = expTable[level - 1] - exp_now;
    }
  }

  progOverOne = (cost * exp_now + afterDP) / (cost * expTable[level - 1]);
  progOverTen = 10 * progOverOne - Math.floor(10 * progOverOne);

  document.getElementById('axisX').value = x_now;
  document.getElementById('axisY').value = y_now;
  document.getElementById('moveP').value = move;
  document.getElementById('click').value = click;
  document.getElementById('level').value = level;
  document.getElementById('remaining').value = remaining;
  document.getElementById('exp').value = exp;
  document.getElementById('progOverOne').value = progOverOne.toFixed(6);
  document.getElementById('prog1').value = progOverOne;
  document.getElementById('progOverTen').value = progOverTen.toFixed(6);
  document.getElementById('prog2').value = progOverTen;
};

document.addEventListener('mousemove', MoveMouse);
document.addEventListener('mousedown', ClickMouse);
