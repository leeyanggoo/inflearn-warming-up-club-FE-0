#### [인프런 워밍업 클럽 FE 0기] 미션7 - 예산 계산기 앱

# 💸 Budget Calculator APP

- [Inflearn Blog](https://www.inflearn.com/blogs/7104)

## Demo

![Alt text](/8-budget-calculator-app/src/img/budget-calculator-app.gif)

Record by [ScreenToGif](https://www.screentogif.com/)

## 개요

- **인프런 워밍업 클럽 FE 0기**의 일곱 번째 미션인 '예산 계산기 앱' 입니다.
- [따라하며 배우는 리액트](https://www.inflearn.com/course/따라하는-리액트) 섹션 0~3(To-Do 앱)

## 목표

- **의존성 배열(Dependency Array)** 을 이용해 함수 실행하기
- **state** 를 전역 변수처럼(?) 사용해보기

## 구현

> 구조

```
|-- App
|  |-- Form
|  |-- Lists
|  |  |-- List
```

<br />

> **의존성 배열(Dependency Array)** 을 이용해 함수 실행하기

```jsx
// App.jsx
const [budgetList, setBudgetList] = useState(
  JSON.parse(localStorage.getItem("budgetList")) || []
);

useEffect(() => {
  localStorage.setItem("budgetList", JSON.stringify(budgetList));
}, [budgetList]);

const totalCost = useCallback(() => {
  return budgetList.reduce((acc, cur) => acc + cur.cost, 0);
}, [budgetList]);
```

최상위 컴포넌트인 `<App>` 컴포넌트에서 만든 'budgetList'이라는 state를 useEffect와 useCallback의 의존성 배열에 추가했다.

useEffect에서는 해당 state가 변경되면 로컬 스토리지의 budgetList를 최근의 리스트로 변경한다.

이렇게 하면 일일이 setBudgetList가 호출되는 곳마다 함수를 사용하지 않아도 된다.

다음은 예산의 총 금액을 반환하는 함수가 리스트가 변경될 때마다 실행되도록 useCallback으로 감싸고 의존성 배열에 state를 추가했다.

```jsx
// Form.jsx
const budgetNameRef = useRef();
const [budgetName, setBudgetName] = useState("");
const [budgetCost, setBudgetCost] = useState(0);

useEffect(() => {
  if (isEdit) {
    setBudgetName(budget.name);
    setBudgetCost(budget.cost);
    budgetNameRef.current.focus();
  }
}, [isEdit]);
```

`<Form>` 컴포넌트에서는 useEffect에 'isEdit'이라는 state를 의존성 배열에 추가했다.

사용자가 예산을 수정하기 위해 list의 Edit 버튼을 클릭하면 해당 budget의 name과 cost를 최근 state로 불러오고, useRef를 이용해 name을 입력하는 `<input>` 요소에 focus 상태가 되도록 했다.

<br />

> **state** 를 전역 변수처럼(?) 사용해보기

```jsx
// App.jsx
const [currentBudget, setCurrentBudget] = useState({
  isEdit: false,
  budget: {},
});

// List.jsx
const handleEdit = () => {
  setCurrentBudget({
    isEdit: true,
    budget: list,
  });
  setHandleStatus({ type: "edit", message: "Editing..." });
};

// Form.jsx
const handleBudgetSubmit = (e) => {
  const newBudget = {
    id: Date.now(),
    name: budgetName,
    cost: budgetCost,
  };

  // isEdit의 값에 따라 새로 추가할지 수정할지 결정
  if (isEdit) {
    setBudgetList((prevBudgetList) => {
      const newBudgetLists = [...prevBudgetList];
      const index = newBudgetLists.findIndex(({ id }) => id === budget.id);
      newBudgetLists[index] = newBudget;
      return newBudgetLists;
    });
    setCurrentBudget({ isEdit: false, budget: {} });
    setHandleStatus({ type: "submit", message: "Edit Success!" });
  } else {
    setBudgetList((prevBudgetLists) => [...prevBudgetLists, newBudget]);
    setHandleStatus({ type: "submit", message: "Submit Success!" });
  }

  // submit 종료 시 input의 데이터를 초깃값으로 설정
  setBudgetName("");
  setBudgetCost(0);
};
```

배웠던 To Do 앱은 List의 Edit 버튼을 클릭했을 때 해당 List의 요소를 input 요소로 변경시키고 수정을 했다.

하지만 과제는 클릭을 했을 때 List의 요소를 변경시키는 게 아니라 Form의 input에 해당 예산의 데이터를 전달해야 했다.

그래서 마치 전역 변수처럼 사용할 'currentBudget'이라는 state를 생성하고 'isEdit'이라는 boolean 값과 수정할 예산의 데이터를 담을 'budget'이라는 값을 설정했다.

'isEdit'의 상태 값이 true일 때 수정하기와 삭제하기 `<button>` 요소를 disabled로 변경한다.

또한 submit 함수는 새로운 입력 값을 budgetList에 추가하지 않고 해당 예산의 index를 찾아 수정하고 리스트를 변경한다.

이렇게 하니 onSubmit과 onEdit 처럼 비슷한 기능을 하는 함수를 여러 개 만들지 않아도 되었다.

<br />

#### ⚠️ setTimeout 렌더링

```jsx
const { type, message } = handleStatus;

const handleStyle = useCallback(() => {
  if (type === "edit") {
    return "text-gray-500 block";
  } else if (type === "none") {
    return "hidden";
  } else {
    // 2초 뒤에 실행 --> App - Form - Status 1번 더 렌더링
    setTimeout(() => {
      setHandleStatus({ type: "none", message: "" });
    }, 2000);
    if (type === "submit") {
      return "text-green-400 block";
    } else {
      return "text-red-400 block";
    }
  }
}, [type]);
```

추가, 삭제, 수정의 완료 및 진행 중 상태를 보여주는 `<Status>` 컴포넌트를 만들었다.

App에서 만든 'handleStatus'라는 state를 전달하고 메세지가 나타난 뒤에 사라지게 만들고 싶어서 `setTimeout()` 메서드를 이용해 2초 뒤에 상태를 초기화했다.

하지만 이 상태가 App과 Form 컴포넌트에서 참고하다 보니 나타나고 사라질 때마다 렌더링이 발생했다.

CSS의 opacity로 처리하기엔 state의 값을 변경해야 했기에 알맞는 방법은 아니라 생각했다.

뭔가 `<Status>` 컴포넌트 내부에서만 렌더링이 일어나게 하고 싶었는데 아직 다른 방법을 찾지 못했다.

😢😢😢

## 회고

다른 컴포넌트의 클릭 이벤트로 변경된 state를 이용하는 부분이 생각보다 오래 걸렸다.

처음엔 콜백 함수처럼 App 컴포넌트에서 함수 만들고 prop으로 넘겨봤지만 List와 Form은 종속적인 관계가 아니라 힘들었다. 😢

그래서 생각해낸 게 state를 이용해서 상태의 변경을 이벤트처럼 사용하는 것이었다.

pub-sub 혹은 observer 패턴 같다는 생각도 했지만, 이렇게 최상위에서 선언한 state가 이곳저곳 돌아다니는 게 좋은 방법은 아닐 것 같다는 생각이 들었다.

규모가 커지면 렌더링 관리도 힘들고 props를 쫓아다녀야 하기 때문이다.

이래서 상태 관리 라이브러리가 나왔나 보다. 🤔
