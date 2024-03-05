import React, { memo } from "react";

const List = memo(
  ({
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
      setBudgetList((budgetList) =>
        budgetList.filter((list) => list.id !== id)
      );
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
      <div className="flex flex-row items-center justify-between w-full px-5 py-2 border-2 border-gray-200 rounded">
        <span className="w-3/5">{name}</span>
        <span className="w-1/5 text-gray-500">{cost}</span>
        <div className="flex flex-row items-center justify-end w-1/5 gap-2">
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
  }
);

export default List;
