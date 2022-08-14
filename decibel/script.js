let Calc = () => {
  let value = 0.0;

  const coef    = parseInt(document.getElementById('form1').radio1.value);
  const funcNum = parseInt(document.getElementById('func1').value);
  let val1 = parseFloat(document.getElementById('input1').value);
  let val2 = parseFloat(document.getElementById('input2').value);

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
      if (val1 > val2) {
        value = coef * Math.log10(Math.pow(10, val1 / coef) - Math.pow(10, val2 / coef));
        document.getElementById('Result').style.color = "000000";

      } else {
        value = 0;
        document.getElementById('Result').style.color = "ff0000";
      }

      break;
  }

  document.getElementById('Result').innerHTML = `${value}dB`;
};

let Convert = () => {
  let value = 0.0;

  const coef    = parseInt(document.getElementById('form1').radio1.value);
  const funcNum = parseInt(document.getElementById('func2').value);
  let val1 = parseFloat(document.getElementById('input3').value);
  let val2 = parseFloat(document.getElementById('input4').value);

  switch (funcNum) {
    case 1:
      value = Math.pow(10, val1 / coef);
      document.getElementById('input4').value = value;
      break;

    case 2:
      if (val2 > 0) {
        value = coef * Math.log10(val2);
        document.getElementById('input3').style.color = "000000";

      } else {
        value = 0;
        document.getElementById('input3').style.color = "ff0000";
      }

      document.getElementById('input3').value = value;
      break;
  }
};
