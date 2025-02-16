import React, { useState } from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import personalData from "@/data/personalData";

type PersonalDataType = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

const ParentProfile = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [data] = useState<PersonalDataType>(personalData);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.header, isDarkMode && styles.darkText]}>Parent Profile</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Name: {data.firstName} {data.lastName}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Age: {data.age}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Email: {data.email}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Phone: {data.phoneNumber}</Text>
      <Text style={[styles.subHeader, isDarkMode && styles.darkText]}>Address</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>{data.address.street}, {data.address.city}</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>{data.address.state} - {data.address.zipCode}</Text>
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
});

export default ParentProfile;
