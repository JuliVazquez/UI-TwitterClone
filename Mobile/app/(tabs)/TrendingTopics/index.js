import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, BackHandler, ToastAndroid } from "react-native";
import Api from "../../Api";
import { Stack, useFocusEffect } from "expo-router";
import TweetPreview from "../../tweet/preview";
import { useRouter } from "expo-router";
import Header from "../../molecules/Header";

const TrendingTopics = () => {
  const navigation = useRouter();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.getTrendingTopics();
        setTweets(response.data);
      } catch (error) {
        ToastAndroid.show(error,ToastAndroid.LONG);
      }
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          header: (props) => (
            <Header navigation={navigation} text="Trending Topics" />
          ),
        }}
      />
      <FlatList
        data={tweets}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <TweetPreview tweet={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
});

export default TrendingTopics;
