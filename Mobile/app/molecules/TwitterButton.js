import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const TwitterButton = ({
  onPress,
  text,
  containerWidth,
  backgroundColor,
  fontColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        { width: containerWidth, backgroundColor: backgroundColor, fontColor },
      ]}
    >
      <Text style={[styles.text, { color: fontColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default TwitterButton;
