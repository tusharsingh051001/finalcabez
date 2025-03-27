import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useColorScheme } from "react-native";


const HomeLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "white" : "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "white",
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ size }) => (
            <Entypo name="home" size={size} color="orange" />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/attendance/index"
        options={{
          title: "Attendance",
          tabBarLabel: "Attendance",
          tabBarIcon: ({ size }) => (
            <Entypo name="paper-plane" size={24} color="orange" />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/profile/index"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ size }) => (
            <FontAwesome6 name="person" size={24} color="orange" />
          ),
        }}
      />
      <Tabs.Screen
        name="(tabs)/contactUs/index"
        options={{
          title: "Contact Us",
          tabBarLabel: "Contact Us",
          tabBarIcon: ({ size }) => (
            <Entypo name="phone" size={24} color="orange" />
          ),
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;