import React from "react";
import List from "./List";

const Lists = ({ buttonStyle }) => {
  return (
    <div className="flex flex-col items-start justify-center gap-3">
      <List />
      <List />
      <List />
      <List />
      <List />
      <button className={buttonStyle}>목록 지우기 🗑</button>
    </div>
  );
};

export default Lists;
