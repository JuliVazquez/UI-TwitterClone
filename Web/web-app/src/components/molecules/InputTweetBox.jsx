import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InputTweetBox.css";
import Api from "../../Api.jsx";
import ProfilePicture from "../atoms/ProfilePicture.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const InputTweetBox = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);
  const [data, setData] = useState({
    content: "",
    image: "",
  });
  const [showImageForm, setShowImageForm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    Api.tweet(data)
      .then((response) => {
        setData({
          content: "",
          image: "",
        });
        navigate(`/tweet/${response.data.id}`);
      })
      .catch((error) => {
        console.log("error : ", error.message);
      });
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImageSubmit = () => {
    const isValidUrl = validateImageUrl(imageUrl);
    if (isValidUrl) {
      setData({
        ...data,
        image: imageUrl,
      });
      setShowImageForm(false);
      setImageUrl("");
      setImageError("");
    } else {
      setImageError("URL no válida");
    }
  };

  const validateImageUrl = (url) => {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const extension = url.split(".").pop().toLowerCase();

    const isHttp = url.startsWith("http://");
    const isHttps = url.startsWith("https://");

    if (!isHttp && !isHttps) {
      return false;
    }

    return allowedExtensions.includes(extension);
  };

  return (
    <div className="input-tweet-box">
      <form onSubmit={handleSubmit}>
        <div className="input-tweet-box__input">
          <div className="input-tweet-box__profile">
            {loggedUser && (
              <ProfilePicture src={loggedUser.image} alt="Profile" />
            )}
            <textarea
              className="input-tweet-box__textarea"
              placeholder="Qué está pasando?"
              style={{ flex: "1" }}
              name="content"
              value={data.content}
              onChange={handleInputChange}
              required
              autoFocus
            ></textarea>
          </div>
        </div>

        <div className="input-tweet-box__actions">
          <button
            className="input-tweet-box__add-image-button"
            type="button"
            onClick={() => setShowImageForm(!showImageForm)}
          >
            <FontAwesomeIcon icon={faImage} />
            Add Image
          </button>
          {showImageForm && (
            <div className="input-tweet-box__image-form">
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={handleImageInputChange}
                autoFocus
              />
              <button type="button" onClick={handleImageSubmit}>
                OK
              </button>
              <button type="button" onClick={() => setShowImageForm(false)}>
                Cancel
              </button>
              {imageError && <p className="error-message">{imageError}</p>}
            </div>
          )}

          <button className="input-tweet-box__button" type="submit">
            Tweetear
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputTweetBox;
