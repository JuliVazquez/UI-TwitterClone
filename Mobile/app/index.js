import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "./Api";
import { BackHandler, ToastAndroid } from "react-native";


const Index = () => {
  const navigation = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("authorization_token")
      .then((isLogged) => {
        setIsLoggedIn(isLogged);
        if (isLoggedIn) {
          Api.loggedUser()
            .then((response) => {
              navigation.push({
                pathname: "/Home",
                params: { loggedUser: response.data.id },
              });
            })
            .catch((error) => {
              ToastAndroid.show(error,ToastAndroid.LONG);
            });
        } else {
          navigation.replace("/Login");
        }
      })
      .catch((error) => {
        ToastAndroid.show(error,ToastAndroid.LONG);
      });

    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return null;
};

export default Index;
