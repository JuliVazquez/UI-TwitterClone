import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api";
import TweetPreview from "../organisms/TweetPreview";

const SearchResults = () => {
  const { searchText } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.searchTweets(searchText);
        const loggedUserResponse = await Api.loggedUser();
        setLoggedUser(loggedUserResponse.data);
        const tweets = response.data;
        const sortedTweets = tweets.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setSearchResults(sortedTweets);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [searchText]);

  return (
    <div>
      <h1>Resultados para la búsqueda "{searchText}"</h1>
      {searchResults.length > 0 ? (
        searchResults.map((tweet) => (
          <TweetPreview
            key={tweet.id}
            tweet={tweet}
            loggedUserId={loggedUser.id}
          />
        ))
      ) : (
        <h2>No hay resultados para la búsqueda</h2>
      )}
    </div>
  );
};

export default SearchResults;
