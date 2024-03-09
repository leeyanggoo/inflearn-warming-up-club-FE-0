import { googleLogout } from "@react-oauth/google";
import React, { useEffect, useState } from "react";

//
import { useNavigate } from "react-router-dom";

const Nav = ({ setIsLogin }) => {
  const [show, handleShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
    googleLogout();
  };

  return (
    <nav
      className={`${
        show && "bg-main"
      } fixed top-0 z-10 flex items-center justify-between w-full h-20 px-10 py-2 transition-all ease-in duration-500`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/archive/3/3e/20220128173228%21Disney%2B_logo.svg"
        alt="Disney Plus logo"
        onClick={() => {
          navigate("/");
          setSearchValue("");
        }}
        className="block object-contain cursor-pointer max-h-10"
      />

      <input
        value={searchValue}
        onChange={handleSearchChange}
        className={`w-1/5 p-2 bg-gray-600 bg-opacity-60 rounded`}
        type="text"
        placeholder="영화를 검색해주세요."
      />

      <div className="relative group">
        <img
          src={user.picture}
          alt="User Avatar"
          className="block object-contain rounded-full cursor-pointer max-h-10"
        />
        <button
          onClick={handleLogout}
          className="group-hover:opacity-100 transition-opacity absolute -bottom-[120%] -left-[100%] bg-blue-300 bg-opacity-30 px-3 py-2 rounded-md hover:outline-1 hover:outline-white hover:outline opacity-0"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
