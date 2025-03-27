import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import env from "/Users/tusharsingh/Desktop/APK/cabezdummy/env.json";

const HASURA_WS_URL = env.HASURA_WS_URL;
const HASURA_ADMIN_SECRET = env.HASURA_ADMIN_SECRET;

const LOGIN_QUERY = `
  query Login($email: String!, $password: String!) {
    parent(where: { email_id: { _eq: $email }, password: { _eq: $password } }) {
      uuid
    }
  }
`;

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(HASURA_WS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
          query: LOGIN_QUERY,
          variables: { email, password },
        }),
      });

      const result = await response.json();

      if (result.errors || result.data.parent.length === 0) {
        Alert.alert("Login Failed", "Invalid email or password");
        setLoading(false);
        return;
      }

      const userUUID = result.data.parent[0].uuid;
      // Save the retrieved UUID to AsyncStorage for later use
      await AsyncStorage.setItem("userUUID", userUUID);
      router.replace("/home");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 48,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "white",
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
