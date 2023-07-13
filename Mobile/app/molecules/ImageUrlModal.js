import React from "react";
import { Modal, View, TextInput, StyleSheet, ToastAndroid } from "react-native";
import TwitterButton from "./TwitterButton";
import isValidImageUrl from "../functions/validUrl";

const ImageUrlModal = ({ visible, onClose, imageUrl, setImageUrl }) => {
  const onPressSendUrl = async () => {
    if (!isValidImageUrl(imageUrl)){
      ToastAndroid.show('Url invalida: debe terminar en .(jpg|jpeg|png|gif)',ToastAndroid.LONG);
    }else{
      ToastAndroid.show('Url cargada...',ToastAndroid.LONG);
      onClose();
    }
    

  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.modalTextInput}
            placeholder="URL de la imagen (opcional)"
            onChangeText={setImageUrl}
            value={imageUrl}
            placeholderTextColor="grey"
            color="white"
          />
          <View style={styles.modalButtonContainer}>
            <TwitterButton
              text="Enviar URL"
              onPress={onPressSendUrl}
              containerWidth="40%"
              backgroundColor="#1DA1F2"
              fontColor="white"
            />
            <TwitterButton
              text="X"
              onPress={() => {
                onClose();
                setImageUrl("");
              }}
              containerWidth="10%"
              backgroundColor="black"
              fontColor="white"
            />
          </View>
        </View>
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
  modalContent: {
    width: "80%",
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  modalTextInput: {
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ImageUrlModal;
