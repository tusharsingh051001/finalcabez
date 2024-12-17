import React, { useEffect } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import registerPageImage from "@/assets/images/registerPageImage.png";
import { useNavigation, useRouter } from "expo-router";
import InfoComponent from "@/components/appComponents/infoComponents/InfoComponent";

const Register = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onPressHandler = () => {
    router.push("/info/upload");
  };

  return (
    <View style={styles.container}>
      <InfoComponent
        heroContent="Register yourself"
        subContent="Seamlessly register yourself to onboard by completing background checks."
        img={registerPageImage}
        btnText="Next"
        onPressHandler={onPressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
