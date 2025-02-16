import React, { useState } from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import driverData from "@/data/driverData";

type DriverDataType = {
  id: string;
  name: string;
  age: number;
  licenseNumber: string;
  vehicleType: string;
  rating: number;
  tripsCompleted: number;
  availability: boolean;
};

const DriverProfile = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [data] = useState<DriverDataType>(driverData);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.header, isDarkMode && styles.darkText]}>Driver Profile</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Name: {data.name}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Age: {data.age}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>License Number: {data.licenseNumber}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Vehicle Type: {data.vehicleType}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Rating: {data.rating} ⭐</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Trips Completed: {data.tripsCompleted}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Availability: {data.availability ? "Available" : "Not Available"}</Text>
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
});

export default DriverProfile;
