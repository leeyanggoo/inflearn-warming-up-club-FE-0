// form El
const form = document.querySelector('form');
// submit button El
const generatorBtn = document.getElementById('genrator-btn');

// input El
const passwordLength = document.getElementById('password-length');
// input[checkbox] El
const checkNumbers = document.getElementById('numbers');
const checkSmallLetters = document.getElementById('small-letters');
const checkCapitalLetters = document.getElementById('capital-letters');
const checkSymbols = document.getElementById('symbols');

// p = result El
const generatorResult = document.getElementById('generator-result');
const copyBtn = document.getElementById('copy-btn');

{
  /* array of characters */
}
// index를 이용한 0~9 배열 [0, 1, 2, ...]
const numbersArray = Array.from({ length: 10 }, (_, index) => index);
// 유니코드를 이용한 소문자 배열 [a, b, c, ...]
const smallLettersArray = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(97 + index)
);
// 유니코드를 이용한 대문자 배열 [A, B, C, ...]
const capitalLettersArray = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index)
);

const symbolsArray = ['@', '!', '#', '$', '%'];

form.onsubmit = function (e) {
  e.preventDefault();
  const resultArray = [];
  let password = '';
  let requiredNumbers = false;
  let requiredSmallLetters = false;
  let requiredCapitalLetters = false;
  let requiredSymbols = false;

  if (checkNumbers.checked) {
    resultArray.push(...numbersArray);
    requiredNumbers = true;
  }
  if (checkSmallLetters.checked) {
    resultArray.push(...smallLettersArray);
    requiredSmallLetters = true;
  }
  if (checkCapitalLetters.checked) {
    resultArray.push(...capitalLettersArray);
    requiredCapitalLetters = true;
  }
  if (checkSymbols.checked) {
    resultArray.push(...symbolsArray);
    requiredSymbols = true;
  }

  do {
    for (let i = 0; i < passwordLength.value; i++) {
      const randomIndex = Math.floor(Math.random() * resultArray.length);
      password += resultArray[randomIndex];
    }
  } while (
    (requiredNumbers &&
      !password
        .split('')
        .some((char) => numbersArray.includes(Number(char)))) ||
    (requiredSmallLetters &&
      !password.split('').some((char) => smallLettersArray.includes(char))) ||
    (requiredCapitalLetters &&
      !password.split('').some((char) => capitalLettersArray.includes(char))) ||
    (requiredSymbols &&
      !password.split('').some((char) => symbolsArray.includes(char)))

    // 정규 표현식으로 검사
    // (requiredNumbers && !/[0-9]/.test(password)) ||
    // (requiredSmallLetters && !/[a-z]/.test(password)) ||
    // (requiredCapitalLetters && !/[A-Z]/.test(password)) ||
    // (requiredSymbols && !/[!@#$%]/.test(password))
  );

  generatorResult.textContent = password;

  if (
    checkNumbers.checked &&
    checkSmallLetters.checked &&
    checkCapitalLetters.checked &&
    checkSymbols.checked &&
    passwordLength.value > 9 &&
    passwordLength.value < 17
  ) {
    copyBtn.removeAttribute('disabled');
  } else {
    copyBtn.setAttribute('disabled', '');
  }
};

function isChecked() {
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  let anyCheck = false;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      anyCheck = true;
    }
  });

  return anyCheck;
}

form.addEventListener('click', (e) => {
  isChecked()
    ? passwordLength.removeAttribute('disabled')
    : passwordLength.setAttribute('disabled', '');
});

passwordLength.addEventListener('input', () => {
  isChecked() && passwordLength.value > 4 && passwordLength.value < 71
    ? generatorBtn.removeAttribute('disabled')
    : generatorBtn.setAttribute('disabled', '');
});

copyBtn.addEventListener('click', () => {
  window.navigator.clipboard
    .writeText(generatorResult.textContent)
    .then((copyBtn.textContent = '✔'));
  setTimeout(() => {
    copyBtn.textContent = 'copy!';
  }, 1000);
});
