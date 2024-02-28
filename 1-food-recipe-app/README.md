#### [인프런 워밍업 클럽 FE 0기] 미션1 - 음식 메뉴 앱

# 🍝 food-recipe-app

- API from [TheMealDB](https://www.themealdb.com)
- [Inflearn Blog](https://www.inflearn.com/blogs/6660)

## Demo

![Alt text](/1-food-recipe-app/src/img/food-recipe-app.gif)

Record by [ScreenToGif](https://www.screentogif.com/)

## 개요

- **인프런 워밍업 클럽 FE 0기**의 첫 번째 미션인 '음식 메뉴 앱' 만들기입니다.
- [따라하며 배우는 자바스크립트](https://www.inflearn.com/course/따라하며-배우는-자바스크립트)의 섹션 1~3(자바스크립트 기초, Window 객체 및 DOM, Event)를 보고 자바스크립트의 DOM 요소를 조작하는 데 중점을 두었습니다.
- 음식 데이터는 [TheMealDB](https://www.themealdb.com)의 API를 이용했습니다. 사용한 API가 '음식 레시피'라서 이름을 변경했습니다.

## 목표

- 문서 객체 모델(The Document Object Model, 이하 DOM)의 메서드(methods)를 이용해 요소(element)에 **접근**하고 **생성**하고 **교체**하기
- **이벤트 리스너(Event Listener)** 메서드를 이용해 요소에 이벤트를 등록하고 이벤트 객체 이용하기
- 메뉴 데이터를 **Fetch API**를 사용해 불러오기

## 구현

> 이벤트 위임(Event Delegation)을 이용한 이벤트 생성

```javascript
/*
<nav id="food-navigation">
  <div class="food-navigation-item">
    <button id="Beef">
      <figure>
        <img src="https://www.themealdb.com/images/category/beef.png">
        <figcaption>
          Beef
        </figcaption>
      </figure>
    </button>
  </div>
  // ...
</nav>
*/

// Not Event Delegation
foodNavigation.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', async () => {
    const targetId = button.id;
    await setFoodList(targetId);
  });
});

// Event Delegation
foodNavigation.addEventListener('click', async (event) => {
  const targetElement = event.target;

  // closest() 메서드는 주어진 CSS 선택자와 일치하는 요소를 찾을 때까지,
  // 자기 자신을 포함해 위쪽(부모 방향, 문서 루트까지)으로 문서 트리를 순회합니다.
  const targetDiv = targetElement.closest('.food-navigation-item');

  if (!targetDiv) {
    return;
  }

  const targetButton = targetDiv.querySelector('button');
  const targetId = targetButton.id;

  await setFoodList(targetId);
});
```

이벤트 위임이란 '상위 요소에서 하위 요소의 이벤트를 제어하는 것'을 의미합니다.

이벤트를 위임하는 이유

1. 이벤트를 하나의 핸들러로 처리함으로써 메모리 사용량을 줄이고 성능을 향상시킬 수 있다.
2. 새로운 요소가 추가되거나 제거되는 경우 이벤트 리스너는 상위 요소에 연결되어 있어 재연결의 필요성이 줄어든다.

저는 nav 태그에 이벤트를 등록하고 closest 메서드를 이용해 버튼의 id를 찾는 방법을 사용했습니다.

> 하위 요소를 제거하고 생성한 요소를 추가하기

```javascript
/*
<div id="food-list">
  <div class="food-list-item">
    <figure>
      <img
        src="img src"
      />
    </figure>
    <div class="food-list-item-desc">
      <p>food name</p>
      <hr />
      <div>
        food recipe
      </div>
    </div>
  </div>
</div>
*/

const foodList = await getFoodList(strCategory);
const foodListElement = document.getElementById('food-list');
const foodListItem = document.querySelectorAll('.food-list-item');

foodListItem.forEach((item) => item.remove());
// foodListElement.innerHTML = '';

foodList.map(async (food) => {
  // ...
  const foodElement = getFoodElement(
    idMeal,
    strMeal,
    strMealThumb,
    strInstructions
  );
  foodListElement.appendChild(foodElement);
});
```

배웠던 removeChild()와 replaceChild() 메서드를 이용하고자 했으나...

'만약 해당 카테고리의 음식 리스트의 개수가 다르다면 어떻게 하지?'라는 생각에 한번에 제거하기로 결정했습니다.

처음엔 innerHTML을 이용해 하위 코드를 공백으로 만들었지만, 뭔가 이건 너무 이상하다는 생각(요소의 참조나 연결 같은 게 깨지진 않을까)이 들어 찾아보았습니다.

1. stack overflow의 [Remove child nodes (or elements) or set innerHTML=""?](https://stackoverflow.com/questions/18084941/remove-child-nodes-or-elements-or-set-innerhtml)라는 글에서는 innerHTML은 하위 요소의 이벤트 핸들러가 완전히 제거되지 않을 수도 있다고 한다.
2. 또한 [Why InnerHTML Is a Bad Idea and How to Avoid It?](https://www.dhairyashah.dev/posts/why-innerhtml-is-a-bad-idea-and-how-to-avoid-it/)에서는 innerHTML이 보안상 좋지 않다는 점을 말하고 있다.

   Stack Overflow의 글을 자세히 읽어 보니 다음과 같은 글이 있었다.
   [What is the best way to empty a node in JavaScript](https://stackoverflow.com/questions/13798796/what-is-the-best-way-to-empty-a-node-in-javascript)
   그리고 MDN 문서에도 이렇게 소개하고 있다.
   `replaceChildren()` provides a very convenient mechanism for emptying a node of all its children. You call it on the parent node without any argument specified:
   즉 `replaceChildren()`메서드를 빈 인자로 실행하면 하위 자식 노드를 모두 지워준다는 것...!
   😅

## 회고

빈 폴더를 놓고 코드를 작성해본 게 너무 오랜만인 것 같다.

자료를 찾기 귀찮다는 마음과 첫 미션이니까 API를 써볼까 하며 자만했던 순간도 있었다.

미션의 목적보다 어느새 다른 부분을 신경 쓰느라 배보다 배꼽이 점점 커지는 것 같았다.

딸랑 script 태그 한 줄 작성하고 js 파일을 제대로 못 불러와서 몇 시간을 해결 방법을 찾아서 해매기도 했다.

😭

이벤트 위임 코드를 작성할 때 이은재 님의 시나브로 자바스크립트에서 배웠던 부분을 참고했다.

음식 레시피를 불러올 때 요소를 지우고 불러와서 그런지 해당 부분이 사라지고 나타나서 페이지가 늘었다 줄었다 하는 게 눈에 띈다.

이래서 가상 돔을 쓰는걸까? 아니면 태그의 속성을 하나하나 수정하면 되는걸까?

일단 진도를 따라잡고 배워서 발전시켜야겠다.

## Method

> Pattern
>
> - Event Delegation
>
> ---
>
> Data
>
> - fetch()
> - map()
> - filter()
> - includes()
> - slice()
>
> ---
>
> DOM
>
> - createElement()
> - getElementById()
> - querySelector()
> - querySelectorAll()
> - innerHTML
> - appendChild()
> - addEventListener()
> - matches()
> - closest()
> - replaceChildren()
