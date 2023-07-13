import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useTweets from "./getTweets";
import Api from "../../Api";
import "./UserScreen.css";
import TweetPreview from "../organisms/TweetPreview";
import "./tweetPage.css";

const TweetPage = () => {
  const { tweetId } = useParams();
  const { tweets, isLoading, loggedUser } = useTweets(Api.getTweet, tweetId);
  const [replies, setReplies] = useState([]);
  const [originalTweet, setOriginalTweet] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (tweets.length > 0) {
          const tweet = tweets[0];

          const updatedReplies = tweet.replys.map((reply) => ({ ...reply }));

          const originalTweet = tweet.type.tweet;
          setOriginalTweet(originalTweet);

          setReplies(updatedReplies);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [tweets]);

  const onReplySubmitted = async (newReply) => {
    setReplies((prevReplies) => [
      ...prevReplies,
      { ...newReply },
    ]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!tweets[0]) {
    return (
      <div>
        <h1>Tweet inexistente.</h1>
      </div>
    );
  }

  const tweet = tweets[0];

  const renderRepliedTweet = () => {
    if (tweet.strType === "Reply") {
      const repliedTweet = originalTweet;

      if (!repliedTweet) {
        return <div>Cargando tweet respondido...</div>;
      }

      return (
        <div>
          <h2>Tweet Respondido:</h2>
          <TweetPreview
            key={repliedTweet.id}
            tweet={repliedTweet}
            loggedUserId={loggedUser.id}
            onReplySubmitted={onReplySubmitted}
          />
        </div>
      );
    }
    return null;
  };

  const renderReplies = () => {
    return (
      replies.length > 0 && (
        <>
          <h2>Respuestas:</h2>
          {replies.map((reply) => (
            <TweetPreview
              key={reply.id}
              tweet={reply}
              loggedUserId={loggedUser.id}
              onReplySubmitted={onReplySubmitted}
            />
          ))}
        </>
      )
    );
  };

  return (
    <div>
      {renderRepliedTweet()}
      <TweetPreview
        key={tweet.id}
        tweet={tweet}
        loggedUserId={loggedUser.id}
        onReplySubmitted={onReplySubmitted}
      />
      {renderReplies()}
    </div>
  );
};

export default TweetPage;
