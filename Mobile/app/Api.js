import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const login = async(data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    const authorizationHeader = response.headers.authorization;
    await AsyncStorage.setItem("authorization_token", authorizationHeader);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
}

const register = async(data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
}
const loggedUser = async() => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: authorizationToken,
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

const usersToFollow = async() => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.get(`${API_URL}/user/usersToFollow`, {
      headers: {
        Authorization: authorizationToken,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

const getFollowingTweets = async() => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.get(`${API_URL}/user/followingTweets`, {
      headers: {
        Authorization: authorizationToken,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

const getUser = async(id) => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: authorizationToken,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data : error.message);
  }
}

const getTweet = async(id) => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.get(`${API_URL}/tweet/${id}`, {
      headers: {
        Authorization: authorizationToken,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data : error.message);
  }
}

const tweet = async(data) => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.post(`${API_URL}/tweet`, data, {
      headers: {
        Authorization: authorizationToken,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

const toggleFollow = async(id) => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.put(
      `${API_URL}/user/${id}/follow`,
      {},
      {
        headers: {
          Authorization: authorizationToken,
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

const searchTweets = async(search) => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.get(`${API_URL}/search/?text=${search}`, {
      headers: {
        Authorization: authorizationToken,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

const toggleLike = async(id) => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.put(
      `${API_URL}/tweet/${id}/like`,
      {},
      {
        headers: {
          Authorization: authorizationToken,
        },
      }
    );
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

const retweet = async(data, tweetId) => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.post(
      `${API_URL}/tweet/${tweetId}/retweet`,
      { content: data.content },
      {
        headers: {
          Authorization: authorizationToken,
        },
      }
    );
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

const reply = async(data, tweetId) => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.post(
      `${API_URL}/tweet/${tweetId}/reply`,
      { content: data.content, image: data.image }, // Include the `image` property in the request body
      {
        headers: {
          Authorization: authorizationToken,
        },
      }
    );
    return response;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data : error.message);
  }
}

const getTrendingTopics = async() => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    const response = await axios.get(`${API_URL}/trendingTopics`, {
      headers: {
        Authorization: authorizationToken,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export default{
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