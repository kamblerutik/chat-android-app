import { UserProvider } from "@/contexts/userContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* These screens don't have a bottom tab */}
        <Stack.Screen name="index" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="register/index" />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Chat",
          }}
          name="chat/index"
        />

        {/* The (app) group has its own layout with tabs */}
        <Stack.Screen name="(app)" />
      </Stack>
    </UserProvider>
  );
}
