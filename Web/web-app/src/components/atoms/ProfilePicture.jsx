import React from "react";
import "./ProfilePicture.css";
import defaultPicture from "./defaultPicture.png";

const ProfilePicture = ({ src, alt, onClick, className, isProfile=false }) => {
  
  const handleError = (event) => {
    event.target.src = defaultPicture;
  };

  return (
    <img
      src={src}
      alt={alt}
      className={isProfile ?  className : "profile-pic"}
      onClick={onClick}
      onError={handleError}
    />
  );
};

export default ProfilePicture;