// 本HPコンテンツ一番のクソコードにつき閲覧注意(難読化等は施しておりません) //

const line = 5;
const row = 10;

let Init = () => {

for (let i = 0; i < 2; i++)
{
    let tableEle = document.getElementById('tbl1');
    let tr = document.createElement('tr');

    for (let j = 0; j <= row; j++)
    {
        let td = document.createElement('td');

        if (j === 0)
        {
            if (i === 0)
            {
                td.innerHTML = "○";
            }
            else
            {
                td.innerHTML = "×";
            }
        }
        else
        {
            let input = document.createElement('input');
            input.type = "radio";
            input.name = "inputList" + (j - 1);
            tr.appendChild(input);
        }

        tr.appendChild(td);
    }

    tableEle.appendChild(tr);
}

};

let Run = () => {

// const player = Math.floor(Math.random() * line) + 1;
// プレイヤーを1番目に固定しました
const player = 1;
let data = [[[0], [0], [0]]];

for (let i = 1; i <= line; i++)
{
    data.push([[0], [0], [0], [0]]);

    data[i][0][0] = 0;
    data[i][1] = [0];
    data[i][2] = [0];

    if (i !== player)
    {
        data[i][0][0] = Math.floor(Math.random() * Math.pow(2, row));
    }

    for (let j = 0; j < row; j++)
    {
        if (i === player)
        {
            let chkbox = document.getElementsByName('inputList' + j);

            if (chkbox[0].checked)
            {
                data[i][0][0] |= 1 << (row - j - 1);
            }
            else if (chkbox[1].checked)
            {
                data[i][0][0] &= ~(1 << (row - j - 1));
            }
            else
            {
                return;
            }
        }

        data[i][1][j] = (data[i][0][0] & 1 << (row - j - 1)) ? "○" : "×";
        data[i][2][j] = (data[i][0][0] & 1 << (row - j - 1)) ? 1 : 0;
    }
}

data[0][0][0] = "○";
data[0][1][0] = "×";

for (let i = 0; i < row; i++)
{
    data[0][0][i + 1] = line + 1;
    data[0][1][i + 1] = line + 1;

    for (let j = 1; j <= line; j++)
    {
        if (data[j][2][i] === 1)
        {
            data[0][0][i + 1] -= 1;
        }
        else
        {
            data[0][1][i + 1] -= 1;
        }

    }
}

for (let i = 1; i <= line; i++)
{
    data[i][0][1] = 1;

    for (let j = 0; j < row; j++)
    {
        if (data[i][2][j] === 1)
        {
            data[i][3][j] = data[0][0][j + 1];
        }
        else
        {
            data[i][3][j] = data[0][1][j + 1];
        }

        data[i][0][1] *= data[i][3][j];
    }
}

for (let i = 1; i <= line; i++)
{
    data[0][2][i - 1] = data[i][0][1];
}

data[0][2].sort((a, b) => (a < b ? 1 : -1));

for (let i = 1; i <= line; i++)
{
    data[i][0][2] = (1 + data[0][2].indexOf(data[i][0][1]));
}

if (document.getElementById('tbl2').rows.length >= line * 2)
{
    while (document.getElementById('tbl2').rows.length > 0)
    {
        document.getElementById('tbl2').deleteRow(0);
    }
}

for (let i = 0; i < line * 2; i++)
{
    let tableEle = document.getElementById('tbl2');
    let tr = document.createElement('tr');

    for (let j = 0; j < row + 2; j++)
    {
        let td = document.createElement('td');

        if (i % 2 === 0)
        {
            if (j === 0)
            {
                if ((i / 2 + 1) !== player)
                {
                    // td.innerHTML = "COM" + (i / 2 + 1);
                    td.innerHTML = "COM" + (i / 2);
                }
                else
                {
                    td.innerHTML = "あなた";
                }
            }
            else if (j <= row)
            {
                td.innerHTML = data[i / 2 + 1][1][j - 1];
            }
            else
            {
                td.innerHTML = "Score:" + data[i / 2 + 1][0][1];
            }
        }
        else
        {
            if (j === 0)
            {
                td.innerHTML = "倍率";
            }
            else if (j <= row)
            {
                td.innerHTML = data[(i + 1) / 2][3][j - 1];
            }
            else
            {
                td.innerHTML = "Rank:" + data[(i + 1) / 2][0][2];
            }
        }

        tr.appendChild(td);
    }

    tableEle.appendChild(tr);
}

console.log(data);

};
