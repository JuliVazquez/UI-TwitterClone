import { useState, useEffect } from "react";
import Api from "../../Api.jsx";

function useTweets(apiFunction, ...args) {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [tweetsResponse, loggedUserResponse] = await Promise.all([
          apiFunction(...args),
          Api.loggedUser(),
        ]);

        if (Array.isArray(tweetsResponse.data)) {
          const sortedTweets = tweetsResponse.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );

          setTweets(sortedTweets);
        } else if (tweetsResponse.data) {
          setTweets([tweetsResponse.data]);
        }

        if (loggedUserResponse && loggedUserResponse.data) {
          setLoggedUser(loggedUserResponse.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiFunction, ...args]);

  return { tweets, isLoading, loggedUser };
}

export default useTweets;
