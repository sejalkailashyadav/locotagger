import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/", text: "Create Form" },
  { to: "/show", text: "Show" },
];

const NavBar = (props) => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navLinks.map((link, index) => (
                  <Link to={link.to} key={index}>
                    {link.text}
                  </Link>
                ))}
                <button
                  onClick={props.toggleDarkMode}
                  className={`self-left justify-self-end ${
                    props.darkMode ? "dark" : ""
                  }`}
                >
                  {props.darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
