import { useUser } from "@/contexts/userContext";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
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
  __v: number;
}

interface Props {
  users: User;
  handleFollowUser: (targetUserId: string) => void;
  handleUnfollowUser: (targetUserId: string) => void;
}

const UserCard = ({ users, handleFollowUser, handleUnfollowUser }: Props) => {
  const { user } = useUser();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const check = () => {
    const checkFollowing = user?.following?.includes(users._id) ?? false;
    setIsFollowing(checkFollowing);
  };

  useEffect(() => {
    check();
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: users.profileUrl || "https://via.placeholder.com/50" }}
        style={styles.profileImage}
      />

      <View style={styles.userInfo}>
        <Text style={styles.username}>{users.username}</Text>
        <Text style={styles.email}>{users.email}</Text>
      </View>

      <Button
        onPress={() => {
          isFollowing
            ? handleUnfollowUser(users._id)
            : handleFollowUser(users._id);
        }}
        title={isFollowing ? "Following" : "Follow"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default UserCard;
