import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  useColorScheme,
} from 'react-native';

export default function HistoryScreen() {
  interface HistoryItem {
    id: number;
    status: string;
    startLocation: string;
    endLocation: string;
    date: string;
  }

  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const colorScheme = useColorScheme(); // Detect light or dark mode

  const dummyData = [
    {
      id: 1,
      status: "Present",
      startLocation: "Home->",
      endLocation: "School",
      date: "2025-01-30",
    },
    {
      id: 2,
      status: "Present",
      startLocation: "School->",
      endLocation: "Home",
      date: "2025-01-30",
    },
    {
      id: 3,
      status: "Absent",
      startLocation: "Home->",
      endLocation: "School",
      date: "2025-01-31",
    },
  ];

  useEffect(() => {
    setHistoryData(dummyData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colorScheme === "dark" ? "#FF9800" : "#0000FF"} />
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
            <Text style={[styles.fallbackText, { color: colorScheme === "dark" ? "#AAA" : "#999" }]}>
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
                  backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#FFF",
                  borderLeftColor: item.status === "Present" ? "#4CAF50" : "#F44336",
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

