import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import Collapsible from "react-native-collapsible";
import DriverProfile from "@/components/appComponents/profileComponents/DriverProfile";
import ParentProfile from "@/components/appComponents/profileComponents/ParentProfile";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Profile = () => {
  const [openTab, setOpenTab] = useState(null);
  const colorScheme = useColorScheme(); // Detect light or dark mode
  const router = useRouter();
  const isDarkMode = colorScheme === "dark";

  const toggleAccordion = (tab: any) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear credentials)
    router.replace("/login");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#F9F9F9" }]}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => toggleAccordion("parent")}
          style={[styles.tab, isDarkMode && styles.darkTab]}
        >
          <Text style={[styles.tabTitle, isDarkMode && styles.darkTabTitle]}>My Details</Text>
        </TouchableOpacity>
        <Collapsible collapsed={openTab !== "parent"}>
          <View style={[styles.profileContainer, isDarkMode && styles.darkProfileContainer]}>
            <ParentProfile />
          </View>
        </Collapsible>

        <TouchableOpacity
          onPress={() => toggleAccordion("driver")}
          style={[styles.tab, isDarkMode && styles.darkTab]}
        >
          <Text style={[styles.tabTitle, isDarkMode && styles.darkTabTitle]}>My Driver Details</Text>
        </TouchableOpacity>
        <Collapsible collapsed={openTab !== "driver"}>
          <View style={[styles.profileContainer, isDarkMode && styles.darkProfileContainer]}>
            <DriverProfile />
          </View>
        </Collapsible>
      </View>
      {/* Logout button container */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
  },
  tabContainer: {
    flexDirection: "column",
    gap: 10,
  },
  tab: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 0,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 6,
    borderLeftColor: "#FFA500",
    borderStyle: "solid",
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", 
  },
  profileContainer: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginTop: 5,
  },
  darkTab: {
    backgroundColor: "#1E1E1E",
    borderColor: "#333",
  },
  darkTabTitle: {
    color: "#FFF",
  },
  darkProfileContainer: {
    backgroundColor: "#1E1E1E",
    borderColor: "#333",
  },
  logoutContainer: {
    marginTop: "auto", // Push logout button to bottom
    alignItems: "center",
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
