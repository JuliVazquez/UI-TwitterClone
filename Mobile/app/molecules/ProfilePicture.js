import React from "react";
import { TouchableOpacity, Image } from "react-native";

const ProfilePicture = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.profilePictureContainer}>
      <Image
        source={{
          uri: "https://robohash.org/facilisnobisdignissimos.png?size=50x50&set=set1",
        }}
        style={styles.profilePicture}
      />
    </TouchableOpacity>
  );
};

const styles = {
  profilePictureContainer: {
    marginLeft: 10,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
};

export default ProfilePicture;
