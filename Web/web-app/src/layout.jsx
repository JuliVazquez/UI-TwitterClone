import React, { useState } from "react";
import "./layout.css";
import LogoutButton from "./components/atoms/logoutButton";
import Icon from "./components/atoms/icons/icons.jsx";
import SideBar from "./components/molecules/sideBar";
import UserButton from "./components/molecules/UserButton";
import TweetButton from "./components/atoms/TweetButton";
import SearchBar from "./components/molecules/SearchBar";
import PopUpTweetBox from "../src/components/molecules/PopUpTweetBox"
import UsersToFollow from "../src/components/organisms/UsersToFollow"

const Layout = ({ children }) => {
  const [showTweetPopup, setShowTweetPopup] = useState(false);

  const handleTweetClick = () => {
    setShowTweetPopup(true);
  };

  const handleCancelTweetPopUp = () => {
    setShowTweetPopup(false);
  };

  return (
    <div className="general-container">
      <div className="side-menu">
        <div className="buttons-list-menu">
          <div className="twitter-logo">
            <Icon name="Twitter" />
          </div>
          <SideBar button="Inicio" />
          <SideBar button="Explorar" />
          <SideBar button="Perfil" />          
          <TweetButton onClick={handleTweetClick} />
          <UserButton />
        </div>
      </div>

      <div className="center-box">{children}</div>
        <div className="sidebar">
          <div className="right-side-menu">
          <LogoutButton button="Log out" />
          <SearchBar />
          <UsersToFollow />
          </div>
        </div>

        {showTweetPopup && (
          <div className="tweet-popUp-form-overlay" onClick={handleCancelTweetPopUp}>
            <PopUpTweetBox onCancel={handleCancelTweetPopUp} />
          </div>
        )}

    </div>
  );
};

export default Layout;
