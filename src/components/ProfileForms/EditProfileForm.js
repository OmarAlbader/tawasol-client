import React, { Fragment, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
} from "../../redux/modules/profiles";

const initialState = {
  company: "",
  website: "",
  location: "",
  country: "",
  status: "",
  skills: "",
  bio: "",
  twitter: "",
  facebook: "",
  youtube: "",
  linkedin: "",
  instagram: "",
  github: "",
};

const ProfileForm = ({
  profiles: { profile, loading },
  users: { user },
  history,
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
}) => {
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [other, setOther] = useState(false);
  const [data, setData] = useState(null);

  const statusOptions = [
    "Developer",
    "Junior Developer",
    "Senior Developer",
    "Manager",
    "Student",
    "Instructor",
    "Intern",
  ];

  useEffect(() => {
    if (!profile || profile.user._id !== user._id) {
      getCurrentProfile();
    }

    // if (profile && !loading) {
    //   const profileData = { ...profile };
    //   setFormData(profileData);
    // }
  }, [getCurrentProfile, profile, loading, user]);

  useEffect(() => {
    if (!loading && profile && profile.user._id === user._id) {
      if (statusOptions.every((option) => option !== profile?.status)) {
        setOther(true);
      }

      setFormData({
        company: profile.company,
        website: profile.website,
        location: profile.location,
        country: profile.country,
        status: profile.status,
        skills: profile.skills,
        bio: profile.bio,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedin: profile.social.linkedin,
        youtube: profile.social.youtube,
        instagram: profile.social.instagram,
        github: profile.social.github,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, loading, user]);

  const {
    company,
    website,
    location,
    country,
    status,
    skills,
    bio,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
    github,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    uploadProfileImage(data);
    createProfile(formData, history, profile ? true : false);
  };

  const onFileChange = (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    setData(data);
  };

  const onChange = (e) => {
    if (e.target.name === "status") {
      if (e.target.value === "Other") setOther(true);
      else {
        setOther(false);
      }
    }

    if (e.target.name === "Other") {
      setFormData({ ...formData, status: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="main">
      <p className="form-title">Edit Profile</p>
      <small>* = required field</small>
      <form className="form1" onSubmit={onSubmit}>
        <div className="form-group">
          <select
            name="status"
            value={other ? "Other" : status}
            onChange={onChange}
          >
            <option value="" disabled>
              * Select Professional Status
            </option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {other && (
          <div>
            <input
              type="text"
              name="Other"
              placeholder="Professional Status"
              value={status === "Other" ? "" : status}
              onChange={onChange}
            />
          </div>
        )}
        <div className="form-group">
          <input type="file" onChange={onFileChange}></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
        </div>

        <div>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Social Networks
          </button>
        </div>

        {displaySocialInputs ? (
          <Fragment>
            <div>
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div>
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div>
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div>
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-github fa-2x" />
              <input
                type="text"
                placeholder="GitHub URL"
                name="github"
                value={github}
                onChange={onChange}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment />
        )}

        <input type="submit" className="btn btn-primary"></input>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  users: state.users,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
})(ProfileForm);
