let Calc = () => {
  let value = 0.0;

  let val1 = parseFloat(document.getElementById('input1').value);
  let val2 = parseFloat(document.getElementById('input2').value);
  let funcNum = parseInt(document.getElementById('func').value);

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
      value = 10 * Math.log10(Math.pow(10, val1 / 10) - Math.pow(10, val2 / 10));
      break;
  }

  document.getElementById('Result').innerHTML = `${value}dB`;
};
