let PlayerX  = 244;        // 初期座標(x)
let PlayerY  = 244;        // 初期座標(y)
let PlayerHP = 10;         // 体力
let Score    = 0;          // スコア
let Flag     = 0x00;       // 汎用フラグ(ゲームアクティブ状態判定(bit7))
let Count    = -20 * 5;    // カウントダウン等のタイマ管理(原則1カウント=50ms)

const EnemyNum  = 8;      // 敵数
const SquareNum = 19;     // マス目の数
const MoveCooed = 24;     // 1マス当たりの移動量
const LimitMin  = 28;     // 左端マスの座標
const LimitMax  = 460;    // 右端マスの座標

let EnemyX = [];    // 敵座標(x)
let EnemyY = [];    // 敵座標(y)

let Stat = Array(9).fill(0);    // 移動先情報カウンタ

for (let i = 0; i < EnemyNum; i++) {    // 敵の初期配置決定
  EnemyX[i] = LimitMin + MoveCooed * (Math.floor(Math.random() * SquareNum));
  EnemyY[i] = LimitMin + MoveCooed * (Math.floor(Math.random() * SquareNum));
}

let AvoidEngine = () => {
  if (Count <= 0) {    // ゲーム開始前
    if (Count === 0) {    // カウントが0になったらゲーム開始
      Flag |= 0x80;    // ゲームアクティブ判定ON

    } else if (Count % 20 === 0) {    // 1秒毎にカウントダウン更新
      document.getElementById('Score').innerHTML = Math.ceil(Count / -20);
      Display();
    }

  } else {    // ゲーム開始後
    if (Count % 3 === 0) {    // 3カウント毎に敵処理
      MoveEnemy();
      Decision();
      Display();

      if (PlayerHP > 0)    // まだプレイヤーの体力があればスコア加算
        Score += 10;
    }
  }

  Count++;
};

let MovePlayer = event => {    // キーボード入力を反映して表示座標を更新

  // 2方向押しっぱなし斜め移動不可にするには左方向以外の「if」を「else if」にする
  if (event.key === "ArrowLeft") {    // ArrowLeft
    if (PlayerX <= LimitMin)
      PlayerX = LimitMin;
    else
      PlayerX -= MoveCooed;
  }

  if (event.key === "ArrowUp") {    // ArrowUp
    if (PlayerY <= LimitMin)
      PlayerY = LimitMin;
    else
      PlayerY -= MoveCooed;
  }

  if (event.key === "ArrowRight") {    // ArrowRight
    if (PlayerX >= LimitMax)
      PlayerX = LimitMax;
    else
      PlayerX += MoveCooed;
  }

  if (event.key === "ArrowDown") {    // ArrowDown
    if (PlayerY >= LimitMax)
      PlayerY = LimitMax;
    else
      PlayerY += MoveCooed;
  }

  Decision();
  Display();
};

let MoveEnemy = () => {    // 敵を動かす
  let Direction = 0;    // 方向(各敵に対して0～11の乱数)

  for (let i = 0; i < EnemyNum; i++) {
    Direction = Math.floor(Math.random() * 12);

    if (EnemyX[i] > LimitMin && EnemyX[i] < LimitMax &&
        EnemyY[i] > LimitMin && EnemyY[i] < LimitMax) {　// 全ての方向が空いているとき
        Stat[0]++;

      if (Direction < 3)
        EnemyX[i] += MoveCooed;
      else if (Direction < 6)
        EnemyY[i] -= MoveCooed;
      else if (Direction < 9)
        EnemyY[i] += MoveCooed;
      else
        EnemyX[i] -= MoveCooed;

    } else if ((EnemyX[i] > LimitMin && EnemyX[i] < LimitMax) ||    // Xは範囲内
               (EnemyY[i] > LimitMin && EnemyY[i] < LimitMax)) {    // Yは範囲内

      if (EnemyY[i] <= LimitMin) {    // Xは範囲内, Yが負のオーバー
        EnemyY[i] = LimitMin;
        Stat[1]++;

        if (Direction < 4)
          EnemyX[i] += MoveCooed;
        else if (Direction < 8)
          EnemyY[i] += MoveCooed;
        else
          EnemyX[i] -= MoveCooed;

      } else if (EnemyY[i] >= LimitMax) {    // Xは範囲内, Yが正のオーバー
        EnemyY[i] = LimitMax;
        Stat[2]++;

        if (Direction < 4)
          EnemyX[i] += MoveCooed;
        else if (Direction < 8)
          EnemyY[i] -= MoveCooed;
        else
          EnemyX[i] -= MoveCooed;

      } else if (EnemyX[i] <= LimitMin) {    // Xが負のオーバー, Yは範囲内
        EnemyX[i] = LimitMin;
        Stat[3]++;

        if (Direction < 4)
          EnemyY[i] -= MoveCooed;
        else if (Direction < 8)
          EnemyY[i] += MoveCooed;
        else
          EnemyX[i] += MoveCooed;

      } else if (EnemyX[i] >= LimitMax) {    // Xが正のオーバー, Yは範囲内
        EnemyX[i] = LimitMax;
        Stat[4]++;

        if (Direction < 4)
          EnemyY[i] -= MoveCooed;
        else if (Direction < 8)
          EnemyY[i] += MoveCooed;
        else
          EnemyX[i] -= MoveCooed;
      }

    } else if (EnemyX[i] <= LimitMin) {    // Xが負のオーバー
      EnemyX[i] = LimitMin;

      if (EnemyY[i] <= LimitMin) {    // かつYも負のオーバー
        EnemyY[i] = LimitMin;
        Stat[5]++;

        if (Direction < 6)
          EnemyX[i] += MoveCooed;
        else
          EnemyY[i] += MoveCooed;

      } else if (EnemyY[i] >= LimitMax) {    // かつYが正のオーバー
        EnemyY[i] = LimitMax;
        Stat[6]++;

        if (Direction < 6)
          EnemyX[i] += MoveCooed;
        else
          EnemyY[i] -= MoveCooed;
      }

    } else if (EnemyX[i] >= LimitMax) {    // Xが正のオーバー
      EnemyX[i] = LimitMax;

      if (EnemyY[i] <= LimitMin) {    // かつYが負のオーバー
        EnemyY[i] = LimitMin;
        Stat[7]++;

        if (Direction < 6)
          EnemyX[i] -= MoveCooed;
        else
          EnemyY[i] += MoveCooed;

      } else if (EnemyY[i] >= LimitMax) {    // かつYも正のオーバー
        EnemyY[i] = LimitMax;
        Stat[8]++;

        if (Direction < 6)
          EnemyX[i] -= MoveCooed;
        else
          EnemyY[i] -= MoveCooed;
      }
    }
  }

  //console.log(Stat);    // 移動種類別移動指示回数(全敵合計)
};

let Display = () => {    // 描画処理関数
  document.getElementById("player").style.left = PlayerX;    // 自分の座標を出力
  document.getElementById("player").style.top  = PlayerY;

  for(let i = 0; i < EnemyNum; i++) {
    document.getElementById("enemy"+ i).style.left = EnemyX[i];    // 敵の座標を出力
    document.getElementById("enemy"+ i).style.top  = EnemyY[i];
  }

  if (Flag & 0x80) {    // ゲームがアクティブ状態なら更新する
    document.getElementById('Score').innerHTML = `Score:${Score}`;

    if (PlayerHP <= 0) {    // 体力が0ならゲームオーバー
      document.getElementById('Score').innerHTML += ` Gameover...`;

      Flag &= ~0x80;    // ゲームを非アクティブ状態にする
    }
  }
}

let Decision = () => {    // 当たり判定チェック
  if (Flag & 0x80) {    // ゲームがアクティブ状態なら判定する
    for (let i = 0; i < EnemyNum; i++) {
      if (PlayerX === EnemyX[i] && PlayerY === EnemyY[i]) {    // 当たり判定の確認
        if (PlayerHP > 0) {    // 体力があるなら1減らす
          PlayerHP--;
          Score--;
        }
      }
    }
  }
};
