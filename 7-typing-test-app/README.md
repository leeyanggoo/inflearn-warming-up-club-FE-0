#### [인프런 워밍업 클럽 FE 0기] 미션5 - 비밀번호 생성 앱

# 🔐 Password Genrator

- [Inflearn Blog](https://www.inflearn.com/blogs/6950)

## Demo

![Alt text](/6-passwrod-generator-app/src/img/passwrod-generator-app.gif)

Record by [ScreenToGif](https://www.screentogif.com/)

## 개요

- **인프런 워밍업 클럽 FE 0기**의 다섯 번째 미션인 '비밀번호 생성 앱' 입니다.
- [따라하며 배우는 자바스크립트](https://www.inflearn.com/course/따라하며-배우는-자바스크립트) 섹션 7~8(Iterator, Generator, Design Pattern)

## 목표

- **Array.from, fromCharCode()** 메서드를 이용해 숫자, 소문자, 대문자 배열 생성
- **동적 변수** 를 이용해 DOM 요소 조작 및 비밀번호 생성하기

## 구현

> **Array.from, fromCharCode()** 메서드를 이용해 숫자, 소문자, 대문자 배열 생성

```javascript
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
```

`Array.from(arrayLike, mapFn, thisArg)` 메서드는 세 개의 인자를 받는다.

첫 번째 인자는 순회가 가능한 유사 배열 객체(arrayLike), 두 번째 인자는 배열의 각 요소에 호출할 함수(mapFn), 세 번째 인자로 mapFn 함수 실행 시에 사용할 this(thisArg) 값을 받는다.

여기서 유사 배열 객체의 속성인 'length'를 이용해 원하는 길이를 지정하고 두 번째 함수에서 인덱스를 이용해 각 요소의 값을 인덱스로 지정하면 0부터 length-1의 값을 갖는 배열을 만들 수 있다.

`String.fromCharCode(num1[, ...[, numN]])` 메서드는 UTF-16 코드 유닛의 시퀀스로부터 문자열을 생성해 반환한다.

알파벳은 총 25개이며, 알파벳 소문자의 유니코드는 97부터 122까지, 대문자는 65부터 90까지이므로 길이와 index를 각각 알맞게 설정해주면 된다.

<br />

> **동적 변수** 를 이용해 DOM 요소 조작 및 비밀번호 생성하기

```javascript
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
```

`<form>` 요소 하위의 'checkbox' 타입인 `<input>` 요소를 모두 선택하고, 'checked' 속성을 확인해 하나라도 true라면 'anyCheck'라는 동적 변수에 true를 할당한다.

```javascript
form.addEventListener('click', (e) => {
  isChecked()
    ? passwordLength.removeAttribute('disabled')
    : passwordLength.setAttribute('disabled', '');
});
```

이렇게 `isChecked()` 함수를 실행해서 체크 여부를 확인하고 입력 `<input>` 요소의 속성을 변경한다.

```javascript
const resultArray = [];
let password = '';

let requiredNumbers = false;
// ...

if (checkNumbers.checked) {
  resultArray.push(...numbersArray);
  requiredNumbers = true;
}
// ...
```

생성할 비밀번호에서 반드시 포함해야 하는 속성을 확인하는 required 변수를 만들고 `'input[type="checkbox"]'` 요소의 각 checked 값을 확인해 true로 변경한다.

```javascript
do {
  for (let i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * resultArray.length);
    password += resultArray[randomIndex];
  }
} while (
  (requiredNumbers &&
    !password.split('').some((char) => numbersArray.includes(Number(char)))) ||
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
```

for문을 이용해 사용자가 입력한 비밀번호의 자릿수(passwordLength.value)만큼 비밀번호를 생성한다.

생성한 비밀번호를 split() 메서드를 이용해 문자마다 나눈 뒤 배열로 만들고, 문자를 하나하나 기존에 생성한 배열의 요소와 비교한다.

만약 생성한 비밀번호에 반드시 포함해야 하는 속성이 없다면(required가 true인데 다음 조건식을 만족하지 않는 경우) 다시 생성한다.

이를 좀 더 쉽게 검사하기 위한 정규 표현식도 있지만, 모른다는 가정 하에(잘 모르기도 했지만 😂) 구현을 해보려 했다.

## 회고

다양한 플랫폼에서 회원가입과 로그인은 필수적인 사항일 텐데, 여기서 사용하는 검사식은 플랫폼만큼이나 다양하다고 들었다.

왜냐하면 이 부분은 보안과 연결되어 있어서 꽤 민감하기 때문이다.

코드를 작성하다 보니 비밀번호를 무작위로 생성하는 것보다 조건을 만들고 통과시키는 게 더 어려웠다.

특히 input의 checked 여부에 따라 결과에 반드시 포함시켜야 한다고 작성하는 부분이 꽤 오래 걸렸다.

처음엔 전체가 아니라 하나하나 만들 때마다 검사했지만, while의 조건에서 OR( || ) 연산자로 검사하다 보니 무한 루프에 빠져버렸다.

결국 전체를 비교하고 다시 만드는 코드로 변경했지만 뭔가 좋은 방법이 아닌 것 같아서 찜찜하다. 🤔

물론 보통은 생성이 아니라 사용자가 입력한 값을 비교하겠지만...

여러 변수와 다양한 조건을 고려해서 효율적인 코드를 작성할 수 있는 개발자가 되고 싶다!
