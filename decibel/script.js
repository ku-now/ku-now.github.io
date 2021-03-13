let Calc = () => {
  let value = 0.0;

  let val1 = parseFloat(document.getElementById('input1').value);
  let val2 = parseFloat(document.getElementById('input2').value);
  let funcNum = parseInt(document.getElementById('func1').value);

  switch (funcNum) {
    case 1:
      value = 10 * Math.log10(Math.pow(10, val1 / 10) * Math.pow(10, val2 / 10));
      break;
    case 2:
      value = 10 * Math.log10(Math.pow(10, val1 / 10) / Math.pow(10, val2 / 10));
      break;
    case 3:
      value = 10 * Math.log10(Math.pow(10, val1 / 10) + Math.pow(10, val2 / 10));
      break;
    case 4:
      val1 = Math.pow(10, val1 / 10);
      val2 = Math.pow(10, val2 / 10);
      value = ((val1 - val2) > 0) ? (10 * Math.log10(val1 - val2)) : 0;
      break;
  }

  document.getElementById('Result').innerHTML = `${value}dB`;
};

let Convert = () => {
  let value = 0.0;

  let val1 = parseFloat(document.getElementById('input3').value);
  let val2 = parseFloat(document.getElementById('input4').value);
  let funcNum = parseInt(document.getElementById('func2').value);

  switch (funcNum) {
    case 1:
      value = Math.pow(10, val1 / 20);
      document.getElementById('input4').value = value;
      break;
    case 2:
      value = (val2 > 0) ? (20 * Math.log10(val2)) : 0;
      document.getElementById('input3').value = value;
      break;
  }
};
