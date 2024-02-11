const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']

];
//0 es user, 1 es PC
let turn = 0;
const boardContainer = document.getElementById('board');
const playerDiv = document.getElementById('player');

startGame();
function startGame() {
  renderBoard();
  //Control del turno inicial
  turn = Math.random() <= 0.5 ? 0 : 1;
  renderCurrentPlayer();

  if (turn === 0) {
    playerPlays();
  } else {
    pcPlays();
  }

}
//Usuario
function playerPlays() {


  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell, i) => {
    const column = i % 3;
    const row = parseInt(i / 3);
    if (board[row][column] === '' && checkWinGame() == 0) {
      cell.addEventListener('click', e => {
        board[row][column] = 'O';
        cell.textContent = board[row][column];


        pcPlays();


      })
    } else {
      cell.removeEventListener('click', this);
      return;
    }
  });
}
//PC
function pcPlays() {
  renderCurrentPlayer();
  if (checkWinGame() == 0) {
    setTimeout(() => {
      let played = false;
      const options = checkIFCanWin();
      if (options.length) {
        const bestOption = options[0];
        for (let i = 0; i < bestOption.length; i++) {
          if (bestOption[i].value === 0) {
            const posi = bestOption[i].i;
            const posj = bestOption[i].j;
            board[posi][posj] = 'X';
            played = true;
            break;
          }

        }
      } else {
        for (let i = 0; i < board.length; i++) {
          for (let j = 0; j < board.length; j++) {
            if (board[i][j] === '' && !played) {
              board[i][j] = 'X';
              played = true;
            }

          }

        }
      }
      turn = 0;
      renderBoard();
      renderCurrentPlayer();

      playerPlays();

    }, 1500);
  }
}

function checkIFCanWin() {
  const arr = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === '') {
        arr[i][j] = { value: 0, i, j };
      }
      if (arr[i][j] === 'X') {
        arr[i][j] = { value: 1, i, j };
      }
      if (arr[i][j] === 'O') {
        arr[i][j] = { value: -2, i, j };
      }
    }
  }
  //Posiciones
  const p1 = arr[0][0];
  const p2 = arr[0][1];
  const p3 = arr[0][2];
  const p4 = arr[1][0];
  const p5 = arr[1][1];
  const p6 = arr[1][2];
  const p7 = arr[2][0];
  const p8 = arr[2][1];
  const p9 = arr[2][2];
  //Victorias
  const s1 = [p1, p2, p3];
  const s2 = [p4, p5, p6];
  const s3 = [p7, p8, p9];
  const s4 = [p1, p4, p7];
  const s5 = [p2, p5, p8];
  const s6 = [p3, p6, p9];
  const s7 = [p1, p5, p9];
  const s8 = [p3, p5, p7];

  const res = [s1, s2, s3, s4, s5, s6, s7, s8].filter(line => {
    return (
      line[0].value + line[1].value + line[2] == 0 ||
      line[0].value + line[1].value + line[2] == -4
    );
  });
  return res;


}


function renderCurrentPlayer() {
  playerDiv.textContent = `Turno del ${turn == 0 ? 'Jugador' : 'PC'}`;

}

function checkWinGame() {
  const arr = JSON.parse(JSON.stringify(board));
  //Posiciones
  const p1 = arr[0][0];
  const p2 = arr[0][1];
  const p3 = arr[0][2];
  const p4 = arr[1][0];
  const p5 = arr[1][1];
  const p6 = arr[1][2];
  const p7 = arr[2][0];
  const p8 = arr[2][1];
  const p9 = arr[2][2];
  //Victorias
  const s1 = [p1, p2, p3];
  const s2 = [p4, p5, p6];
  const s3 = [p7, p8, p9];
  const s4 = [p1, p4, p7];
  const s5 = [p2, p5, p8];
  const s6 = [p3, p6, p9];
  const s7 = [p1, p5, p9];
  const s8 = [p3, p5, p7];

  const win = [s1, s2, s3, s4, s5, s6, s7, s8].filter(line => {
    return (

      line[0] + line[1] + line[2] == 'XXX' ||
      line[0] + line[1] + line[2] == 'OOO'

    )
  });

  if (win.length) {

    if (win[0][0] == 'X') {
      playerDiv.textContent = 'El Ganador es la PC';

    }
    else {
      playerDiv.textContent = 'El Ganador es el usuario';

    }
    return 1;
  }
  return 0;

}

function renderBoard() {
  const html = board.map(row => {
    const cells1 = row.map(cell => {
      return `<button class='cell'>${cell}</button>`;

    });
    return `<div class='row'>${cells1.join('')} </div>`;
  });
  boardContainer.innerHTML = html.join('');
}
