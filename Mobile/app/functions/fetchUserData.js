import Api from "../Api";
import { ToastAndroid } from "react-native";

const fetchUserData = async (setUser) => {
  try {
    const response = await Api.loggedUser();
    setUser(response.data);
  } catch (error) {
    ToastAndroid.show(error,ToastAndroid.LONG);
  }
};

export default fetchUserData;
