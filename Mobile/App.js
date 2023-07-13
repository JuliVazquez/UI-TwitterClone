import { BackHandler} from "react-native";
import { SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import styles from './app/Styles.js'
import Login from "./src/components/screens/Login";
import Register from "./src/components/screens/Register";
import Profile from "./src/components/screens/Profile";
import Home from "./src/components/screens/Home";
import Search from "./src/components/screens/Search";
import ProfilePicture from "./app/molecules/ProfilePicture.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerLeft: () => <ProfilePicture /> }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ headerLeft: () => <ProfilePicture /> }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.app_root}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: "white",
            headerStyle: { backgroundColor: "black" },
            headerTitleAlign: "center",
            headerTitle: null,
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTitle: (props) => <ProfilePicture {...props} />,
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerTitle: (props) => <ProfilePicture {...props} />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
