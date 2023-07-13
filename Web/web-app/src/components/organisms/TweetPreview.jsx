import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../atoms/ProfilePicture";
import Api from "../../Api.jsx";
import "./TweetPreview.css";
import InputReplyBox from "../molecules/InputReplyBox";
import InputRetweetBox from "../molecules/InputRetwetBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const TweetPreview = ({
  tweet,
  loggedUserId,
  itsRetweeted,
  onReplySubmitted,
}) => {
  const navigate = useNavigate();
  const [timeAgo, setTimeAgo] = useState("");
  const [showRepliesForm, setShowRepliesForm] = useState(false);
  const [showRetweetForm, setShowRetweetForm] = useState(false);
  const [likesCount, setLikesCount] = useState(tweet.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [strType, setStrType] = useState("");
  const [retweetedTweet, setRetweetedTweet] = useState(null);

  const replyFormRef = useRef();

  useEffect(() => {
    setRetweetedTweet(tweet.type.tweet);
    const date = new Date(tweet.date);
    const timeDifference = new Date() - date;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const dateFormatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const handleOutsideClick = (event) => {
      if (
        replyFormRef.current &&
        !replyFormRef.current.contains(event.target) &&
        event.target.className !== "input-reply-box__cancel-button"
      ) {
        setShowRepliesForm(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    if (days > 0) {
      setTimeAgo(`${dateFormatted}`);
    } else if (hours > 0) {
      setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`);
    } else {
      setTimeAgo(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
    }
    setIsLiked(
      tweet.likes.find((like) => like.id === loggedUserId) !== undefined
    );
    setStrType(tweet.strType);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [tweet.date, loggedUserId, tweet.likes, tweet.strType, tweet.type.tweet, showRepliesForm, showRetweetForm]);

  const handleClick = (event) => {
    if (
      event.target.className === "box-tweet" ||
      event.target.className === "user-info" ||
      event.target.className === "content"
    ) {
      navigate("/tweet/" + tweet.id);
    } else if (event.target.className === "box-retweet" && retweetedTweet) {
      navigate("/tweet/" + retweetedTweet.id);
    }
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/user/${tweet.user.id}`);
  };

  const toggleLike = async () => {
    try {
      const response = await Api.toggleLike(tweet.id);
      const tweetResponse = response.data;
      setLikesCount(tweetResponse.likes.length);
      setIsLiked(
        tweetResponse.likes.find((like) => like.id === loggedUserId) !== undefined
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowRepliesForm = (event) => {
    event.preventDefault();
    setShowRepliesForm(true);
  };

  const handleShowRetweetForm = (event) => {
    event.preventDefault();
    setShowRetweetForm(true);
  };


  const handleCancelReply = () => {
    setShowRepliesForm(false);
  };

  const handleCancelRetweet = () => {
    setShowRetweetForm(false);
  };

  const renderRetweet = () => {
    if (tweet.strType === "Retweet" && !itsRetweeted) {
      if (retweetedTweet) {
        return (
          <div className="quote-tweet">
            <TweetPreview
              key={retweetedTweet.id}
              tweet={retweetedTweet}
              itsRetweeted={true}
            />
          </div>
        );
      } else {
        return <div>Loading retweeted tweet...</div>;
      }
    }
    return null;
  };

  return (
    <div
      className={itsRetweeted ? "box-retweet" : "box-tweet"}
      onClick={handleClick}
    >
      <a href={`/user/${tweet.user.id}`} onClick={handleProfileClick}>
        <ProfilePicture
          src={tweet.user.profilePic}
          alt={tweet.user.username + " profile pic"}
        />
      </a>
      <div className="tweet-info">
        <div className="user-info">
          <p className="username-tweet">{tweet.user.username}</p>
          <p className="user-id">@{tweet.user.id}</p>
          <div className="action-tweet">
            {strType === "Retweet" && (
              <p className="user-action">&nbsp;Ha Retwitteado</p>
            )}
            {strType === "Reply" && (
              <p className="user-action">&nbsp;Ha Respondido</p>
            )}
          </div>
          <p className="time-ago"> &nbsp;· {timeAgo}</p>
        </div>
        <p className="content">{tweet.content}</p>
        {tweet.type.image && (
          <img
            src={tweet.type.image}
            alt={`submitted by ${tweet.user.id}`}
            className="tweet-image"
          />
        )}
        {renderRetweet()}

        {!itsRetweeted && (
          <div className="tweet-stats">
            <button className="reply-button" onClick={handleShowRepliesForm}>
              <FontAwesomeIcon icon={faComment} />
              <span>&nbsp;{tweet.repliesAmount} Replies</span>
            </button>

            <button
              className="retweet-button custom-retweet-button"
              onClick={handleShowRetweetForm}
            >
              <FontAwesomeIcon icon={faRetweet} />
              <span>&nbsp;{tweet.reTweetAmount} Retweets</span>
            </button>

            <button
              className={`like-button ${isLiked ? "liked" : ""}`}
              onClick={toggleLike}
            >
              <span>
                <FontAwesomeIcon icon={faHeart} />
                {likesCount} Likes
              </span>
            </button>

            {showRepliesForm && (
              <div className="replies-form-overlay" onClick={handleCancelReply}>
                <InputReplyBox
                  onCancel={handleCancelReply}
                  tweetId={tweet.id}
                  onReplySubmitted={onReplySubmitted}
                />
              </div>
            )}

            {showRetweetForm && (
              <div
                className="retweet-form-overlay"
                onClick={handleCancelRetweet}
              >
                <InputRetweetBox
                  onCancel={handleCancelRetweet}
                  tweetId={tweet.id}
                  onReplySubmitted={onReplySubmitted}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetPreview;
