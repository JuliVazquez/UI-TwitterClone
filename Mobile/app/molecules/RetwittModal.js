import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ToastAndroid,
  ScrollView,
} from "react-native";
import TwitterButton from "./TwitterButton";
import Api from "../Api";
import { useRouter } from "expo-router";

const RetwittModal = ({ visible, onClose, image, selectedTweetId, setterStateModal }) => {
  const [twittText, setTwittText] = useState("");
  const navigation = useRouter();

  const onRetwittPressed = async () => {
    const data = { content: twittText };
    Api.retweet(data, selectedTweetId)
      .then((response) => {
        const tweetId = response.data.id;
        ToastAndroid.show("Retweet procesado...", ToastAndroid.LONG);
        navigation.push(`/tweet/${tweetId}`);
        setTwittText("");
        setterStateModal(false)
      })
      .catch((error) => {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          {image && (
            <Image source={{ uri: image }} style={styles.profileImage} />
          )}
          <View style={styles.inputContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <TextInput
                style={styles.modalInput}
                multiline
                maxLength={140}
                placeholder="Retwittea con una respuesta (opcional)"
                placeholderTextColor="grey"
                backgroundColor="black"
                color="white"
                onChangeText={setTwittText}
                value={twittText}
              />
            </ScrollView>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TwitterButton
            text="Retwittear"
            onPress={onRetwittPressed}
            containerWidth="30%"
            backgroundColor="#1DA1F2"
            fontColor="white"
          />
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 999,
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
    height: 200,
  },
  modalInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    backgroundColor: "white",
    color: "black",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
  buttonContainer_image: {
    marginTop: -70,
    left: -165,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: -110,
    left: 130,
    padding: 10,
    alignItems: "center",
  },
});

export default RetwittModal;
