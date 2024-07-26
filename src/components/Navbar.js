import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/modules/users";

const menuClick = () => {
  const sidebar = document.getElementsByClassName("sidebar")[0];

  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-200px";
  } else {
    sidebar.style.left = "0px";
  }
};

const Navbar = ({ users: { isAuthenticated }, logout }) => {
  const location = useLocation();

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
        <Link id="logout" onClick={logout} to="/">
          Logout
        </Link>
        <span hidden={!isAuthenticated || location.pathname === "/"}>
          <i className="fas fa-bars" onClick={menuClick} />
        </span>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-navbar light-theme" id="navbar">
      <h1>
        <Link id="tawasol-logo" className="logo-navbar" to="/">
          TawaSol
        </Link>
      </h1>
      {/* //TODO: menu button for mobiles to show sidebar */}
      <Fragment>{isAuthenticated ? authlinks : links}</Fragment>
      <div
        id="X"
        style={isAuthenticated ? { width: "21px" } : { width: "61px" }}
      >
        X
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { logout })(Navbar);
