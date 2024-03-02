#### [인프런 워밍업 클럽 FE 0기] 미션3 - 퀴즈 앱

# 🤔 quiz-app

- [Inflearn Blog](https://www.inflearn.com/blogs/1268499)

## Demo

![Alt text](/3-quiz-app/src/img/quiz-app.gif)

Record by [ScreenToGif](https://www.screentogif.com/)

## 개요

- **인프런 워밍업 클럽 FE 0기**의 세 번째 미션인 '퀴즈 앱' 만들기입니다.
- [따라하며 배우는 자바스크립트](https://www.inflearn.com/course/따라하며-배우는-자바스크립트) 섹션 4(9~17)

## 목표

- **Math.random()** 메서드를 이용해 무작위 문제와 보기 만들기
- **do while** 문으로 중복된 데이터를 처리하고 오답 생성
- 배열 메서드(**includes()**, **sort()**)를 이용해 보기 관리

## 구현

> **Math.random()** 메소드를 이용해 무작위 문제와 보기 만들기

```javascript
const operatorArray = ['+', '-', '*'];

function makeQuiz() {
  btnWrap.replaceChildren();
  nextBtnWrap.replaceChildren();
  emoji.innerText = '🤔';

  const number1 = Math.floor(Math.random() * 10);
  const number2 = Math.floor(Math.random() * 10);
  const operator =
    operatorArray[Math.floor(Math.random() * operatorArray.length)];
  quiz.innerText = `${number1} ${operator} ${number2}`;

  // 정답 저장
  const correct = calculator(number1, number2, operator);

  // 정답 + 오답 3개
  const optionArray = makeOptions(correct);
  for (let i = 0; i < 4; i++) {
    const btn = document.createElement('button');
    btn.innerText = optionArray[i];
    btnWrap.appendChild(btn);
  }
}

function calculator(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
  }
}
```

Math.random() 메소드는 0과 1 사이에서 무작위 난수를 생성합니다.

정확한 계산을 위해 Math.floor() 메소드로 정수 이하의 소수점을 버립니다.

무작위로 생성한 난수에 배열의 길이를 곱해서 무작위 인덱스(index)를 생성한 뒤에, 연산자(operater)에 따라 switch문을 이용해 정답을 반환합니다.

또한 오답도 만들어야 하기에 범위가 정답에서 -10 ~ +10의 무작위 값을 생성하고 배열에 담습니다.

<br />

> **do while** 문으로 중복된 데이터를 처리하고 오답 생성 && 배열 메소드(**includes(), sort()**)를 이용해 보기 관리

```javascript
function makeOptions(correct) {
  const optionArray = [];
  const range = 10; // 정답 범위

  for (let i = 0; i < 3; i++) {
    let wrongAnswer;
    do {
      // 정답 주변의 랜덤한 오답 생성
      wrongAnswer =
        correct +
        (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * range);
    } while (optionArray.includes(wrongAnswer) || wrongAnswer === correct);
    // 이미 포함된 오답이거나 정답과 같은 경우 다시 생성

    optionArray.push(wrongAnswer);
  }
  optionArray.push(correct);

  // 보기 섞기
  optionArray.sort(() => Math.random() - 0.5);

  return optionArray;
}
```

`do while`문은 while의 특정 조건을 만족한다면 다시 do 구문을 실행하는 루프를 뜻합니다.

`includes()` 메소드는 해당 배열에 일치하는 값이 있는지 검사하고, 있다면 true를 없다면 false를 반환합니다.

따라서 생성한 wrongAnswer라는 값이 해당 배열에 존재하거나, 정답과 중복된 경우 다시 do 구문을 실행해 새로운 값을 생성합니다.

3개의 오답을 모두 생성했다면 마지막에 정답을 추가합니다.

이렇게 된다면 항상 마지막에 정답이 위치하므로 `sort()` 메소드를 이용해 배열을 섞습니다.

`sort()` 메소드는 매개변수로 정렬 순서를 정의하는 함수를 받습니다.

만약 해당 매개변수가 제공되지 않으면 요소를 문자열로 변환하고 유니 코드 코드 포인트 순서로 문자열을 비교하여 정렬됩니다.

저는 `Math.random()`을 이용해 음수를 반환하면 false, 양수를 반환하면 true가 되도록 해서 배열의 순서를 변경했습니다.

## 회고

강의에서 배웠던 커링(Curry Function)과 IIFE(Immediately Invoked Function Expression)를 사용하고자 했지만...

평소에 보던 코드에서 마땅한 예시가 없던 탓인지 바로 적용할 좋은 예시가 생각나진 않았다. 😥

IIFE는 라이브러리나 오픈 소스에서 사용하는데, 변수의 전역 선언을 피하고 다른 라이브러리나 오픈 소스와의 충돌을 피하기 위해서 라고 한다. (IIFE 내부 안으로 다른 변수가 접근할 수 없고, 전역 스코프에 불필요한 변수가 추가되지 않기 때문에 그렇다!)

main.js 파일의 시작을 IIFE로 변경하긴 했지만... 나중에 제대로 된 예시를 참고해보거나, 라이브러리 제작 혹은 오픈 소스 제작 및 기여를 하는 수준까지 갔을 때 잊지 말고 참고해봐야겠다!

Math.random()으로 여러 무작위 숫자를 생성해서 문제를 만들면서 생각보다 숫자와 문자열 타입이 난무하고 있다는 걸 많이 깨달을 수 있었다.

내가 쓰는 메소드의 반환(return) 타입을 잘 이해하고 있어야겠다는 생각과 함수를 만들 때도 return 값을 잘 의도해서 만들어야겠다는 생각이 함께 들었다. 🙂

## Method

```
> Array
> - Array.prototype.includes()
> - Array.prototype.sort()

> Loop
> - do while

> Init
> - IIFE(Immediately Invoked Function Expression)
```
