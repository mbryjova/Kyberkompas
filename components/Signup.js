import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function Signup(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign up</Text>

      <Button
        onPress={() => props.navigation.navigate("TabNavigator")}
        title="Pokračovat"
      />
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
  },
});
