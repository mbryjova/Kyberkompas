import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

/**
 * component of the sign-up screen
 */

function Signup(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Zaregistrujte se</Text>
      <Text style={styles.text}>Zadejte svůj email a heslo pro registraci</Text>
      <Button
        style={styles.button}
        onPress={() => props.navigation.navigate("TabNavigator")}
        title="Pokračovat"
      />
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  button: {
    top: 440,
  },
  container: {
    flex: 1,
  },
  headline: {
    fontSize: 32,
    top: 100,
    left: 16
    //fontFamily: Mulish-Bold
  },
  text: {
    fontSize: 16,
    top: 116,
    left: 16
    //fontFamily: Mulish-Regular
  },
});
