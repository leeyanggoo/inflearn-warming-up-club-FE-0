import React from "react";

const List = () => {
  const emojiButtonStyle = "hover:bg-gray-200 rounded-full p-1";
  return (
    <div className="w-full border-2 border-gray-200 py-2 px-5 rounded flex flex-row justify-between items-center">
      <span>교통비</span>
      <span className="text-gray-500">1000</span>
      <div className="flex flex-row gap-2 justify-center items-center">
        <button className={emojiButtonStyle}>✏</button>
        <button className={emojiButtonStyle}>🗑</button>
      </div>
    </div>
  );
};

export default List;
