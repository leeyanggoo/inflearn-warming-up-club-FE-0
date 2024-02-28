#### [인프런 워밍업 클럽 FE 0기] 미션2 - 가위 바위 보 앱

# 👊Rock-🖐Paper-✌Scissors-app

- [Inflearn Blog](https://www.inflearn.com/blogs/6742)

## Demo

![Alt text](/2-rock-paper-scissors-app/src/img/rock-paper-scissors.gif)

Record by [ScreenToGif](https://www.screentogif.com/)

## 개요

- **인프런 워밍업 클럽 FE 0기**의 두 번째 미션인 '가위 바위 보 앱' 만들기입니다.
- [따라하며 배우는 자바스크립트](https://www.inflearn.com/course/따라하며-배우는-자바스크립트) 섹션 4(1~8)

## 목표

- **생성자 함수(Function() constructor)** 를 이용해 객체를 생성하기
- **this** 를 이용해 객체의 프로퍼티(Property) 관리하기

## 구현

> **생성자 함수(Function() constructor)** 를 이용한 객체 생성

```javascript
function Player() {
  this.win = 0;
  this.weapon = '';
}

function Game() {
  this.count = 0;
  this.play = function (player, robot) {
    // ...play function
    this.count++;
    if (this.count === TOTAL_CHANCE) {
      // ...
    }
  };
  this.reset = function (player, robot) {
    this.count = 0;
    player.win = 0;
    robot.win = 0;
    player.weapon = '';
    robot.weapon = '';
    // ...
  };
}

const game = new Game();
const player = new Player();
const robot = new Player();
```

생성자 함수는 객체를 만드는 함수이며 두 가지 규칙이 있다.

1. 함수명은 '대문자'로 시작한다.
2. 'new' 연산자를 붙여서 실행해야 한다.

new 연산자와 함께 생성자 함수를 호출하게 되면 다음과 같은 과정을 통해 this를 만들고 반환한다.

1. this = {} this를 빈 객체로 생성한다.
2. 함수 내부의 프로퍼티와 메소드를 this에 바인딩한다.
3. return this this를 반환한다.

저는 'Player'라는 생성자 함수를 만들고 이기면 1씩 증가하는 'win' 프로퍼티와 가위, 바위, 보 중에 하나가 들어갈 'weapon'이라는 프로퍼티를 만들었습니다.

그리고 게임 진행 상태를 기록할 'Game'이라는 생성자 함수도 만들었습니다.

'count'는 몇 회의 게임이 진행됐는지 기록하는 프로퍼티이며, 'play'와 'reset'은 게임을 실행하고 초기화하는 메소드입니다.

> 버튼 클릭 이벤트에 생성한 객체의 메소드 실행하기

```javascript
const WEAPON_LIST = {
  rock: '👊',
  paper: '🖐',
  scissors: '✌',
};

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
```

버튼 요소를 감싸고 있는 부모 요소인 btnWarp에 이벤트를 등록했습니다.

game 객체의 play 메소드를 실행하기 전에 robot의 weapon에 Math.random() 메소드를 이용해 무작위의 weapon을 할당합니다.

재시작 버튼 이벤트를 함께 처리하기 위해서 game의 play 함수에서 this.count를 이용해 게임이 마지막까지 진행됐다면 id가 'retry'인 버튼을 추가합니다.

## 회고

뭔가 'player'라고 부르니 게임 캐릭터를 만드는 느낌이 들어서 신기하면서도 게임 개발자는 어떻게 캐릭터를 구성하는지 궁금해졌다.

프로퍼티나 메소드를 객체에 바인딩해서 반환하는 게 class 문법과 닮아있다고 생각했다.

Class and Object Constructor Function in JavaScript

궁금해서 찾아보니 class가 좀 더 편리한 문법을 제공하며, 상속이 큰 차이점이라고 한다. (아직은 잘 모르겠다)

생성자 함수나 class를 제대로 이해하고 사용한 적이 없어서 그런지 감이 잘 안 온다.😢

라이브러리와 오픈 소스의 코드를 보고 class로 도배가 되어 있어 놀랐던 기억이 새록새록 난다.

얼른 배우고 싶다.

    습관적으로 window.onload나 body 태그에 onload를 사용했었는데, 다른 스터디 러너 분께서 'DOMContentLoaded' 이벤트를 쓰시는걸 보고 슬쩍 배워보았다.
    - DOMContentLoaded : 이벤트는 HTML의 파싱이 완료되면 발생하며, 스타일시트, 이미지 및 하위 프레임 로드를 기다리지 않습니다.
    - onload : 속성은 페이지의 모든 자원(이미지, 스크립트, 스타일시트 등)이 다운로드되고 웹 페이지가 완전히 로드되었을 때 발생합니다.

## Method

```
> Object
> - Object.entries()
> - Object.values()

> DOM
> - DOMContentLoaded Event
```
