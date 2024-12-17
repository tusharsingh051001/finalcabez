import { StyleSheet, Text, SafeAreaView, StatusBar, View } from "react-native";
import React from "react";

const Index = () => {
  return (
    // <SafeAreaView style={styles.container}>
    //   <View style={{ marginTop: 200, backgroundColor: "red" }}>
    //     <Text>index</Text>
    //   </View>
    // </SafeAreaView>
    <View>
      <Text style={{ color: "red" }}>index</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
