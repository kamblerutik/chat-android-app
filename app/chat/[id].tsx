import { localUrl } from "@/contants/urls";
import { useUser } from "@/contexts/userContext";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { io } from "socket.io-client";

type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
};

const SOCKET_SERVER_URL = "ws://192.168.43.25:5000"; // Replace with your server IP

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
});

const ChatScreen = () => {
  const { id: receiverId } = useLocalSearchParams();
  const { user } = useUser();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Join user to their room
    if (user?._id) {
      socket.emit("join", user._id);
    }

    // Fetch existing messages
    axios
      .post(`${localUrl}/api/conversation/get-or-create`, {
        senderId: user?._id,
        receiverId,
      })
      .then((res) => setMessages(res.data.messages || []))
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for new messages
    const handleMessage = (newMessage: Message) => {
      setMessages((prev) =>
        prev.some((msg) => msg._id === newMessage._id)
          ? prev
          : [...prev, newMessage]
      );
    };

    socket.on("receive_message", handleMessage);

    // Cleanup
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [user, receiverId]);

  // Send message
  const sendMessage = () => {
    if (message.trim() && user?._id) {
      const msgData = {
        senderId: user._id,
        receiverId,
        message,
      };

      socket.emit("send_message", msgData);
      setMessage("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text>{`${item.senderId === user?._id ? "You" : "Them"}: ${
            item.message
          }`}</Text>
        )}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
