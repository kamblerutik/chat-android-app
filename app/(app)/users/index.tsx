import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/contants/urls";
import UserCard from "@/components/UserCard";
import { useUser } from "@/contexts/userContext";
import * as Updates from "expo-updates";

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

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);

  const { user, setUser } = useUser();

  const username = user?.username;

  const getUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/get-all-users`);
      setUsers(response.data.user);
    } catch (error) {
      console.log({ errorUser: error });
    }
  };

  useEffect(() => {
    getUsers();
  }, [user]);

  const filteredUsers = users.filter((user) => user.username !== username);

  const handleFollowUser = async (targetUserId: string) => {
    if (!user) return;
    try {
      const response = await axios.post(`${baseUrl}/api/user/follow-user`, {
        userId: user?._id,
        targetUserId,
      });

      // Manually update user context
      user.following.push(targetUserId);
      setUser({ ...user });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollowUser = async (targetUserId: string) => {
    if (!user) return;
    try {
      const response = await axios.post(`${baseUrl}/api/user/unfollow-user`, {
        userId: user?._id,
        targetUserId,
      });

      user.following = user.following.filter((id) => id !== targetUserId);
      setUser({ ...user });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {filteredUsers.map((user, i) => (
        <UserCard
          users={user}
          key={i}
          handleFollowUser={handleFollowUser}
          handleUnfollowUser={handleUnfollowUser}
        />
      ))}
    </View>
  );
};

export default Index;
