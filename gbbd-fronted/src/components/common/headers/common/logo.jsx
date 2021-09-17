import React from "react";
import { Link } from "react-router-dom";
import "./logo.css";
function LogoImage(props) {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/icon/${props.logo}`}
        style={{ filter: "contrast(2.0)", margin: "auto" }}
        alt=""
        className="img-fluid logo-image"
      />
    </Link>
  );
}

export default LogoImage;
