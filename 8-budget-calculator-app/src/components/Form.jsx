import React, { useEffect, useRef, useState } from "react";

const Form = ({
  inputStyle,
  buttonStyle,
  setBudgetList,
  currentBudget,
  setCurrentBudget,
  setHandleStatus,
}) => {
  // console.log(`Form`);
  const budgetNameRef = useRef();
  const [budgetName, setBudgetName] = useState("");
  const [budgetCost, setBudgetCost] = useState(0);

  const { isEdit, budget } = currentBudget;

  useEffect(() => {
    if (isEdit) {
      setBudgetName(budget.name);
      setBudgetCost(budget.cost);
      budgetNameRef.current.focus();
    }
  }, [isEdit]);

  const handleBudgetSubmit = (e) => {
    const newBudget = {
      id: Date.now(),
      name: budgetName,
      cost: budgetCost,
    };

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

    setBudgetName("");
    setBudgetCost(0);
  };

  const handleBudgetNameChange = (e) => setBudgetName(e.target.value);
  const handleBudgetCostChange = (e) =>
    setBudgetCost(parseInt(e.target.value || 0));

  const isFormFilled = budgetName && budgetCost ? true : false;

  return (
    <div className="flex flex-col items-start justify-center w-full gap-5">
      <div className="flex flex-row items-center justify-between w-full gap-5">
        <div className="flex flex-col w-1/2 gap-3">
          <label
            htmlFor="budget-name"
            className="text-lg font-semibold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="budget-name"
            name="budget-name"
            className={inputStyle}
            onChange={handleBudgetNameChange}
            value={budgetName}
            ref={budgetNameRef}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-3">
          <label
            htmlFor="budget-cost"
            className="text-lg font-semibold text-gray-700"
          >
            Cost
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            id="budget-cost"
            name="budget-cost"
            className={inputStyle}
            onChange={handleBudgetCostChange}
            value={budgetCost}
          />
        </div>
      </div>
      <button
        className={buttonStyle}
        disabled={!isFormFilled}
        onClick={handleBudgetSubmit}
      >
        {isEdit ? "Edit ✔" : "Submit ✔"}
      </button>
    </div>
  );
};

export default Form;
