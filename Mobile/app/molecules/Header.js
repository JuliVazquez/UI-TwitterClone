import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, ToastAndroid } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = ({ navigation, text, showBackButton = false }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("authorization_token");
        setIsLoggedIn(token !== null);
      } catch (error) {
        ToastAndroid.show("Error al verificar el estado de inicio de sesión: "+error, ToastAndroid.LONG);
      }
    })();
  }, []);

  const handleBackPress = () => {
    navigation.back();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authorization_token");
      navigation.push({ pathname: "/Login" });
    } catch (error) {
      ToastAndroid.show("Error al cerrar sesión: "+error, ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={styles.headerContainer}>
        {showBackButton && (
          <Feather
            name="arrow-left"
            size={24}
            color="white"
            style={styles.headerIcon}
            onPress={handleBackPress}
          />
        )}
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{text}</Text>
        </View>
        <View style={styles.headerTitleContainer}>
          <Feather
            name="twitter"
            size={24}
            color="white"
            style={styles.twitterIcon}
          />
        </View>
        {isLoggedIn && (
          <Feather
            name="log-out"
            size={24}
            color="white"
            style={styles.headerIcon}
            onPress={handleLogout}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    padding: 8,
    paddingTop: StatusBar.currentHeight,
  },
  headerIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    marginLeft: 5,
  },
  twitterIcon: {
    marginRight: 100,
  },
});

export default Header;
