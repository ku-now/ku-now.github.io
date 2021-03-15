const ReferenceFreq = 440.0;    // 基本周波数
const ReferenceNote = 69;       // 基準音(A4)

let CalcFrequency = () => {
  let Frequency = ReferenceFreq;

  let NoteNumber = parseInt(document.getElementById('MIDINoteScale').value) +
                   parseInt(document.getElementById('MIDINoteNum').value);
  let BendNum    = parseInt(document.getElementById('PitchBendNum').value);
  let BendRenge  = parseInt(document.getElementById('BendRengeNum').value);

  Frequency *= Math.pow(2, (NoteNumber - ReferenceNote) / 12);

  Frequency *= (BendNum < 0) ? Math.pow(2, BendNum / (8192 * 12 / BendRenge)) :
                               Math.pow(2, BendNum / (8191 * 12 / BendRenge));

  document.getElementById('Result').innerHTML = `${Frequency}Hz`;
};
