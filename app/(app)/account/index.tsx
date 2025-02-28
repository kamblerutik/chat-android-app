import { useUser } from "@/contexts/userContext";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Index = () => {
  const { user } = useUser();

  console.log({ user: user?.profileUrl });
  const [activeTab, setActiveTab] = useState("Followers");

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.profileUrl }}
        style={{ width: 150, height: 150 }}
      />
      <View style={styles.box}>
        <FontAwesome6 name="user-large" size={25} />
        <Text style={styles.title}>{user?.username}</Text>
      </View>
      <View style={styles.box}>
        <Ionicons name="mail" size={25} />
        <Text style={styles.title}>{user?.email}</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Followers" && styles.activeTab]}
          onPress={() => setActiveTab("Followers")}
        >
          <Text style={styles.tabText}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Following" && styles.activeTab]}
          onPress={() => setActiveTab("Following")}
        >
          <Text style={styles.tabText}>Following</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "Followers" && <Text>Followers</Text>}
      {activeTab === "Following" && <Text>Following</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  box: {
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: hp(3),
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Index;
