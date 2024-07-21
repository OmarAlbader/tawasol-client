import React, { Fragment } from "react";
import { TailSpin } from "react-loader-spinner";
// import spinner from "../assets/spinner.gif";

const Spinner = () => (
  <Fragment>
    {/* <img
      src={spinner}
      id="loaderImg"
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    ></img> */}
    <div id="loader">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="black"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    </div>
  </Fragment>
);

export default Spinner;
