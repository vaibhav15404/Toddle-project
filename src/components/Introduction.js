import React from "react";
import "./Introduction.css";

import { Link } from "react-router-dom";
const Introduction = () => {
  return (
    <div className="content">
      <h className="heading">Your Teaching Partner</h>
      <div className="grad">
        <span className="left-img"></span>
        <h className="gradient-text">Now with AI</h>
        <span className="right-img"></span>
      </div>
      <p className="text">
        At Toddle, we are revolutionising the way teachers work. With Toddle AI,
        we are taking a giant leap forward in our commitment to provide all
        teachers with the tools they need to deliver progressive, future-ready
        education.
      </p>

      <Link className="coursebtn" to="/Courses">
        Courses
      </Link>

      <p className="footer">Made with ❣️ by Vaibhav Rajput</p>
    </div>
  );
};

export default Introduction;
