import React from "react";
import "./TweetButton.css";


  const TweetButton = ({ onClick }) => {
    return (
      <div className="tweet-button" role="button" onClick={onClick}>
          Tweetear
      </div>
    );
  };


export default TweetButton;