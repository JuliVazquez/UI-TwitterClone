import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api.jsx";
import "./UsersToFollow.css";

const UsersToFollow = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersToFollow();
  }, []);

  const fetchUsersToFollow = async () => {
    try {
      const response = await Api.usersToFollow();
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios a seguir:", error);
    }
  };

  const handleFollowClick = async (userId) => {
    try {
      await Api.toggleFollow(userId);
      fetchUsersToFollow();
    } catch (error) {
      console.error("Error al seguir al usuario:", error);
    }
  };

  return (
    <div className={users && users.length > 0 ? "users-to-follow-container" : ""}>
      {users && users.length > 0 && (
        <>
          <h2>A quién seguir</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <button className="follow-button-user-layout" onClick={() => handleFollowClick(user.id)}>
                  Seguir
                </button>
                <span onClick={() => navigate(`/user/${user.id}`)}>{user.username}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UsersToFollow;
