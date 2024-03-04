#### [인프런 워밍업 클럽 FE 0기] 미션7 - 예산 계산기 앱

# 💸 Budget Calculator

- [Inflearn Blog](https://www.inflearn.com/blogs/6950)

## Demo

![Alt text](/8-budget-calculator-app/src/img/budget-calculator-app.gif)

Record by [ScreenToGif](https://www.screentogif.com/)

## 개요

- **인프런 워밍업 클럽 FE 0기**의 일곱 번째 미션인 '예산 계산기 앱' 입니다.
- [따라하며 배우는 리액트](https://www.inflearn.com/course/따라하는-리액트) 섹션 0~3

## 목표

- **setInterval()** 메서드를 이용해 타이머 만들기
- **split()** 메서드를 이용해 문자열 관리(는 위험하다)

## 구현

> **setInterval()** 메서드를 이용해 타이머 만들기

```javascript
textarea.addEventListener("focus", gameStart);

let timer = null;

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

function finishGame() {
  clearInterval(timer);
  // ...
}
```

'timer'라는 변수를 `gameStart()` 함수 외부에 생성하고(다른 함수에서도 사용하기 위해) 함수 내부에서 setInterval() 메서드를 할당한다.

`setInterval(func, delay)` 메서드는 실행할 함수(func)와 지연 시간(delay)을 인자로 받는다.

`setInterval()` 메서드는 `setTimeout()` 메서드의 반환 값처럼 'intervalID'을 반환하고, 이를 이용해 생성한 interval을 취소할 수 있다.

1초마다 화면에 보여주는 시간 값을 줄여서 보여주고, 남은 시간(remainTime)이 0이 되면 `finishGame()` 함수에서 `clearInterval(intervalID)` 메서드를 호출한다.

예제는 textarea에 focus 이벤트가 발생하면 `gameStart()` 함수를 호출하고 있어서 이미 타이머가 생성된 이후라면 하위 코드가 실행되지 않도록 조건을 만들었다.

<br />

> **split()** 메서드를 이용해 문자열 관리(는 위험하다)

<i>(정리글을 쓰면서 알아보다가 발견...)</i>

```javascript
function makeExample() {
  exampleContainer.replaceChildren();

  // String.split('') better than [...String] or Array.from(String)
  // better than grapheme-splitter library
  Array.from(examples[exampleIndex]).forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    exampleContainer.appendChild(span);
  });

  exampleIndex++;

  if (exampleIndex >= examples.length) {
    exampleIndex = 0;
  }
}
```

`split(separator, limit)` 메서드는 구분자(separator)와 문자열 최대 개수(limit)을 인자로 받는다.

구분자는 문자열에서 일치하는 부분을 기준으로 나누는데, 빈 문자열('')을 할당하면 공백이므로 각 문자로 나눈다.

처음엔 문자열의 각각 문자를 배열의 요소처럼 다루기 위해서 `split()` 메서드를 이용했다.

<br />

### ⚠️ `split('')`은 문자 단위로 나누지 않는다!

하지만 이 `split()` 메서드에서 공백을 구분자로 하는 게 큰 위험이 있다는 걸 [MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split#%EA%B5%AC%EB%AC%B8)를 통해 확인했다.

```javascript
console.log("𝟘𝟙𝟚𝟛".split("")); // ["�","�","�","�","�","�","�","�"]
console.log("😎😜🙃".split("")); // ["�", "�", "�", "�", "�", "�"]
console.log("अनुच्छेद".split("")); // ["अ", "न", "ु", "च", "्", "छ", "े", "द"]

console.log("Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞".split("")); // ["Z","͑", "ͫ", "̓", ... ]
```

이런 현상이 발생하는 이유는 `split()` 메서드의 구분자가 빈 문자열인 경우, 전체 문자열을 UTF-16으로 인코딩하기 때문이라고 한다.

위와 같은 특수문자는 UTF-16로 표현할 수 없어서 2바이트 인코딩의 값을 쌍으로 묶어 표현했고, 이를 '써로게이트 페어'라고 부른다.

즉 `split('')`은 이 써로게이트 페어가 망가지면서 원하는 결과를 얻지 못하게 된다.

이런 다양한 특수문자와 흰두어 같은 다른 나라의 언어를 제대로 나누기 위한 ['grapheme-splitter' 라이브러리](https://github.com/orling/grapheme-splitter)도 있다.

소스를 보면 생각보다 고려해야 하는 게 많아서 엄청난 코드 양을 볼 수 있다.

예제는 비교적 간단하고 미리 정해진 문자열을 다루고 있기에 `Array.from()` 메서드로 변경했다.

## 회고

사용자가 입력한 문자와 문제의 문자를 비교해서 CSS와 스크립트를 작성하는 게 중요한 과제였다.

처음엔 늘 하던대로 String.split('')으로 문자열을 나누고 관리했지만 글을 작성하기 위해 알아보다가 이 방식이 문제가 있다는 걸 알게 됐다.

MDN 문서를 보면서 문서화가 정말 중요하다는 걸 느끼기도 했고, Stack Overflow 같은 커뮤니티에 문제를 공유하고 함께 고민하는 게 개발 문화의 큰 힘이자 감사한 일이라 생각했다. (감사... 또 감사...)

이런 다양한 경우의 수 때문에 테스트 코드를 중요하게 여기고 작성하는 게 아닐까!?

훌륭한 개발자의 머리 속에는 if가 가득할 것 같다. 🙄
