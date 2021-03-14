let Calc = () => {
  let value = 0.0;

  const coef = parseInt(document.getElementById('form1').radio1.value);
  let val1 = parseFloat(document.getElementById('input1').value);
  let val2 = parseFloat(document.getElementById('input2').value);
  let funcNum = parseInt(document.getElementById('func1').value);

  switch (funcNum) {
    case 1:
      value = coef * Math.log10(Math.pow(10, val1 / coef) * Math.pow(10, val2 / coef));
      break;
    case 2:
      value = coef * Math.log10(Math.pow(10, val1 / coef) / Math.pow(10, val2 / coef));
      break;
    case 3:
      value = coef * Math.log10(Math.pow(10, val1 / coef) + Math.pow(10, val2 / coef));
      break;
    case 4:
      val1 = Math.pow(10, val1 / coef);
      val2 = Math.pow(10, val2 / coef);
      value = ((val1 - val2) > 0) ? (coef * Math.log10(val1 - val2)) : 0;
      break;
  }

  document.getElementById('Result').innerHTML = `${value}dB`;
};

let Convert = () => {
  let value = 0.0;

  const coef = parseInt(document.getElementById('form1').radio1.value);
  let val1 = parseFloat(document.getElementById('input3').value);
  let val2 = parseFloat(document.getElementById('input4').value);
  let funcNum = parseInt(document.getElementById('func2').value);

  switch (funcNum) {
    case 1:
      value = Math.pow(10, val1 / coef);
      document.getElementById('input4').value = value;
      break;
    case 2:
      value = (val2 > 0) ? (coef * Math.log10(val2)) : 0;
      document.getElementById('input3').value = value;
      break;
  }
};
