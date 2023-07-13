import axios from "axios";

const API_URL = "http://localhost:7000";
const methods = {
  login,
  register,
  loggedUser,
  getFollowingTweets,
  getUser,
  getTweet,
  tweet,
  toggleFollow,
  searchTweets,
  toggleLike,
  retweet,
  getTrendingTopics,
  reply,
  usersToFollow,
};

async function login(data) {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    const authorizationHeader = response.headers["authorization_token"];
    localStorage.setItem("authorization_token", authorizationHeader);
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

async function register(data) {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

async function loggedUser() {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error.message);
    }
  }
}

async function usersToFollow() {
  try {
    const response = await axios.get(`${API_URL}/user/usersToFollow`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

async function getFollowingTweets() {
  try {
    const response = await axios.get(`${API_URL}/user/followingTweets`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

async function getUser(id) {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data : error.message);
  }
}

async function getTweet(id) {
  try {
    const response = await axios.get(`${API_URL}/tweet/${id}`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data : error.message);
  }
}

async function tweet(data) {
  try {
    const response = await axios.post(`${API_URL}/tweet`, data, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
async function toggleFollow(id) {
  try {
    const response = await axios.put(
      `${API_URL}/user/${id}/follow`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("authorization_token"),
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error.message);
    }
  }
}

async function searchTweets(search) {
  try {
    const response = await axios.get(`${API_URL}/search/?text=${search}`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

async function toggleLike(id) {
  try {
    const response = await axios.put(
      `${API_URL}/tweet/${id}/like`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("authorization_token"),
        },
      }
    );
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

async function retweet(data,tweetId) {
  try {
    const response = await axios.post(
      `${API_URL}/tweet/${tweetId}/retweet`,
      { content: data.content },
      {
        headers: {
          Authorization: localStorage.getItem("authorization_token"),
        },
      }
    );
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

async function reply(data, tweetId) {
  try {
    const response = await axios.post(
      `${API_URL}/tweet/${tweetId}/reply`,
      { content: data.content, image: data.image }, // Include the `image` property in the request body
      {
        headers: {
          Authorization: localStorage.getItem("authorization_token"),
        },
      }
    );
    return response;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data : error.message);
  }
}


async function getTrendingTopics() {
  try {
    const response = await axios.get(`${API_URL}/trendingTopics`, {
      headers: {
        Authorization: localStorage.getItem("authorization_token"),
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export default methods;
