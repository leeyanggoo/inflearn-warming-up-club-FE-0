import React from "react";

const List = ({
  list,
  setBudgetList,
  setCurrentBudget,
  currentBudget,
  setHandleStatus,
}) => {
  // console.log(`List`);
  const emojiButtonStyle =
    "hover:bg-gray-200 rounded-full p-1 disabled:cursor-not-allowed";

  const { id, name, cost } = list;
  const { isEdit } = currentBudget;

  const handleDelete = () => {
    setBudgetList((budgetList) => budgetList.filter((list) => list.id !== id));
    setHandleStatus({ type: "delete", message: "Delete Budget!" });
  };

  const handleEdit = () => {
    setCurrentBudget({
      isEdit: true,
      budget: list,
    });
    setHandleStatus({ type: "edit", message: "Editing..." });
  };

  return (
    <div className="w-full border-2 border-gray-200 py-2 px-5 rounded flex flex-row justify-between items-center">
      <span className="w-3/5">{name}</span>
      <span className="text-gray-500 w-1/5">{cost}</span>
      <div className="flex flex-row gap-2 justify-end items-center w-1/5">
        <button
          className={emojiButtonStyle}
          onClick={handleEdit}
          disabled={isEdit}
        >
          ✏
        </button>
        <button
          className={emojiButtonStyle}
          onClick={handleDelete}
          disabled={isEdit}
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default List;
