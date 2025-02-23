import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import axios, { isAxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://chat-app-backend-asva.onrender.com/api/auth/login`,
        {
          username,
          password,
        }
      );

      if (response.data.status) {
        Alert.alert(response.data.message);
        await AsyncStorage.setItem("token", response.data.token);
        router.push("/home");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (isAxiosError(error)) {
        const errMessage = error.response?.data.message || "Server error";
        Alert.alert(errMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ gap: 20 }}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("@/assets/images/login.png")}
          />
          <Text style={styles.title}>Login</Text>
          <View style={styles.form}>
            <View style={styles.input}>
              <FontAwesome6 name="user-large" size={20} color={"gray"} />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: hp(2.5),
                  fontWeight: "500",
                  color: "gray",
                }}
                value={username}
                onChangeText={(e) => setUsername(e)}
                placeholder="username"
                placeholderTextColor={"gray"}
              />
            </View>

            <View style={styles.input}>
              <Ionicons name="lock-closed" size={25} color={"gray"} />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: hp(2.5),
                  fontWeight: "500",
                  color: "gray",
                }}
                value={password}
                onChangeText={(e) => setPassword(e)}
                placeholder="password"
                placeholderTextColor={"gray"}
                secureTextEntry
              />
            </View>
            <Text
              style={{
                fontSize: hp(2.3),
                fontWeight: "400",
                textAlign: "right",
              }}
            >
              Forgot Password?
            </Text>
            {isLoading ? (
              <ActivityIndicator size={40} />
            ) : (
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: hp(2.8),
                    fontWeight: "500",
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.title}>OR</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: hp(2.3),
                fontWeight: "400",
              }}
            >
              Don't have an account?
            </Text>
            <Link
              style={{
                fontSize: hp(2.3),
                fontWeight: "600",
                color: "#6c63ff",
              }}
              href={"/register"}
            >
              Register
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    height: hp(30),
    alignSelf: "center",
  },
  title: {
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: "500",
    color: "#333",
  },
  form: {
    gap: 10,
    marginTop: 10,
  },
  input: {
    height: hp(6.5),
    borderRadius: 5,
    backgroundColor: "#e7e5e5",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#6c63ff",
    height: hp(6.5),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
