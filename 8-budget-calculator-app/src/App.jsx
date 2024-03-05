import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";
import Status from "./components/Status";

function App() {
  // console.log(`App`);
  const inputStyle =
    "border-b-2 border-blue-500 focus:border-blue-300 transition";
  const buttonStyle =
    "px-5 py-1 bg-blue-600 rounded text-white hover:bg-blue-500 transition-all text-sm disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed";

  const [budgetList, setBudgetList] = useState(
    JSON.parse(localStorage.getItem("budgetList")) || []
  );
  const [currentBudget, setCurrentBudget] = useState({
    isEdit: false,
    budget: {},
  });

  const [handleStatus, setHandleStatus] = useState({
    type: "none",
    message: "",
  });

  useEffect(() => {
    localStorage.setItem("budgetList", JSON.stringify(budgetList));
  }, [budgetList]);

  const totalCost = useCallback(() => {
    return budgetList.reduce((acc, cur) => acc + cur.cost, 0);
  }, [budgetList]);

  return (
    <div className="flex items-center justify-center bg-blue-100 App w-dvw h-dvh">
      <div className="container flex flex-col justify-center gap-5">
        <header className="flex flex-row items-end justify-between">
          <div className="flex flex-row items-end gap-2">
            <h1 className="text-3xl font-extrabold">💸 Budget Calculator</h1>
            <Status
              handleStatus={handleStatus}
              setHandleStatus={setHandleStatus}
            />
          </div>
          <strong className="text-lg font-extrabold">
            Total Cost : {totalCost()} ₩
          </strong>
        </header>
        <main className="flex flex-col gap-5 p-5 bg-white">
          <Form
            inputStyle={inputStyle}
            buttonStyle={buttonStyle}
            setBudgetList={setBudgetList}
            currentBudget={currentBudget}
            setCurrentBudget={setCurrentBudget}
            setHandleStatus={setHandleStatus}
          />
          <hr className="border border-gray-200" />
          <Lists
            buttonStyle={buttonStyle}
            budgetList={budgetList}
            setBudgetList={setBudgetList}
            currentBudget={currentBudget}
            setCurrentBudget={setCurrentBudget}
            setHandleStatus={setHandleStatus}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
