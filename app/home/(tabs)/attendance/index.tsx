import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import env from "/Users/tusharsingh/Desktop/APK/cabezdummy/env.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HASURA_WS_URL = env.HASURA_WS_URL;
const HASURA_ADMIN_SECRET = env.HASURA_ADMIN_SECRET;

const HISTORY_QUERY = `
  query MyQuery($parentUUID: String!) {
    parent(where: {uuid: {_eq: $parentUUID}}) {
      attendances {
        to_fro
        rider_id
        attendance_flag
        attendance_date
      }
    }
  }
`;

interface HistoryItem {
  id: number;
  status: string;
  startLocation: string;
  endLocation: string;
  date: string;
}

// Helper function to get user UUID from AsyncStorage
const getUserUUID = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("userUUID");
  } catch (error) {
    console.error("Error getting userUUID:", error);
    return null;
  }
};

export default function HistoryScreen() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        // Retrieve dynamic parent UUID from storage
        const parentUUID = await getUserUUID();
        if (!parentUUID) {
          throw new Error("No user UUID found");
        }

        const response = await fetch(HASURA_WS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
          },
          body: JSON.stringify({
            query: HISTORY_QUERY,
            variables: { parentUUID },
          }),
        });
        const result = await response.json();
        if (result.errors) {
          throw new Error(result.errors[0].message);
        }
        const attendances = result.data.parent[0]?.attendances || [];
        const mappedData: HistoryItem[] = attendances.map((attendance: any, index: number) => {
          const status = attendance.attendance_flag.charAt(0).toUpperCase() +
                         attendance.attendance_flag.slice(1);
          // Determine route based on 'to_fro' field
          const { to_fro } = attendance;
          const startLocation = to_fro === "to" ? "Home->" : "School->";
          const endLocation = to_fro === "to" ? "School" : "Home";
          return {
            id: index,
            status,
            startLocation,
            endLocation,
            date: attendance.attendance_date,
          };
        });
        setHistoryData(mappedData);
      } catch (err) {
        console.error("Error fetching history data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#FF9800" : "#0000FF"}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: colorScheme === "dark" ? "#121212" : "#F9F9F9" },
      ]}
    >
      <ScrollView style={styles.container}>
        <Text
          style={[
            styles.title,
            { color: colorScheme === "dark" ? "#FFFFFF" : "#000000" },
          ]}
        >
          History
        </Text>
        {error || historyData.length === 0 ? (
          <View style={styles.fallbackContainer}>
            <Text
              style={[
                styles.fallbackText,
                { color: colorScheme === "dark" ? "#AAA" : "#999" },
              ]}
            >
              No data available. Try later.
            </Text>
          </View>
        ) : (
          historyData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.card,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#1E1E1E" : "#FFF",
                  borderLeftColor:
                    item.status === "Present" ? "#4CAF50" : "#F44336",
                },
              ]}
            >
              <Text
                style={{
                  color: item.status === "Present" ? "#4CAF50" : "#F44336",
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                {item.status}
              </Text>
              <View style={styles.routeContainer}>
                <Text
                  style={[
                    styles.routeText,
                    { color: colorScheme === "dark" ? "#EEE" : "#333" },
                  ]}
                >
                  {item.startLocation}
                </Text>
                <Text
                  style={[
                    styles.routeText,
                    { color: colorScheme === "dark" ? "#EEE" : "#333" },
                  ]}
                >
                  {item.endLocation}
                </Text>
              </View>
              <Text
                style={[
                  styles.date,
                  { color: colorScheme === "dark" ? "#AAA" : "#999" },
                ]}
              >
                {item.date}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  fallbackText: {
    fontSize: 18,
    textAlign: "center",
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    borderLeftWidth: 4,
  },
  routeContainer: {
    marginBottom: 8,
  },
  routeText: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
