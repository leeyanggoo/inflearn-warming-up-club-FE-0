// onLoad F
const TOTAL_CHANCE = 10;
// const WEAPON_LIST = ['👊', '🖐', '✌'];
const WEAPON_LIST = {
  rock: '👊',
  paper: '🖐',
  scissors: '✌',
};

function onLoad() {
  createCountBox();
}
document.addEventListener('DOMContentLoaded', onLoad);

function createCountBox() {
  // replaceChildren() --> 자식 요소들을 모두 제거한다.
  document.querySelector('#count-wrap').replaceChildren();
  for (let i = 0; i < TOTAL_CHANCE; i++) {
    const countBox = document.createElement('div');
    countBox.className = 'common';

    document.querySelector('#count-wrap').appendChild(countBox);
  }
}

function createWeaponBtn() {
  document.querySelector('#btn-wrap').replaceChildren();
  // Object.entries(object) --> object를 배열로 반환 [[key, value], ...]
  for (const [key, value] of Object.entries(WEAPON_LIST)) {
    const weaponBtn = document.createElement('button');
    weaponBtn.className = 'font-50 btn';
    weaponBtn.id = key;
    weaponBtn.innerText = value;

    document.querySelector('#btn-wrap').appendChild(weaponBtn);
  }
}

function calculate({ playerWeapon, robotWeapon }) {
  const results = {
    '👊': {
      '👊': 'draw',
      '🖐': 'lose',
      '✌': 'win',
    },
    '🖐': {
      '🖐': 'draw',
      '✌': 'lose',
      '👊': 'win',
    },
    '✌': {
      '✌': 'draw',
      '👊': 'lose',
      '🖐': 'win',
    },
  };

  return results[playerWeapon][robotWeapon];
}

function main() {
  const btnWarp = document.querySelector('#btn-wrap');
  const countWrap = document.querySelector('#count-wrap');
  const countBoxArray = countWrap.childNodes;
  const playerWeaponElement = document.querySelector('#player-weapon');
  const robotWeaponElement = document.querySelector('#robot-weapon');
  const playerScoreElement = document.querySelector('#player-score');
  const robotScoreElement = document.querySelector('#robot-score');
  const currentResultElement = document.querySelector('#current-result');

  function Game() {
    this.count = 0;
    this.play = function (player, robot) {
      const result = calculate({
        playerWeapon: player.weapon,
        robotWeapon: robot.weapon,
      });
      countBoxArray[this.count].classList.remove('common');
      countBoxArray[this.count].classList.add(result);
      currentResultElement.innerText = result;

      if (result === 'win') {
        player.win++;
        playerScoreElement.innerText = player.win;
      } else if (result === 'lose') {
        robot.win++;
        robotScoreElement.innerText = robot.win;
      }

      this.count++;

      if (this.count === TOTAL_CHANCE) {
        const retryBtn = document.createElement('button');
        retryBtn.className = 'font-50 btn';
        retryBtn.id = 'retry';
        retryBtn.innerText = 'Retry';

        btnWarp.replaceChildren();
        btnWarp.appendChild(retryBtn);

        const text = document.createElement('p');
        countWrap.replaceChildren();
        countWrap.appendChild(text);

        if (player.win > robot.win) {
          text.innerText = 'You win 😄';
        } else if (player.win < robot.win) {
          text.innerText = 'You lose 😢';
        } else if (player.win === robot.win) {
          text.innerText = 'Draw... 😅';
        }
      }
    };
    this.reset = function (player, robot) {
      createCountBox();
      createWeaponBtn();
      this.count = 0;
      player.win = 0;
      robot.win = 0;
      playerScoreElement.innerText = player.win;
      robotScoreElement.innerText = robot.win;
      playerWeaponElement.innerText = '';
      robotWeaponElement.innerText = '';
      currentResultElement.innerText = '';
      player.weapon = '';
      robot.weapon = '';
    };
  }

  function Player() {
    this.win = 0;
    this.weapon = '';
  }

  const game = new Game();
  const player = new Player();
  const robot = new Player();

  btnWarp.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('btn')) {
      if (target.id === 'retry') {
        return game.reset(player, robot);
      }

      player.weapon = target.textContent;
      // Object.values() --> object의 value를 array로 반환해준다.
      robot.weapon = Object.values(WEAPON_LIST)[Math.floor(Math.random() * 3)];

      playerWeaponElement.innerText = player.weapon;
      robotWeaponElement.innerText = robot.weapon;

      game.play(player, robot);
    }
  });
}

main();
