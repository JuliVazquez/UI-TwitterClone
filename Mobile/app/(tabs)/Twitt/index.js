import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import fetchUserData from "../../functions/fetchUserData";
import TwitterButton from "../../molecules/TwitterButton";
import Api from "../../Api";
import { Stack, useRouter } from "expo-router";
import Header from "../../molecules/Header";
import ImageUrlModal from "../../molecules/ImageUrlModal";

const Twitt = () => {
  const navigation = useRouter();
  const [user, setUser] = useState(null);
  const [twittText, setTwittText] = useState("");
  const [urlImageModalVisible, setUrlImageModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchUserData(setUser);
  }, []);

  const handleTweet = async () => {
    if (twittText.trim() === "") {
      ToastAndroid.show("El tweet no puede estar vacío", ToastAndroid.LONG);
      return;
    }

    const data = { content: twittText, image: imageUrl };

    try {
      const response = await Api.tweet(data);
      if (response && response.data) {
        ToastAndroid.show("Tweet enviado...", ToastAndroid.LONG);
        const tweetId = response.data.id;
        navigation.push(`/tweet/${tweetId}`);
        setTwittText("");
        setImageUrl("");
      }
    } catch (error) {
      ToastAndroid.show(error,ToastAndroid.LONG);
    }
  };

  const handleImageSelect = () => {
    setUrlImageModalVisible(true);
  };

  return (
    <View style={styles.twittear_root}>
      <Stack.Screen
        options={{
          title: "Twittear",
          header: (props) => (
            <Header
              navigation={navigation}
              showBackButton={true}
              text="Twittear"
            />
          ),
        }}
      />
      {user && (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user.image }}
            style={styles.twittear_profileImage}
          />
          <TextInput
            style={styles.twittear_input_text}
            placeholder="¿Qué estás pensando?"
            onChangeText={setTwittText}
            value={twittText}
            multiline
            maxLength={140}
            placeholderTextColor="grey"
            color="white"
          />
        </View>
      )}

      <View style={styles.buttonContainer_image}>
        <TouchableOpacity onPress={handleImageSelect}>
          <FontAwesome name="image" size={25} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer_tweet}>
        <TwitterButton
          text="Twittear"
          onPress={handleTweet}
          containerWidth="30%"
          backgroundColor="#1DA1F2"
          fontColor="white"
        />
      </View>

      <ImageUrlModal
        visible={urlImageModalVisible}
        onClose={() => setUrlImageModalVisible(false)}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  twittear_root: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  twittear_profileImage: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  twittear_input_text: {
    flex: 1,
    height: 100,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "white",
  },
  buttonContainer_image: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonContainer_tweet: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
  },
  modalTextInput: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default Twitt;
