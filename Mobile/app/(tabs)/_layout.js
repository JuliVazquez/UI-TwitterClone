import React, { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { ToastAndroid, Image } from "react-native";
import { Feather } from "react-native-vector-icons";
import fetchUserData from "../functions/fetchUserData";

const AppLayout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        fetchUserData(setUser);
      } catch (error) {
        ToastAndroid.show(error,ToastAndroid.LONG);
      }
    })();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabContainer,
        tabBarLabelStyle: styles.tabBarText,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Feather
              name="home"
              size={24}
              color="white"
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Búsqueda",
          tabBarIcon: () => (
            <Feather
              name="search"
              size={24}
              color="white"
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Twitt"
        options={{
          title: "Twitt",
          tabBarIcon: () => (
            <Feather
              name="edit"
              size={24}
              color="white"
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TrendingTopics"
        options={{
          title: "Trending Topics",
          tabBarIcon: () => (
            <Feather
              name="hash"
              size={24}
              color="white"
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          href: {
            pathname: "/Profile",
            params: {
              id: `${user?.id}`,
            },
          },
          title: user?.username || "Perfil",
          tabBarIcon: () => (
            <Image
              source={{
                uri: user?.image || "https://i.imgur.com/lvxX1se.png",
              }}
              style={[styles.profilePicture, styles.tabBarIcon]}
            />
          ),
        }}
      />
    </Tabs>
  );
}
export default AppLayout;

const styles = {
  profilePictureContainer: {
    marginLeft: 10,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  tabContainer: {
    backgroundColor: "black",
  },
  tabBarText: {
    color: "white",
    fontWeight: "bold",
  },
};
