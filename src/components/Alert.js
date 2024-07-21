import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const Alert = ({ alert }) => {
  const showAlert = useAlert();
  useEffect(() => {
    // console.log("inside useEffect ", alert)
    if (alert.show) {
      //console.log("showing the alert...");
      showAlert.show(alert.msg, { type: alert.type });
    }
  });

  return <></>;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alerts,
  };
};

export default connect(mapStateToProps)(Alert);
