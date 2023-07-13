import Api from "../../Api.jsx";
import TweetPreview from "../organisms/TweetPreview";
import getTweets from "./getTweets";

const ExploreScreen = () => {
  const { tweets, isLoading, loggedUser } = getTweets(Api.getTrendingTopics);

  if (isLoading) {
    return <div>Loading tweets...</div>;
  }

  if (tweets.length === 0) {
    return <h1>No tweets found.</h1>;
  }

  return (
    <div>
      <h1>Trending Topics</h1>
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

export default ExploreScreen;
