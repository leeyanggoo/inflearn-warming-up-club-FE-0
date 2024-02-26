(function () {
  const quiz = document.querySelector('#quiz');
  const btnWrap = document.querySelector('#quiz-btn-wrap');
  const nextBtnWrap = document.querySelector('#next-btn-wrap');
  const operatorArray = ['+', '-', '*'];
  const emoji = document.querySelector('#emoji');

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

    // 오답 3개 만들기
    const wrongArray = makeWrongAnswer(correct);
    for (let i = 0; i < 4; i++) {
      const btn = document.createElement('button');
      btn.innerText = wrongArray[i];
      btnWrap.appendChild(btn);
    }
  }

  function makeWrongAnswer(correct) {
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

  function makeEvent() {
    btnWrap.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const answer = Number(e.target.innerText);
        const quizArray = quiz.innerHTML.split(' ');

        // 정답 계산(배열 값의 타입이 문자열이라 숫자로 변환)
        const correct = calculator(
          Number(quizArray[0]),
          Number(quizArray[2]),
          quizArray[1]
        );

        // 정답 여부에 따른 리턴
        if (answer === correct) {
          document.body.style.backgroundColor = 'lightgreen';
          emoji.innerText = '😎';
        } else {
          document.body.style.backgroundColor = 'lightcoral';
          emoji.innerText = '😭';
        }

        // 버튼 공통
        btnWrap.childNodes.forEach((btn) => {
          const btnNumber = Number(btn.innerText);
          if (btnNumber === correct) {
            btn.style.backgroundColor = 'lightgreen';
          } else {
            btn.style.backgroundColor = 'lightcoral';
          }

          btn.setAttribute('disabled', true);
        });

        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next';
        nextBtn.addEventListener('click', () => {
          document.body.style.backgroundColor = 'lightgray';
          makeQuiz();
        });
        nextBtnWrap.appendChild(nextBtn);
      }
    });
  }

  makeQuiz();
  makeEvent();
})();
