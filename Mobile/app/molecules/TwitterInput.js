import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const TwitterInput = ({
  value,
  setValue,
  placeholder,
  containerWidth,
  secureEntry,
}) => {
  const containerStyle = {
    ...styles.container,
    width: containerWidth,
  };

  const handleTextChange = (text) => {
    setValue(text);
  };

  return (
    <View style={containerStyle}>
      <TextInput
        value={value}
        width={containerWidth}
        onChangeText={handleTextChange}
        placeholder={placeholder}
        placeholderTextColor="#627074"
        style={styles.input}
        secureTextEntry={secureEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#627074",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    color: "#FFFF",
  },
});

export default TwitterInput;
