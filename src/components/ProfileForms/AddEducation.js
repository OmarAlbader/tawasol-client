import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../redux/modules/profiles";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
  });

  const { school, degree, fieldofstudy, from, to, current } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <div className="main">
      <p className="form-title">Add Education</p>
      <small>* = required field</small>
      <form className="form1" onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="* School"
            name="school"
            value={school}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div>
          <h3 style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
            From Date
          </h3>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div>
          <p style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            ></input>
            Current School
          </p>
        </div>
        <div>
          <h3 style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
            To Date
          </h3>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={current}
          />
        </div>
        <input type="submit" className="btn btn-primary" />
        <Link className="btn btn-light" id="back-btn" to="/home">
          Go Back
        </Link>
      </form>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
