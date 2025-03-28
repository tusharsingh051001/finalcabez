import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, useColorScheme, ActivityIndicator } from "react-native";
import { fetchDriverData } from "@/data/driverData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserUUID = async (): Promise<string | null> => {
  try {
    const uuid = await AsyncStorage.getItem("userUUID");
    return uuid;
  } catch (error) {
    console.error("Error getting userUUID:", error);
    return null;
  }
};

const DriverProfile = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [data, setData] = useState<{
    id: string;
    name: string;
    age: number | null;
    idNumber: string;
    idType: string;
    phoneNumber: string;
    email: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const uuid = await getUserUUID();
        if (!uuid) {
          setError("No user UUID found.");
          setLoading(false);
          return;
        }
        const personal = await fetchDriverData(uuid);
        if (personal) {
          setData(personal);
        } else {
          setError("No personal data found.");
        }
      } catch (err) {
        setError("Failed to fetch personal data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.header, isDarkMode && styles.darkText]}>Driver Profile</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Name: {data?.name}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Age: {data?.age ?? "N/A"}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>ID Type: {data?.idType}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>ID Number: {data?.idNumber}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Phone: {data?.phoneNumber}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Email: {data?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  darkContainer: {
    backgroundColor: "#1E1E1E",
    borderColor: "#333",
  },
  darkText: {
    color: "#FFF",
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default DriverProfile;
