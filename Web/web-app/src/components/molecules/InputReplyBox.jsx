import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InputReplyBox.css";
import Api from "../../Api.jsx";
import ProfilePicture from "../atoms/ProfilePicture.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const InputReplyBox = ({ onCancel, tweetId, onReplySubmitted }) => {
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

    Api.reply(data, tweetId)
      .then((response) => {
        setData({
          content: "",
          image: "",
        });
        navigate(`/tweet/${response.data.id}`);
        onCancel();
        onReplySubmitted(response.data.replys[response.data.replys.length - 1]);
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

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onCancel();
  };

  return (
    <div className="input-reply-box-container">
      <div className="input-reply-box" onClick={handleFormClick}>
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <div className="input-reply-box__profile">
          {loggedUser && (
            <ProfilePicture src={loggedUser.image} alt="Profile" />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            className="input-reply-box__textarea"
            placeholder="Twittea tu respuesta"
            name="content"
            value={data.content}
            onChange={handleInputChange}
            required
            autoFocus
          ></textarea>

          <div className="input-reply-box__actions">
            <button
              className="input-reply-box__add-image-button"
              type="button"
              onClick={() => setShowImageForm(true)}
            >
              <FontAwesomeIcon icon={faImage} />
              Add Image
            </button>

            <div className="input-reply-box__buttons">
              <button className="input-reply-box__button" type="submit">
                Responder
              </button>
            </div>
          </div>

          {showImageForm && (
            <form className="input-reply-box__image-form">
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
            </form>
          )}
        </form>
      </div>
    </div>
  );
};

export default InputReplyBox;
