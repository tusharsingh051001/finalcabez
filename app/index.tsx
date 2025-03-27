import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useNavigation } from "expo-router";

import cabezLogo from "@/assets/images/cabezLogo.png";
import driverImg from "@/assets/images/driverImg.png";

const Index = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const userUUID = await AsyncStorage.getItem("userUUID");
      return !!userUUID;
    } catch (error) {
      console.error("Error checking auth:", error);
      return false;
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.replace("/login");
      } else {
        router.replace("/home");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={cabezLogo} />
      </View>
      <View style={styles.driverImgContainer}>
        <Image source={driverImg} />
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    top: "15%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  driverImgContainer: {
    position: "absolute",
    top: "60%",
    left: "10%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});