import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

interface RegisterProps {
  heroContent: string;
  subContent: string;
  img: any;
  btnText: string;
  onPressHandler: () => void;
}

const Register = ({
  heroContent,
  subContent,
  img,
  btnText,
  onPressHandler,
}: RegisterProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.heroContent}>{heroContent}</Text>
        <Text style={styles.subContent}>{subContent}</Text>
        <Image source={img} />
      </View>
      <View style={styles.btnContainer}>
        <Pressable onPress={onPressHandler} style={styles.btn}>
          <Text style={styles.btnText}>{btnText}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  heroSection: {
    paddingTop: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heroContent: {
    width: "100%",
    fontFamily: "newPorterSans",
    color: "#2e87f0",
    fontSize: 22,
    textAlign: "center",
  },
  subContent: {
    fontFamily: "PoppinsMedium",
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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

export default Register;
