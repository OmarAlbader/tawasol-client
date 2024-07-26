import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../redux/modules/users";
import { showAlertMessage } from "../../redux/modules/alerts";

const Register = ({ isAuthenticated, register, showAlertMessage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    // Prevents the page from refreshing or reloading
    e.preventDefault();
    if (password !== password2) {
      showAlertMessage("Passwords do not match", "error");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="main register">
      <p className="form-title" align="center">
        Sign Up
      </p>
      <form className="form1" onSubmit={onSubmit}>
        <input
          className="input-text"
          type="text"
          name="name"
          placeholder="Name"
          align="center"
          value={name}
          onChange={onChange}
        />
        <input
          className="input-text"
          type="text"
          name="email"
          placeholder="Email"
          align="center"
          value={email}
          onChange={onChange}
        />
        <input
          className="input-text"
          type="password"
          name="password"
          placeholder="Password"
          align="center"
          value={password}
          onChange={onChange}
        />
        <input
          className="input-text"
          type="password"
          name="password2"
          placeholder="Confirm Password"
          align="center"
          value={password2}
          onChange={onChange}
        />
        <input
          className="btn btn-primary"
          type="submit"
          align="center"
          value="Register"
        />
        <p className="forgot" align="center">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  showAlertMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
  };
};

export default connect(mapStateToProps, { showAlertMessage, register })(
  Register
);
