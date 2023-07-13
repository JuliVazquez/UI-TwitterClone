import Api from "../Api";
import { ToastAndroid } from "react-native";

const fetchTweets = async (setTweets) => {
  try {
    const response = await Api.getFollowingTweets();
    setTweets(response.data);
  } catch (error) {
    ToastAndroid.show(error,ToastAndroid.LONG);
  }
};

export default fetchTweets;
