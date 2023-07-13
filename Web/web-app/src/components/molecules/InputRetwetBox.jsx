import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InputRetweetBox.css";
import Api from "../../Api.jsx";
import ProfilePicture from "../atoms/ProfilePicture.jsx";

const InputRetweetBox = ({ onCancel, tweetId }) => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);
  const [ownerTweet, setOwnerTweet] = useState(null);
  const [data, setData] = useState({ content: "" });
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const loggedUser = await Api.loggedUser();
        setLoggedUser(loggedUser.data);
        const tweet = await Api.getTweet(tweetId);
        setOwnerTweet(tweet.data.user.id);
      } catch (error) {
        console.log("error: ", error.message);
      }
    })();
  }, [tweetId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isOwnerTweet) {
      setShowWarning(true);
      return;
    }

    Api.retweet(data, tweetId)
      .then((response) => {
        setData({ content: "" });
        navigate(`/tweet/${response.data.id}`);
        onCancel();
      })
      .catch((error) => {
        console.log("error: ", error.message);
      });
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onCancel();
    setShowWarning(false);
  };

  const isOwnerTweet = ownerTweet === (loggedUser && loggedUser.id);

  return (
    <div className="input-retweet-box-container">
      <div className="input-retweet-box" onClick={handleFormClick}>
        <button class="close-button" onClick={handleClose}>X</button>
        {!isOwnerTweet && (
          <div className="input-retweet-box__profile">
            {loggedUser && (
              <ProfilePicture src={loggedUser.image} alt="Profile" />
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isOwnerTweet ? (
            <div className="input-retweet-box__warning">
              No se puede retwittear un tweet propio
            </div>
          ) : (
            <textarea
              className="input-retweet-box__textarea"
              placeholder="Añade un comentario..."
              name="content"
              value={data.content}
              onChange={handleInputChange}
              autoFocus
            ></textarea>
          )}
          {!isOwnerTweet && !showWarning && (
            <div className="input-retweet-box__actions">
              <div className="input-retweet-box__buttons">
                <button className="input-retweet-box__button" type="submit">
                  Retwittear
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default InputRetweetBox;
