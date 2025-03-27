import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, useColorScheme, ActivityIndicator } from "react-native";
import { fetchPersonalData, PersonalData } from "@/data/personalData";
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

const ParentProfile = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [data, setData] = useState<PersonalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        const personal = await fetchPersonalData(uuid);
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
      <Text style={[styles.header, isDarkMode && styles.darkText]}>Parent Profile</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Name: {data?.firstName} {data?.lastName}
      </Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Age: {data?.age ?? "N/A"}
      </Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Email: {data?.email}
      </Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Phone: {data?.phoneNumber}
      </Text>

      <Text style={[styles.subHeader, isDarkMode && styles.darkText]}>Address</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        {data?.address.street}, {data?.address.city}
      </Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        {data?.address.state} - {data?.address.zipCode}
      </Text>

      <Text style={[styles.subHeader, isDarkMode && styles.darkText]}>Additional Info</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Account Start Date: {data?.accountStartDate || "N/A"}
      </Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Account Expiry Date: {data?.accountExpiryDate || "N/A"}
      </Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Blood Group: {data?.bloodGroup || "N/A"}
      </Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Guardian Name: {data?.guardianName || "N/A"}
      </Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        School Address: {data?.schoolAddress || "N/A"}
      </Text>
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
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
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

export default ParentProfile;
