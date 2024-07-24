import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentProfile } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import defaultImg from "../assets/default.png";

function Sidebar({ users: { user }, getCurrentProfile }) {
  const [image, setImage] = useState("");
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    if (user) {
      setImage(getProfileImage(user._id));
    }
  }, [getCurrentProfile, user]);

  function onError() {
    if (!errored) {
      setErrored(true);
      setImage(defaultImg);
    }
  }

  const location = useLocation();
  return (
    <div>
      <div className="sidebar" id="sidebar">
        <div className="pfp-circle">
          <Link to="/home">
            <img
              src={image || setImage(defaultImg)}
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
        {/* // Todo: add logout on mobiles below settings */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getCurrentProfile })(Sidebar);
