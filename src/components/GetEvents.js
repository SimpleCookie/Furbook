import React, { createContext } from "react";
import { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import IP from "../../fetchIP";

import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export default function GetEvents({ setModalVisible, theme }) {
  //console.log('getplaces component rendered');

  const thisTheme = theme.dark;

  const [isVisable, setIsVisable] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(IP + "/events");
      const data = await response.json();
      setData(data);
      setLoading(false);
      const test = JSON.stringify(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postText}>{item.place}</Text>
            <Text style={styles.postText}>{item.time}</Text>
            <Pressable
              onPress={() => {
                setIsVisable(!isVisable);
              }}
              style={styles.arrowButton}
            >
              <Entypo name="chevron-thin-down" size={42} color="white" />
            </Pressable>
            {isVisable && (
              <View>
                <Text style={styles.postText}>{item.description}</Text>
                <Text style={styles.postText}>{item.typeOfEvent}</Text>
              </View>
            )}
            <Text style={styles.postDate}>{item.date}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 15,
  },
  postContainer: {
    width: "100%",
    marginVertical: 10,
    alignSelf: "center",
    padding: 15,
    borderBottomColor: "#bced95",
    borderBottomWidth: 2,
  },
  arrowButton: {
    alignSelf: "center",
  },
  filterButton: {
    width: "30%",
    backgroundColor: "#bced95",
    borderRadius: 10,
    padding: 5,
    textAlign: "center",
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  filterButtonText: {
    textAlign: "center",
    fontSize: 20,
  },
  openModalButton: {
    width: "80%",
    backgroundColor: "#264026",
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 26,
    paddingHorizontal: 5,
    paddingVertical: 10,
    textAlign: "center",
  },
  postTitle: {
    fontSize: 24,
    color: "white",
  },
  postText: {
    marginVertical: 15,
    fontSize: 22,
    color: "white",
  },
  postComments: {
    marginVertical: 5,
    fontSize: 18,
    color: "white",
  },
  metaComments: {
    fontSize: 18,
    color: "white",
  },
  reviewContainer: {
    flexDirection: "row",
    columnGap: 5,
  },
});
