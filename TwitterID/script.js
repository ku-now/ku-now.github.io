const TimeOffset = 1288834974657;

let CalcDateTime = () => {
  let StatusID = document.getElementById('TwitterURL').value;
  let TwitTime = 0;

  if (StatusID.indexOf('?') > 0)
    StatusID = StatusID.substr(0, StatusID.indexOf('?'));

  if (StatusID.match(/\d+/g)) {
    StatusID = parseInt(StatusID.match(/\d+/g).slice(-1)[0]);

  } else {
    document.getElementById('Result').innerHTML = "----/--/-- --:--:--.---";
    return;
  }

  TwitTime = Math.floor(StatusID / (2 ** 22)) + TimeOffset;

  document.getElementById('Result').innerHTML = new Date(TwitTime).toLocaleString("ja")
                                                + "." + (TwitTime % 1000);
};
