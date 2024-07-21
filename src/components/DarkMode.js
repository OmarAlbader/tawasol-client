import React, { useState, useEffect } from "react";

const DarkMode = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

  useEffect(() => {
    if (mode === "dark") {
      localStorage.setItem("mode", "dark");

      const lightElems = document.querySelectorAll(".light-theme");
      lightElems.forEach((elem) => {
        elem.classList.remove("light-theme");
        elem.classList.add("dark-theme");
      });
    } else {
      localStorage.setItem("mode", "light");

      const darkElems = document.querySelectorAll(".dark-theme");
      darkElems.forEach((elem) => {
        elem.classList.remove("dark-theme");
        elem.classList.add("light-theme");
      });
    }
  }, [mode]);

  const onChange = (e) => {
    localStorage.setItem("mode", e.target.checked ? "dark" : "light");

    if (e.target.checked) {
      setMode("dark");
      const lightElems = document.querySelectorAll(".light-theme");
      lightElems.forEach((elem) => {
        elem.classList.remove("light-theme");
        elem.classList.add("dark-theme");
      });
    } else {
      setMode("light");
      const darkElems = document.querySelectorAll(".dark-theme");
      darkElems.forEach((elem) => {
        elem.classList.remove("dark-theme");
        elem.classList.add("light-theme");
      });
    }
  };

  return (
    <>
      <div className="mode-container">
        <div
          className="mode-click"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        ></div>
        <input
          type="checkbox"
          id="mode"
          onChange={onChange}
          checked={mode === "dark"}
        />
        <i id="sun" className="fas fa-sun" />
        <i id="moon" className="fas fa-moon" />
      </div>
    </>
  );
};

export default DarkMode;
