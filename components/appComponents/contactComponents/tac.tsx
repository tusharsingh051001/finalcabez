import React from "react";
import { StyleSheet, Text, useColorScheme, ScrollView } from "react-native";

const Tac = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.header, isDarkMode && styles.darkText]}>
        CabEZ Terms & Conditions for Parents
      </Text>

      <Text style={[styles.boldText, isDarkMode && styles.darkText]}>1. Introduction</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Welcome to CabEZ, your trusted partner in safe and reliable school transportation. By using our service, you agree to these Terms & Conditions.
      </Text>

      <Text style={[styles.boldText, isDarkMode && styles.darkText]}>2. Service Overview</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        CabEZ connects parents with trained drivers ("CabEZ Pilots") to ensure secure transportation for children. Vehicles are leased from partner enterprises and maintained to high safety standards.
      </Text>

      <Text style={[styles.boldText, isDarkMode && styles.darkText]}>3. Payment & Fees</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Fees are charged monthly and due by the 5th. Payment reminders start from the 28th of the previous month. Late fees may apply, and non-payment beyond the 7th may result in service suspension.
      </Text>

      <Text style={[styles.boldText, isDarkMode && styles.darkText]}>4. Safety & Security</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        We prioritize your child’s safety with features such as:
      </Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>GPS Tracking:</Text> Real-time ride monitoring.</Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>Emergency Panic Buttons:</Text> Installed for quick alerts.</Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>AI Driver Assessment:</Text> Ensures safe driving.</Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>Geofencing Alerts:</Text> Notifies deviations from the route.</Text>

      <Text style={[styles.boldText, isDarkMode && styles.darkText]}>5. Driver Screening & Training</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        CabEZ Pilots undergo thorough checks:
      </Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>Background Verification:</Text> Criminal and police record checks.</Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>Psychometric Testing:</Text> Ensures child-friendly behavior.</Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>Strict Policies:</Text> Zero tolerance for unsafe practices.</Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>Parent Preference:</Text> Priority given to drivers who are parents themselves.</Text>

      <Text style={[styles.boldText, isDarkMode && styles.darkText]}>6. Vehicle Safety & Maintenance</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Our vehicles meet strict safety criteria, undergoing:
      </Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>Regular Inspections:</Text> Mechanical and safety checks.</Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>Sanitization:</Text> Daily cleaning and hygiene maintenance.</Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● <Text style={styles.boldText}>Comfort & Safety Features:</Text> Ensuring a secure ride.</Text>

      <Text style={[styles.boldText, isDarkMode && styles.darkText]}>7. Communication & Privacy</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        Parents receive service-related notifications via the app. Standard messaging rates may apply. Personal data is protected as per our Privacy Policy.
      </Text>

      <Text style={[styles.boldText, isDarkMode && styles.darkText]}>8. Service Termination</Text>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        CabEZ may suspend service for:
      </Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● Non-payment beyond the due date.</Text>
      <Text style={[styles.listItem, isDarkMode && styles.darkText]}>● Violation of safety policies by parents or children.</Text>

      <Text style={[styles.text, isDarkMode && styles.darkText]}>
        For inquiries, contact us at support@cabez.in.
      </Text>

      <Text style={[styles.thankYouText, isDarkMode && styles.darkText]}>
        Thank you for trusting CabEZ for your child’s safe transportation.
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

export default Tac;
