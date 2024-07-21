import React, { Fragment } from "react";
import { TailSpin } from "react-loader-spinner";

const Spinner = () => (
  <Fragment>
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
