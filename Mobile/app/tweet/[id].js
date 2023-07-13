import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, ToastAndroid } from "react-native";
import Api from "../Api";
import TweetPreview from "./preview";
import Header from "../molecules/Header";
import { useSearchParams, useRouter } from "expo-router";

const TweetDetails = () => {
  const { id } = useSearchParams();
  const [tweet, setTweet] = useState(null);
  const navigation = useRouter();
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.getTweet(id);
        const tweet = response.data;
        setTweet(tweet);
        setIsLoading(false);
        if (tweet && tweet.replys && tweet.replys.length > 0) {
          const updatedReplies = tweet.replys.map((reply) => ({ ...reply }));
          setReplies(updatedReplies);
        }
      } catch (error) {
        ToastAndroid.show(error,ToastAndroid.LONG);
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!tweet) {
    return (
      <View style={styles.container}>
        <Text>Tweet inexistente.</Text>
      </View>
    );
  }

  const renderRepliedTweet = () => {
    if (tweet.strType === "Reply") {
      const repliedTweet = tweet.type.tweet;
      if (!repliedTweet) {
        return <Text>Cargando tweet respondido..</Text>;
      }
      return (
        <View>
          <Text style={styles.header}>Tweet Respondido:</Text>
          <TweetPreview key={repliedTweet.id} tweet={repliedTweet} />
          <Text style={styles.header}>Tweet</Text>
        </View>
      );
    }
    return null;
  };

  const renderReplies = () => {
    if (replies.length > 0) {
      return (
        <>
          <Text style={styles.header}>Respuestas:</Text>
          <FlatList
            data={replies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TweetPreview key={item.id} tweet={item} />
            )}
          />
        </>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Header text="Tweet" showBackButton={true} navigation={navigation} />
      {renderRepliedTweet()}
      {tweet && <TweetPreview tweet={tweet} itsFullTweet={true} />}
      {renderReplies()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default TweetDetails;
