import React, { memo } from "react";
import List from "./List";

const Lists = memo(
  ({
    buttonStyle,
    budgetList,
    setBudgetList,
    currentBudget,
    setCurrentBudget,
    setHandleStatus,
  }) => {
    // console.log(`Lists`);
    const handleDeleteAll = () => {
      setBudgetList([]);
      setHandleStatus({ type: "delete", message: "Delete All Budget!" });
    };
    const { isEdit } = currentBudget;
    const isDeleteAll = budgetList.length === 0 || isEdit;

    return (
      <div className="flex flex-col items-start justify-center gap-3">
        {budgetList.map((list) => (
          <List
            key={list.id}
            list={list}
            setBudgetList={setBudgetList}
            setCurrentBudget={setCurrentBudget}
            currentBudget={currentBudget}
            setHandleStatus={setHandleStatus}
          />
        ))}
        <button
          className={buttonStyle}
          onClick={handleDeleteAll}
          disabled={isDeleteAll}
        >
          Delete All 🗑
        </button>
      </div>
    );
  }
);
export default Lists;
