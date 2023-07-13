import React, { useState } from "react";
import { View, TextInput, Button, FlatList, StyleSheet, ToastAndroid } from "react-native";
import Api from "../../Api";
import TweetPreview from "../../tweet/preview";
import { Stack } from "expo-router";
import Header from "../../molecules/Header";
import { useRouter } from "expo-router";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useRouter();

  const handleSearch = async () => {
    try {
      const response = await Api.searchTweets(searchText);
      setSearchResults(response.data);
    } catch (error) {
      ToastAndroid.show(error,ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          header: (props) => <Header navigation={navigation} text="Búsqueda" />,
        }}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar tweets..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>
      <FlatList
        data={searchResults}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    color: "white",
  },
});

export default Search;
