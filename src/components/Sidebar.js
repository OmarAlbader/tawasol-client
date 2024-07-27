import { Link, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentProfile } from "../redux/modules/profiles";
import { logout } from "../redux/modules/users";
import { getProfileImage } from "../utils";
import defaultImg from "../assets/default.png";

function Sidebar({
  users: { user },
  profiles: { profile },
  getCurrentProfile,
  logout,
}) {
  const [pfpImage, setPfpImage] = useState("");
  const [errored, setErrored] = useState(false);
  const [sidebarLogout, setSidebarLogout] = useState(false);
  let image = useSelector((profile) => profile.image);

  useEffect(() => {
    getCurrentProfile();
    if (user) {
      setPfpImage(getProfileImage(user._id));
    }
  }, [getCurrentProfile, user]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1000px)").matches) {
      setSidebarLogout(true);
    } else {
      setSidebarLogout(false);
    }
  }, []);

  function onError() {
    if (!errored) {
      setErrored(true);
      setPfpImage(defaultImg);
    }
  }

  const location = useLocation();
  return (
    <div>
      <div className="sidebar" id="sidebar">
        <div className="pfp-circle">
          <Link to="/home">
            <img
              src={image || pfpImage || setPfpImage(defaultImg)}
              onError={onError}
              className="profile"
              alt=""
            />
          </Link>
        </div>
        <div
          className={`link-style${
            location.pathname === "/home" || location.pathname === "/home"
              ? " active"
              : ""
          }`}
        >
          <Link to="/home">Home</Link>
          <i className="fas fa-home-user" />
        </div>
        <div
          className={`link-style${
            location.pathname === "/posts" ? " active" : ""
          }`}
        >
          <Link to="/posts">Posts</Link>
          <i className="fas fa-images" />
        </div>
        <div
          className={`link-style${
            location.pathname === "/developers" ? " active" : ""
          }`}
        >
          <Link to="/developers">Developers</Link>
          <i className="fas fa-people-group" />
        </div>
        <div
          className={`link-style settings${
            location.pathname === "/settings" ||
            location.pathname === "/edit-profile"
              ? " active"
              : ""
          }`}
          id="settings"
        >
          <Link to="/settings">Settings</Link>
          <i className="fas fa-gear" />
        </div>
        <div
          className={"link-style"}
          id="sidebar-logout"
          hidden={!sidebarLogout}
        >
          <Link onClick={logout} to="/">
            Logout
          </Link>
        </div>
        {/* // Todo: add logout on mobiles below settings */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getCurrentProfile, logout })(Sidebar);
