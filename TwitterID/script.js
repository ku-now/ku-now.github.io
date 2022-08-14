const TimeOffset = 1288834974657;

let CalcDateTime = () => {
  let StatusID = document.getElementById('TwitterURL').value.match(/\d+/g);
  let TwitTime = 0;

  if (StatusID) {
    StatusID = parseInt(StatusID.slice(-1)[0]);

  } else {
    document.getElementById('Result').innerHTML = "----/--/-- --:--:--.---";
    return;
  }

  TwitTime = Math.floor(StatusID / (2 ** 22)) + TimeOffset;

  document.getElementById('Result').innerHTML = new Date(TwitTime).toLocaleString("ja")
                                                + "." + (TwitTime % 1000);
};
