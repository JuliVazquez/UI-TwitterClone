import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

const isLoggedUser = async () => {
  try {
    const authorizationToken = await AsyncStorage.getItem(
      "authorization_token"
    );
    return authorizationToken;
  } catch (error) {
    ToastAndroid.show(error,ToastAndroid.LONG);
    return false;
  }
};

export default isLoggedUser;
