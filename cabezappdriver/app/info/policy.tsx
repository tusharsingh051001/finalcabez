import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import policyImage1 from "@/assets/images/policyImage1.png";
import policyImage2 from "@/assets/images/policyImage2.png";
import policyLocatorImage from "@/assets/images/policyLocatorImage.png";
import policyWorldImage from "@/assets/images/policyWorldImage.png";
import policyManImage from "@/assets/images/policyManImage.png";
import { useNavigation, useRouter } from "expo-router";

const Policy = () => {
  const router = useRouter();
  const navigation = useNavigation();

  // Hide header when the screen is mounted
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onPressHandler = () => {
    router.push("/auth/login/" as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.img1} source={policyImage1} />
        <Image style={styles.img2} source={policyImage2} />
        <Image style={styles.img3} source={policyWorldImage} />
        <Image style={styles.img4} source={policyLocatorImage} />
        <Image style={styles.img5} source={policyManImage} />
      </View>
      <Text style={styles.text}>
        Don't worry, your data is stored privately and only shared with parents
        for safety purposes.
      </Text>
      <Pressable onPress={onPressHandler} style={styles.btn}>
        <Text style={styles.btnText}>Allow Location</Text>
      </Pressable>
    </View>
  );
};

export default Policy;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the whole screen
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30, // Space at the bottom to avoid overlap with text and button
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300, // Limit the height of the image container to ensure other content is visible
    marginBottom: 40, // Space between the images and the content below
  },
  img1: {
    position: "absolute",
    top: "10%", // Adjusted positioning of the first image
    left: "30%",
    transform: "translateX(-50%)",
  },
  img2: {
    position: "absolute",
    top: "30%", // Adjusted positioning for the second image
    left: "40%",
    transform: "translateX(-50%)",
  },
  img3: {
    position: "absolute",
    top: "35%", // Adjusted positioning for the third image
    left: "44%",
    transform: "translateX(-50%)",
  },
  img4: {
    position: "absolute",
    top: "30%", // Adjusted positioning for the fourth image
    left: "48%",
    transform: "translateX(-50%)",
  },
  img5: {
    position: "absolute",
    top: 0, // Adjusted positioning for the fifth image
    left: "50%",
    transform: "translateX(-50%)",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20, // Padding on the sides for better readability
    marginBottom: 20, // Space between text and button
  },
  btn: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#3f97e8",
    width: "50%",
  },
  btnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
