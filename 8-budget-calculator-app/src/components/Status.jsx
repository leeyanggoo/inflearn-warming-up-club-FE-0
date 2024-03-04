import React, { useCallback } from "react";

const Status = ({ handleStatus, setHandleStatus }) => {
  const { type, message } = handleStatus;

  const handleStyle = useCallback(() => {
    if (type === "edit") {
      return "text-gray-500 block";
    } else if (type === "none") {
      return "hidden";
    } else {
      setTimeout(() => {
        setHandleStatus({ type: "none", message: "" });
      }, 2000);
      if (type === "submit") {
        return "text-green-400 block";
      } else {
        return "text-red-400 block";
      }
    }
  }, [handleStatus]);

  return <span className={`${handleStyle()} font-bold`}>{message}</span>;
};

export default Status;
