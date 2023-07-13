import InputTweetBox from "../molecules/InputTweetBox";
import Api from "../../Api.jsx";
import TweetPreview from "../organisms/TweetPreview";
import getTweets from "./getTweets";
import "./homeScreen.css";

const HomeScreen = () => {
  const { tweets, isLoading, loggedUser } = getTweets(Api.getFollowingTweets);

  if (isLoading) {
    return (
      <div className="loading-container">
        <img
          src="https://arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/J6EOH7RVA5HLDODWGOVV22KUX4.gif"
          alt="Loading"
          className="loading-image"
        />
      </div>
    );
  }

  if (tweets.length === 0) {
    return <h1>No tweets found.</h1>;
  }

  return (
    <div>
      <h1> Inicio </h1>
      <InputTweetBox />
      {tweets.map((tweet) => (
        <TweetPreview
          key={tweet.id}
          tweet={tweet}
          loggedUserId={loggedUser.id}
        />
      ))}
    </div>
  );
};

export default HomeScreen;
