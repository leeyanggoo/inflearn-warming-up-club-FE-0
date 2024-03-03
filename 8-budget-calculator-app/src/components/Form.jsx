import React from "react";

const Form = ({ inputStyle, buttonStyle }) => {
  return (
    <form className="flex flex-col justify-center items-start gap-5 w-full">
      <div className="flex flex-row justify-between items-center gap-5 w-full">
        <div className="w-1/2 flex flex-col">
          <label
            htmlFor="item-name"
            className="text-gray-700 text-lg font-semibold"
          >
            지출 항목
          </label>
          <input
            type="text"
            id="item-name"
            name="item-name"
            className={inputStyle}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <label
            htmlFor="item-cost"
            className="text-gray-700 text-lg font-semibold"
          >
            비용
          </label>
          <input
            type="text"
            id="item-cost"
            name="item-cost"
            className={inputStyle}
          />
        </div>
      </div>
      <button className={buttonStyle}>제출 ✔</button>
    </form>
  );
};

export default Form;
