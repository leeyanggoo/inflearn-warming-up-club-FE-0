const TIME_LIMIT = 20;
const timeCount = document.getElementById('time-count');
const errorsCount = document.getElementById('errors-count');
const accuracyCount = document.getElementById('accuracy-count');

const textarea = document.querySelector('textarea');
const exampleContainer = document.getElementById('example-container');

const WPMWrap = document.getElementById('wpm-wrap');
const CPMWrap = document.getElementById('cpm-wrap');
const WPMCount = document.getElementById('wpm-count');
const CPMCount = document.getElementById('cpm-count');

const restartWrap = document.getElementById('restart-wrap');

const examples = [
  'The quick brown fox jumps over the lazy dog.',
  'A watched pot never boils.',
  'Actions speak louder than words.',
  'Beauty is in the eye of the beholder.',
  'Practice makes perfect.',
];

let remainTime = TIME_LIMIT;
let passedTime = 0;
let exampleIndex = 0;

let errors = 0;
let totalPress = 0;

let timer = null;

textarea.addEventListener('focus', gameStart);

textarea.addEventListener('input', onChange);

// 다시하기 버튼 고려해서 함수로 만들기
function reset() {
  remainTime = TIME_LIMIT;
  passedTime = 0;
  exampleIndex = 0;

  errors = 0;
  totalPress = 0;

  timer = null;

  WPMWrap.style.display = 'none';
  CPMWrap.style.display = 'none';
  textarea.removeAttribute('disabled');
  textarea.value = '';
  errorsCount.textContent = 0;
  accuracyCount.textContent = 0;
  timeCount.textContent = remainTime;
  restartWrap.innerHTML = '';
  exampleContainer.textContent = '👇 Click below to start playing!';
}
// 타이머 시작
function gameStart() {
  // 만약 마우스를 다른 곳에 뒀다가 다시 focus 할 때 막기
  if (timer) {
    return;
  }

  makeExample();

  timer = setInterval(() => {
    if (remainTime > 0) {
      remainTime--;
      passedTime++;
      timeCount.textContent = remainTime;
    }
    if (remainTime <= 0) {
      finishGame();
    }
  }, 1000);
}

function makeExample() {
  exampleContainer.replaceChildren();

  examples[exampleIndex].split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    exampleContainer.appendChild(span);
  });

  exampleIndex++;

  if (exampleIndex >= examples.length) {
    exampleIndex = 0;
  }
}

function onChange(e) {
  // 총 입력 횟수(정확도, wpm, cpm)
  totalPress++;

  const textareaValue = e.target.value;
  const exampleContainerSpans = exampleContainer.querySelectorAll('span');

  for (let i = 0; i < exampleContainerSpans.length; i++) {
    // textareaValue.length가 i 보다 큰 경우 = 입력 이후 span은 영향 X
    if (i < textareaValue.length) {
      if (textareaValue[i] === exampleContainerSpans[i].textContent) {
        exampleContainerSpans[i].className = 'correct';
      } else if (textareaValue[i] != exampleContainerSpans[i].textContent) {
        exampleContainerSpans[i].className = 'error';
      }
    } else {
      exampleContainerSpans[i].className = '';
    }
  }

  const errorSpans = exampleContainer.querySelectorAll('span.error');
  errorsCount.textContent = errors + errorSpans.length;

  const accuracy = Math.floor(
    ((totalPress - (errors + errorSpans.length)) / totalPress) * 100
  );
  accuracyCount.textContent = accuracy;

  // 문제 하나 끝날 때 있던 error span의 개수를 errors에 더하기
  if (textareaValue.length === exampleContainerSpans.length) {
    errors += errorSpans.length;
    makeExample();
    // textarea는 textContent가 아니라 value로 초기화
    textarea.value = '';
  }
}

function finishGame() {
  clearInterval(timer);
  textarea.setAttribute('disabled', '');

  WPMWrap.style.display = 'flex';
  CPMWrap.style.display = 'flex';

  const cpm = Math.round((totalPress / passedTime) * 60);
  const wpm = Math.round((totalPress / 5 / passedTime) * 60);

  WPMCount.textContent = wpm;
  CPMCount.textContent = cpm;

  const restartBtn = document.createElement('button');
  restartBtn.textContent = 'Restart';
  restartBtn.addEventListener('click', reset);
  restartWrap.appendChild(restartBtn);
}
