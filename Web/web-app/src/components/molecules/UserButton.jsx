import React, { useEffect, useState } from "react";
import Api from "../../Api.jsx";
import ProfilePicture from "../atoms/ProfilePicture.jsx";
import "./UserButton.css";
import { useNavigate } from "react-router-dom";

const UserButton = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.loggedUser();
        setLoggedUser(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleClick = () => {
      navigate("/user/" + loggedUser.id);
  }
  return (
    <div>
      {loggedUser && (
        <div className="user-button" onClick={handleClick}>
          <ProfilePicture src={loggedUser.image} alt={loggedUser.username} />
          <div className="user-info-side">
            <p className="username-side">{loggedUser.username}</p>
            <p className="id-side">@{loggedUser.id}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserButton;
