import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Chats",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbubbles-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="users/index"
        options={{
          title: "Users",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name="users" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          title: "Account",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name="user-large" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
