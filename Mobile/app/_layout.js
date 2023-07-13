import React from "react";
import { Stack, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

const HomeLayout = ()=> {
  const navigation = useRouter();
  const isLogged = AsyncStorage.getItem("@storage_Key");

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authorization_token");
      navigation.push({ pathname: "/Login" });
    } catch (error) {
      ToastAndroid.show("Error al cerrar sesión: "+error,ToastAndroid.LONG);
    }
  };

  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#FFFF",
        headerTitleAlign: "center",
        headerTitle: () => <Feather name="twitter" size={24} color="white" />,
        headerRight: () => {
          return (
            isLogged && (
              <Feather
                name="log-out"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
                onPress={handleLogout}
              />
            )
          );
        },
      }}
    />
  );
}
export default HomeLayout;
