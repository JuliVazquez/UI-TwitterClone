import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, ToastAndroid } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import Header from "../../molecules/Header";
import Api from "../../Api";
import TweetPreview from "../../tweet/preview";
import TwitterButton from "../../molecules/TwitterButton";

const UserProfile = () => {
  const navigation = useRouter();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const { id } = useSearchParams();

  const toggleFollow = async () => {
    try {
      await Api.toggleFollow(user.id);
      const response = await Api.getUser(user.id);
      const userResponse = response.data;
      const isFollowing = userResponse.followers.some(
        (follower) => follower.id === loggedUser.id
      );
      setIsFollowing(isFollowing);
      setFollowers(userResponse.followers.length);
      setFollowing(userResponse.following.length);
      if (isFollowing) {
        ToastAndroid.show('Ahora sigues a '+user.username, ToastAndroid.LONG);
      } else {
        ToastAndroid.show('Ya no sigues a '+user.username, ToastAndroid.LONG);
      }
      
    } catch (error) {
      ToastAndroid.show(error,ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (!id || !id.startsWith("u_")) {
          return;
        }
        const response = await Api.getUser(id);
        const userResponse = response.data;
        const getLoggedUser = await Api.loggedUser();
        setUser(userResponse);
        setLoggedUser(getLoggedUser.data);
        setFollowers(userResponse.followers.length);
        setFollowing(userResponse.following.length);
        const isFollowing = userResponse.followers.some(
          (follower) => follower.id === getLoggedUser.data.id
        );
        setIsFollowing(isFollowing);
      } catch (error) {
        ToastAndroid.show(error,ToastAndroid.LONG);
      }
    })();
  }, [id]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  const isLoggedUser = loggedUser && user && loggedUser.id === user.id;

  return (
    <View style={styles.container}>
      {user && (
      <>
      <Stack.Screen
        options={{
          title: `Perfil de ${user.username}`,
          header: () => (
            <Header
              navigation={navigation}
              text={`Perfil de ${user.username}`}
            />
          ),
        }}
      />
      <View style={styles.backgroundContainer}>
        <Image
          source={{ uri: user.backgroundImage }}
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.userId}>@{user.id}</Text>
          </View>
          <Text style={styles.following}>{following} Following</Text>
          <Text style={styles.followers}>{followers} Followers</Text>
        </View>
        {!isLoggedUser && (
          <View style={styles.buttonContainer}>
            <TwitterButton
              style={styles.button}
              onPress={toggleFollow}
              text={isFollowing ? "Dejar de seguir" : "Seguir"}
              backgroundColor="#1DA1F2"
              fontColor="white"
            />
          </View>
        )}
      </View>
      <View style={styles.tweetsContainer}>
        <Text style={styles.tweetsHeading}>Tweets</Text>
        <FlatList
          data={user.tweets}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <TweetPreview tweet={item} />}
          style={styles.tweetList}
        />
      </View>
      </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundContainer: {
    height: 150,
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.7,
  },
  profileContainer: {
    position: "absolute",
    top: 120,
    left: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfoContainer: {
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  userId: {
    fontSize: 14,
    textAlign: "left",
    color: "#ccc",
  },
  tweetsContainer: {
    marginTop: 160,
    paddingHorizontal: 15,
  },
  tweetsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  tweetList: {
    marginTop: 10,
  },
  following: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 10,
    color: "#ccc",
  },
  followers: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 10,
    color: "#ccc",
  },
  buttonContainer: {
    position: "absolute",
    top: 50,
    right: -250,
    minWidth: 130,
  },
});

export default UserProfile;
