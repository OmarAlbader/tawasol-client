import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";

let scrollPos = 0;
let scrollDownCount = 0;

window.addEventListener("scroll", function () {
  if (document.body.getBoundingClientRect().top > scrollPos) {
    document.getElementById("navbar").style.top = "0";
    document.getElementById("navbar").style.borderBottomWidth = "3px";

    if (document.getElementById("sidebar") !== null) {
      document.getElementById("sidebar").style.top = "55px";

      document.getElementById("settings").style.bottom = "75px";
    }
    // Scrolling UP
    scrollDownCount = document.body.getBoundingClientRect().top;
  } else {
    // scroll down twice will run if statement code below
    if (scrollDownCount - document.body.getBoundingClientRect().top >= 150) {
      document.getElementById("navbar").style.top = "-68px";

      if (document.getElementById("sidebar") !== null) {
        document.getElementById("sidebar").style.top = "0";

        document.getElementById("settings").style.bottom = "20px";
      }
      // Scrolling DOWN
    }
  }

  scrollPos = document.body.getBoundingClientRect().top;
});

const Private = ({
  component: Component,
  users: { isAuthenticated, loading },
}) => {
  useEffect(() => {
    const containers = document.querySelectorAll(".containter");
    containers.forEach((container) => {
      container.classList.add("light-theme");
    });
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Fragment>
          <Sidebar />
          <Component />
        </Fragment>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Private);
