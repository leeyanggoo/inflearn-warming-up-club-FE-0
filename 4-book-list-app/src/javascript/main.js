'use strict';
(function () {
  const submitBtn = document.getElementById('submit-btn');
  const bookListBody = document.getElementById('book-list-body');
  const infoWrap = document.getElementById('info-wrap');

  const bookList = [];

  class Book {
    constructor(name, author) {
      this.name = name;
      this.author = author;
    }
  }

  function addBookToList(book) {
    if (
      !bookList.some(
        (bookOfBookList) =>
          bookOfBookList.name === book.name &&
          bookOfBookList.author === book.author
      )
    ) {
      bookList.push(book);

      const bookTr = document.createElement('tr');
      const bookNameTd = document.createElement('td');
      const bookAuthorTd = document.createElement('td');
      const bookDeleteTd = document.createElement('td');

      const bookDeleteBtn = document.createElement('button');
      bookDeleteBtn.classList.add('delete');
      bookDeleteBtn.textContent = 'X';
      bookDeleteBtn.addEventListener('click', () => {
        addSubmitInfo('success', '✅ Book deleted to list successfully');
        bookList.splice(bookList.indexOf(book), 1);
        bookTr.remove();
      });

      bookDeleteTd.appendChild(bookDeleteBtn);
      bookNameTd.textContent = book.name;
      bookAuthorTd.textContent = book.author;

      bookTr.appendChild(bookNameTd);
      bookTr.appendChild(bookAuthorTd);
      bookTr.appendChild(bookDeleteTd);

      bookListBody.appendChild(bookTr);

      addSubmitInfo('success', '✅ Book added to list successfully');
    } else {
      addSubmitInfo('error', '❗ Book already in list');
    }
  }

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

  submitBtn.addEventListener('click', () => {
    const bookName = document.getElementById('book-name').value;
    const bookAuthor = document.getElementById('book-author').value;
    const book = new Book(bookName, bookAuthor);
    addBookToList(book);
  });
})();
