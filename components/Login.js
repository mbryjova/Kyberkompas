import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

function Login(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <Button
        onPress={() => props.navigation.navigate("TabNavigator")}
        title="Přihlásit se"
      />

      <Button
        onPress={() => props.navigation.navigate("Signup")}
        title="Zaregistrovat se"
      />
    </View>
  );
}

export default Login;

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
