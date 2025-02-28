import { localUrl } from "@/contants/urls";
import { useUser } from "@/contexts/userContext";
import axios from "axios";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface User {
  _id: string;
  username: string;
  email: string;
  profileUrl: string;
  createdAt: string;
  updatedAt: string;
  following: string[];
  followers: string[];
  __v: 0;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  const { user } = useUser();

  if (user?._id) {
    const getFollowingUsers = async () => {
      try {
        const response = await axios.get(
          `${localUrl}/api/user/get-following-user/${user?._id}`
        );
        console.log(response.data);

        setUsers(response.data.following);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowingUsers();
  }

  return (
    <View style={styles.container}>
      {users.map((user, i) => (
        <Link href={`/chat/${user._id}`} key={i}>
          <View style={styles.boxcontainer}>
            <Image
              source={{
                uri: user.profileUrl || "https://via.placeholder.com/50",
              }}
              style={styles.profileImage}
            />

            <View style={styles.userInfo}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
        </Link>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  boxcontainer: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(8),
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  profileImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  username: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    color: "#222",
  },
  email: {
    fontSize: wp(3.5),
    color: "#777",
  },
});

export default Home;
