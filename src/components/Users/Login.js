import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../redux/modules/users";

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    // Prevents the page from refreshing or reloading
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="main login">
      <p className="form-title" align="center">
        Sign in
      </p>
      <form className="form1" onSubmit={onSubmit}>
        <input
          className="input-text"
          type="text"
          name="email"
          placeholder="Email"
          align="center"
          value={email}
          onChange={onChange}
          required
        />
        <input
          className="input-text"
          type="password"
          name="password"
          placeholder="Password"
          align="center"
          value={password}
          onChange={onChange}
          required
        />
        <input
          className="btn btn-primary"
          type="submit"
          align="center"
          value="Login"
        />
        <p className="forgot" align="center">
          New to TawaSol? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
  };
};

export default connect(mapStateToProps, { login })(Login);
