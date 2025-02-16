import React from "react";
import { StyleSheet, Text, useColorScheme, ScrollView } from "react-native";

const Contact = () => {
  const colorScheme = useColorScheme(); 
  const isDarkMode = colorScheme === "dark"; 
  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
          <Text style={[styles.header, isDarkMode && styles.darkText]}>
            CONTACT INFORMATION
          </Text>
    
          <Text style={[styles.boldText, isDarkMode && styles.darkText]}>Phone</Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
            +91 8826148600
          </Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
          +91 7303860645
          </Text>
          <Text style={[styles.boldText, isDarkMode && styles.darkText]}>Email</Text>
          <Text style={[styles.text, isDarkMode && styles.darkText]}>
            support@cabez.in
            cabez.care@gmail.com
          </Text>
      </ScrollView>
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
  darkContainer: {
    backgroundColor: "#1E1E1E",
    borderColor: "#333",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  darkText: {
    color: "#FFF",
  },
  boldText: {
    fontWeight: "bold",
  },
  listItem: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    marginBottom: 5,
  },
  thankYouText: {
    fontStyle: "italic",
    marginTop: 10,
  },
});

export default Contact;
