#### [인프런 워밍업 클럽 FE 0기] 미션4-2 - GitHubFinder 앱

# 🔍 github-finder-app

- [Inflearn Blog](https://www.inflearn.com/blogs/6914)

## Demo

![Alt text](/5-github-finder-app/src/img/github-finder-app.gif)

Record by [ScreenToGif](https://www.screentogif.com/)

## 개요

- **인프런 워밍업 클럽 FE 0기**의 네 번째 미션인 'GitHubFinder 앱' 입니다.
- [따라하며 배우는 자바스크립트](https://www.inflearn.com/course/따라하며-배우는-자바스크립트) 섹션 5(OOP), 섹션 6(비동기)

## 목표

- **Fetch API** 를 이용해 깃허브 유저 목록 불러오기
- **Closure** 를 이용해 Debounce Function 만들기

## 구현

> **Fetch API 를 이용해 깃허브 유저 목록 불러오기**

```javascript
async function loadUser(input) {
  prevInputValue = input;

  try {
    // const response = await fetch('./src/javascript/user.json');
    const response = await fetch(`${url}/${input}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user json');
    }

    const json = await response.json();

    setUserAvatar(json);
    setUserInfo(json);

    await loadUserRepos(json);
  } catch (error) {
    console.error(error);
  }
}
```

fetch() 메서드의 응답은 HTTP 응답 전체를 나타내는 'response' 객체를 반환한다.

response의 ok 속성은 응답의 성공 여부를 불리언 값으로 가지고 있다.

따라서 응답이 성공이 아닐 경우 오류 객체(new Error())를 반환하고 catch 문으로 Promise의 오류를 처리한다.

응답에 성공한 response 객체를 JSON으로 사용하기 위해선 json() 메서드를 이용해 파싱해야 한다.

<br />

> **Closure** 를 이용해 Debounce Function 만들기

```javascript
// debounce
debounceInput.addEventListener('input', debounce(loadUser, 1000));
// debounceInput.addEventListener('input', e => callback(e));

function debounce(callback, delay = 0) {
  // timer는 부모 함수에서 선언된 지역 변수
  let timer = null;

  return (arg) => {
    // 여기서 arg는 input event

    if (timer) {
      // 이미 타이머가 있는데 또 실행되면 타이머 삭제
      clearTimeout(timer);
    }

    // 변수 timer는 부모 함수에서 선언되었지만 내부 함수에서 사용(클로저)
    timer = setTimeout(() => {
      callback(arg.target.value);
    }, delay);
  };
}
```

`<input>` 요소의 'input' 이벤트는 요소의 value가 변경될 때마다 발생한다.

만약 사용자가 입력할 때마다 서버에 데이터를 요청한다면 서버의 부하가 커지기 때문에 좋은 방법은 아니다.

이럴 때 사용자의 입력이 끝난 뒤 마지막 value를 이용해 서버로 요청하는 게 효율적인 방법이라 할 수 있다.

함수의 실행 요청이 반복될 때 마지막 요청만으로 실행하는 걸 '디바운싱(debouncing)'이라고 부른다.

debounce 함수는 인자로 실행할 함수를 받고 자식 함수를 반환한다.

부모 함수인 debounce 함수에서 선언한 변수(timer)를 자식 함수에서 사용할 수 있는 클로저(Closure)를 이용해 자식 함수의 setTimeout() 메서드의 반환 값인 'timeoutID'를 할당한다.

변수 'timer'에 할당한 timeoutID를 이용해 setTimeout() 메서드의 지연 시간(delay)이 종료되기 전에 요청이 들어왔다면 이전에 생성한 타이머를 clearTimeout() 메서드를 이용해 종료하고 다시 타이머를 할당한다.

이렇게 delay로 설정한 시간 이내에 사용자의 입력이 없을 경우 API 요청 함수를 실행하게 된다.

<br />

> ```
> 반복적인 함수의 실행을 다루는 방법으로 디바운싱(debouncing)와 쓰로틀링(throttling)이 있다.
> 여러 변수를 고려해 'lodash' 라이브러리의 debounce를 많이 사용한다.
> ```

## 회고

이번 미션은 debounce가 반환하는 자식 함수의 인자(argument)가 어떤 타입인지 알기 때문에 callback 함수에 전달하는 인자를 수정해서 미숙한 debounce 함수라고 볼 수 있다.

늘 라이브러리를 통해 사용하던 함수를 만들려고 하니 모르는 것도 많고, 고려해야 할 부분이 많다는 걸 알게 됐다.

자바스크립트의 기초를 잘 알아야 이런 라이브러리 메서드의 원리를 이해하기도 쉽고, 커스텀하기에 수월한 것 같다.

(외의로 GitHub의 API 요청이 API key 없이도 되어서 신기했고, 그 덕에 조금은 수월했다. 아주 조금... 😵)
