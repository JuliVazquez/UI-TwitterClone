import React, { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Api from "../Api";
import ReplyModal from "../molecules/ReplyModal";
import moment from "moment";
import { useRouter } from "expo-router";
import RetwittModal from "../molecules/RetwittModal";

const TweetPreview = ({ tweet, itsRetweeted }) => {
  const navigation = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isMyTwitt, setIsMyTwitt] = useState(false);
  const [repliesCount, setRepliesCount] = useState(0);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showRetwittModal, setShowRetwittModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [retweetedTweet, setRetweetedTweet] = useState(null);
  const [strType, setStrType] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const loggedUser = await Api.loggedUser();
        setLoggedUserId(loggedUser.data.id);
        setProfileImage(loggedUser.data.image);
        const isTweetLiked = tweet?.likes.some(
          (like) => like.id === loggedUserId
        );
        setIsLiked(isTweetLiked || false);
        setIsMyTwitt(tweet?.user?.id === loggedUser.data.id);
        setRetweetedTweet(tweet?.type?.tweet);
        setLikesCount(tweet?.likes?.length || 0);
        setStrType(tweet?.strType || "");
        setRepliesCount(tweet?.replys?.length || 0);
        setIsLoading(false);
      } catch (error) {
        ToastAndroid.show(error,ToastAndroid.LONG);
      }
    })();
  }, [loggedUserId, tweet]);

  const onReplyPressed = () => {
    setShowReplyModal(true);
  };

  const onRetwittPressed = () => {
    if (isMyTwitt) {
      ToastAndroid.show(
        "No se puede retwittear un tweet propio.",
        ToastAndroid.LONG
      );
    } else {
      setShowReplyModal(false);
      setShowRetwittModal(true);
    }
  };

  const toggleLike = async () => {
    try {
      const response = await Api.toggleLike(tweet.id);
      const tweetResponse = response.data;
      setLikesCount(tweetResponse.likes.length);
      setIsLiked(
        tweetResponse.likes.find((like) => like.id === loggedUserId) !==
          undefined
      );
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToUserProfile = () => {
    navigation.push(`/Profile/${tweet.user.id}`);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const renderRetweet = () => {
    if (tweet && tweet.strType === "Retweet" && !itsRetweeted) {
      if (retweetedTweet) {
        return (
          <View style={styles.quoteTweet}>
            <TweetPreview tweet={retweetedTweet} itsRetweeted={true} />
          </View>
        );
      } else {
        return <Text>Cargando tweet retweeteado...</Text>;
      }
    }
    return null;
  };

  return (
    <>
      <Pressable
        style={itsRetweeted ? styles.containerRetweet : styles.container}
        onPress={() => navigation.push(`/tweet/${tweet.id}`)}
      >
        <View style={styles.profileContainer}>
          <Pressable onPress={navigateToUserProfile}>
            <Image
              source={{ uri: tweet.user.profilePic }}
              style={styles.profilePicture}
            />
          </Pressable>
        </View>
        <View style={styles.tweetContentContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.usernameContainer}>
              <Pressable onPress={navigateToUserProfile}>
                <Text style={styles.username}>{tweet.user.username}</Text>
              </Pressable>
              <Text style={styles.userId}> @{tweet.user.id}</Text>
              <Text style={styles.createdAt}>
                {" "}
                - {moment(tweet.date).fromNow()}
              </Text>
            </View>
            {!itsRetweeted && (
              <View>
                {strType === "Retweet" && (
                  <Text style={styles.userAction}>Ha Retwitteado</Text>
                )}
                {strType === "Reply" && (
                  <Text style={styles.userAction}>Ha Respondido</Text>
                )}
              </View>
            )}
          </View>
          <Text style={styles.tweetContent}>{tweet.content}</Text>
          {tweet.type.image && (
            <Image source={{ uri: tweet.type.image }} style={styles.image} />
          )}
          {renderRetweet()}
          {!itsRetweeted && (
            <View style={styles.footer}>
              <Pressable onPress={onReplyPressed} style={styles.footButton}>
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={16}
                  color="white"
                />
                <Text style={styles.stats}> {repliesCount}</Text>
              </Pressable>
              <Pressable onPress={onRetwittPressed} style={styles.footButton}>
                <MaterialCommunityIcons
                  name="repeat-variant"
                  size={16}
                  color="white"
                />
                <Text style={styles.stats}>{tweet.reTweetAmount}</Text>
              </Pressable>
              <Pressable onPress={toggleLike} style={styles.footButton}>
                {isLiked ? (
                  <MaterialCommunityIcons name="heart" size={16} color="red" />
                ) : (
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={16}
                    color="white"
                  />
                )}
                <Text style={styles.stats}> {likesCount}</Text>
              </Pressable>
            </View>
          )}
        </View>
        {showReplyModal && (
          <ReplyModal
            visible={showReplyModal}
            onClose={() => setShowReplyModal(false)}
            image={profileImage}
            selectedTweetId={tweet.id}
          />
        )}
        {showRetwittModal && (
          <RetwittModal
            visible={showRetwittModal}
            onClose={() => setShowRetwittModal(false)}
            image={profileImage}
            selectedTweetId={tweet.id}
            setterStateModal={setShowRetwittModal}
          />
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  containerRetweet: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#666565",
    paddingBottom: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#666565",
    paddingBottom: 12,
  },
  profileContainer: {
    marginRight: 16,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tweetContentContainer: {
    flex: 1,
    marginRight: 16,
  },
  contentContainer: {
    marginRight: 16,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
    color: "white",
  },
  userId: {
    fontSize: 16,
    color: "#777",
    marginRight: 4,
  },
  createdAt: {
    color: "#777",
  },
  tweetContent: {
    marginTop: 4,
    color: "white",
  },
  footer: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "space-around",
  },
  stats: {
    fontSize: 14,
    color: "white",
    marginLeft: 4,
  },
  image: {
    marginTop: 8,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  footButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  userAction: {
    color: "#a0e3eb",
    fontWeight: "bold",
  },
});

export default TweetPreview;
