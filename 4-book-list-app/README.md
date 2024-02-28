#### [인프런 워밍업 클럽 FE 0기] 미션4-1 - 책 리스트 앱

# 📚 book-list-app

- [Inflearn Blog](https://www.inflearn.com/blogs/1268499)

## Demo

![Alt text](/4-book-list-app/src/img/book-list-app.gif)

Record by [ScreenToGif](https://www.screentogif.com/)

## 개요

- **인프런 워밍업 클럽 FE 0기**의 네 번째 미션인 '책 리스트 앱' 입니다.
- [따라하며 배우는 자바스크립트](https://www.inflearn.com/course/따라하며-배우는-자바스크립트) 섹션 5(OOP), 섹션 6(비동기)

## 목표

- **class** 를 이용해 책 리스트 객체 활용하기
- **setTimeout** 을 이용해 DOM 요소 관리하기
- 배열 메서드(**some()**, **splice()**)를 이용해 조건에 맞는 코드 실행 및 배열 관리

## 구현

> **class** 를 이용해 책 리스트 객체 활용하기

```javascript
class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

submitBtn.addEventListener('click', () => {
  const bookName = document.getElementById('book-name').value;
  const bookAuthor = document.getElementById('book-author').value;
  const book = new Book(bookName, bookAuthor);
  addBookToList(book);
});
```

'Book'이라는 클래스(class)는 'name'과 'author'이라는 속성을 갖는 객체를 생성합니다.

책의 이름과 저자는 버튼의 클릭 이벤트로 input 요소의 value를 가져옵니다.

> **setTimeout** 을 이용해 DOM 요소 관리하기

```javascript
function addSubmitInfo(state, message) {
  const submitInfo = document.createElement('p');
  submitInfo.classList.add('info');
  submitInfo.textContent = message;

  switch (state) {
    case 'success':
      submitInfo.classList.add('success');
      break;
    case 'error':
      submitInfo.classList.add('error');
      break;
  }

  requestAnimationFrame(() => {
    submitInfo.style.opacity = '1';
  });
  infoWrap.appendChild(submitInfo);

  setTimeout(() => {
    requestAnimationFrame(() => {
      submitInfo.style.opacity = '0';
    });
    setTimeout(() => {
      submitInfo.remove();
    }, 500);
  }, 1000);
}
```

버튼의 이벤트의 성공 유무에 따라 사용자에게 보여줄 정보를 담은 p 태그를 생성하는 코드입니다.

성공 혹은 실패에 대한 상태(state)를 받고 보여줄 메시지를 받습니다.

requestAnimationFrame() 메서드는 브라우저에 애니메이션을 업데이트할 때 사용하는 메서드입니다. 생성한 요소가 등장하고 사라질 때 서서히 나타나는 효과를 주기 위해 사용했습니다.

setTimeout(callback, delay)은 첫 번째 인자로 콜백 함수를 받고, 두 번째로 밀리초 시간 단위를 받아서 해당 시간이 경과하면 콜백 함수를 실행하는 메서드 입니다.

먼저 1초 뒤에 requestAnimationFrame() 메서드를 실행하고, 0.5초 뒤에 요소를 지우게 됩니다.

> 배열 메서드(**some(), splice()**)를 이용해 조건에 맞는 코드 실행 및 배열 관리

```javascript
const bookList = [];

function addBookToList(book) {
  if (
    !bookList.some(
      (bookOfBookList) =>
        bookOfBookList.name === book.name &&
        bookOfBookList.author === book.author
    )
  ) {
    bookList.push(book);
    // ...

    bookDeleteBtn.addEventListener('click', () => {
      addSubmitInfo('success', '✅ Book deleted to list successfully');
      bookList.splice(bookList.indexOf(book), 1);
      bookTr.remove();
    });
    // ...

    addSubmitInfo('success', '✅ Book added to list successfully');
  } else {
    addSubmitInfo('error', '❗ Book already in list');
  }
}
```

some(callback) 메서드는 배열의 요소가 인자로 받은 함수를 통과하는지 확인하고 불리언 값을 반환합니다.

만약 'bookList' 배열에 이미 똑같은 이름과 저자의 책을 등록하는 경우 else 문을 실행하게 됩니다.

splice(start, deleteCount, item) 메서드는 변경할 인덱스(start), 제거할 요소의 수(deleteCount), 추가할 요소(item)를 인자로 받습니다. 만약 item이 없다면 start index부터 deleteCount의 수만큼 제거합니다.

indexOf(searchElement, fromIndex) 메서드는 찾을 요소(searchElement)와 검색 시작 인덱스(fromIndex)를 인자로 받습니다. 만약 fromIndex가 없다면 0부터 시작합니다. 또한 찾을 수 없는 경우 -1을 반환합니다.

즉, bookList에 indexOf를 이용해 해당 book의 index를 찾아서 splice로 제거하는 방식입니다.

> ```
> 객체를 indexOf로 비교하면 객체의 속성 값이 동일하더라도 참조가 다르다면 음수를 반환하는 경우도 있기에 정확한 속성 값을 비교하는 게 안전하다.
> 또한 배열의 데이터가 객체인 경우는 findIndex()를 이용하는 게 좋다고 한다.
> findIndex()는 주어진 판별 함수를 이용해 비교하기 때문!
> ```

```javascript
bookDeleteBtn.addEventListener('click', () => {
  addSubmitInfo('success', '✅ Book deleted to list successfully');
  // bookList.splice(bookList.indexOf(book), 1);
  const index = bookList.findIndex(
    (item) => item.name === book.name && item.author === book.author
  );
  if (index !== -1) {
    bookList.splice(index, 1);
  }
  bookTr.remove();
  console.log(bookList);
});
```

## 회고

원래는 class로 생성한 Book 객체에 delete 이벤트도 함께 넣으려고 했었다.

그런데 생성한 tr 요소와 bookList라는 array도 참고해서 지워야 했기 때문에 코드가 복잡해져 사용하진 못했다.

(애초에 설계를 잘못하지 않았나...😂)

아마 좀 더 복잡한 모듈을 만든다면 다르게 작성하지 않았을까...!

물론 설계하는 데 충분한 시간을 두고 해야겠지만 🙄

## Method

```
> Object
> - class

> Array
> - Array.prototype.some()
> - Array.prototype.splice()
> - Array.prototype.indexOf()

> DOM
> - setTimeout
> - requestAnimationFrame()

> Init
> - IIFE(Immediately Invoked Function Expression)
```
