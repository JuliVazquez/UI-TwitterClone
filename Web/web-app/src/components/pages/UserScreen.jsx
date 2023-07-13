import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api";
import "./UserScreen.css";
import TweetPreview from "../organisms/TweetPreview";
import ProfilePicture from "../atoms/ProfilePicture";

const UserScreen = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.getUser(userId);
        setUser(response.data);
        const loggedUserResponse = await Api.loggedUser();
        setLoggedUser(loggedUserResponse.data);
        setIsFollowing(
          loggedUserResponse.data.following.some((obj) => obj.id === userId)
        );
        const sortedTweets = response.data.tweets.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTweets(sortedTweets);
        if (
          loggedUser &&
          loggedUser.following.some((obj) => obj.id === userId)
        ) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      } catch (error) {
        console.error(error.response);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, loggedUser]);

  const followersCount = user?.followers?.length?.toString() ?? "0";
  const followingCount = user?.following?.length?.toString() ?? "0";

  const handleFollow = async () => {
    try {
      await Api.toggleFollow(userId);
      const updateVisitedUser = await Api.getUser(userId);
      const updatedUser = updateVisitedUser.data;
      setUser(updatedUser);
      setIsFollowing(!isFollowing);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        setError(error.message);
      } else {
        console.error(error.message);
        setError(error.message);
      }
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div><h1>{error}.</h1></div>;
  }

  return (
    <div className="container-profile">
      <div className="user-profile">
        <img
          className="background-image"
          src={user?.backgroundImage}
          alt={`submitted by ${user?.id}`}
        />
        <ProfilePicture
          className="profile-picture"
          src={user?.image}
          isProfile={true}
        />
        <p className="username">{user?.username}</p>
        <p className="id-profile">@{user?.id}</p>
        <p className="followers">
          {followersCount} <i>followers</i>
        </p>
        <p className="following">
          {followingCount} <i>following</i>
        </p>
      </div>
      {loggedUser && loggedUser.id !== user.id && (
        <button
          className={`follow-button ${
            isFollowing ? "following-button" : "not-following-button"
          }`}
          onClick={handleFollow}
        ></button>
      )}
      <div className="user-tweets">
        {tweets.length === 0 ? (
          <h2>No tweets found.</h2>
        ) : (
          tweets.map((tweet) => (
            <TweetPreview
              key={tweet.id}
              tweet={tweet}
              loggedUserId={loggedUser.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserScreen;
