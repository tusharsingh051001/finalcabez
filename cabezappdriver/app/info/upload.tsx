import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import InfoComponent from "@/components/appComponents/infoComponents/InfoComponent";
import documentsPageImg from "@/assets/images/documentsPageImg.png";

const Upload = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onPressHandler = () => {
    router.push("/info/earn");
  };

  return (
    <View>
      <InfoComponent
        heroContent="Upload Documents"
        subContent="Upload Documents in 4 simple steps to get started"
        img={documentsPageImg}
        btnText="Next"
        onPressHandler={onPressHandler}
      />
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({});
