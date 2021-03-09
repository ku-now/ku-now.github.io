let   correctNum   = 0;     // 正解数値
let   rangeLimNum  = 0;     // 上限数値
let   trialTime    = 0;     // 試行回数
let   GameOverTime = 35;    // ゲームオーバーになるまでの試行回数
const LimDefault   = 99;    // 指定しなかった場合の上限数値

const Init = () => OutputTextarea
  (`下限は0固定、上限は99～999999999までを指定できます。上限を入力してください(デフォルト:99)\n`);

const Prompt = () => OutputTextarea
  (`${trialTime}回目、数値を入力してください:`);

let ConvertNum = str =>    // 非数値ならそのまま(type:string)返す
  isNaN(str) ? str : parseInt(str);    // 後に文字列かどうか判定する為あえてisNaN()

let DecisionNumRange = num =>    // 上限数値を決める
  (num !== "" && num >= LimDefault) ? num : LimDefault;

let PressKey = () => {
  if (event.key === 'Enter')
    SendUserText();    // 入力中にEnterを押したら送信する
};

let OutputTextarea = inputStr => {
  let objTextarea = document.getElementById('OutputTextarea');

  objTextarea.value += inputStr;
  objTextarea.scrollTop = objTextarea.scrollHeight;    // 自動スクロール
};

let SendUserText = () => {
  const character = [104, 105, 100, 100, 101, 110];
  let   userInput = document.getElementById('InputUserText').value;
                    document.getElementById('InputUserText').value = "";

  if (document.getElementById('OutputTextarea').value === "")
    return;

  userInput = userInput.replace(/\s+/g, '');    // 空白を取り除く

  if (userInput === "") {
    OutputTextarea(`空送信検知、`);

  } else if (trialTime !== 0 && userInput === String.fromCharCode.apply(null, character)) {
    OutputTextarea(correctNum.toString(36) +"\n");
    Prompt();
    return;
  }

  userInput = ConvertNum(userInput);

  if (typeof userInput !== 'number')
    OutputTextarea(`数字以外を検知、`);

  if (trialTime !== 0) {
    if (typeof userInput !== 'number' || Number.isNaN(userInput) ||
        rangeLimNum < userInput || userInput < 0) {
      OutputTextarea(`入力値が範囲を超えています\n`);

    } else if (correctNum < userInput) {
      OutputTextarea(`${userInput}より小さいです\n`);
      trialTime++;

    } else if (correctNum > userInput) {
      OutputTextarea(`${userInput}より大きいです\n`);
      trialTime++;

    } else if (correctNum === userInput) {
      OutputTextarea(`${userInput}、正解です\n\n`);
      trialTime = 0;
      Init();
      return;
    }

    if (trialTime > GameOverTime) {
      OutputTextarea(`回数上限に達しました、ゲームオーバーです\n正解は${correctNum}でした\n\n`);
      trialTime = 0;
      Init();

    } else {
      Prompt();
    }

  } else {
    rangeLimNum  = DecisionNumRange(userInput);
    correctNum   = Math.floor(Math.random() * (rangeLimNum + 1));
    GameOverTime = Math.ceil((Math.log2(rangeLimNum + 1) + 13) / (4 / 3));
    OutputTextarea(`0から${rangeLimNum}の間で出題します\n${GameOverTime}回失敗でゲームオーバーです\n`);
    trialTime++;
    Prompt();
  }
};
