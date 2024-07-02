import { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/modules/users";

const Navbar = ({ users: { isAuthenticated }, logout }) => {
  const links = (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const authlinks = (
    <ul>
      <li>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-navbar">
      <h1>
        <Link className="logo-navbar" to="/">
          TawaSol
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authlinks : links}</Fragment>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { logout })(Navbar);
