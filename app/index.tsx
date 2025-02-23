import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

export default function AuthCheck() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = await AsyncStorage.getItem("token");
        setToken(authToken);
      } catch (error) {
        console.error("Error reading token:", error);
      } finally {
        setLoading(false); // Mark as loaded
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (token) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [token, loading]); // Ensure navigation happens only when loading is false

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
