import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import InfoComponent from "@/components/appComponents/infoComponents/InfoComponent";
import moneyPageImg from "@/assets/images/moneyPageImg.png";

const Earn = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onPressHandler = () => {
    router.push("/info/policy");
  };

  return (
    <View>
      <InfoComponent
        heroContent="Earn Money"
        subContent="Earn Money as a premium cab service"
        img={moneyPageImg}
        btnText="Get Started"
        onPressHandler={onPressHandler}
      />
    </View>
  );
};

export default Earn;

const styles = StyleSheet.create({});
