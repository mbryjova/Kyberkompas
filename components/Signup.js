import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BOLD32 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";

/**
 * component of the sign-up screen
 */

function Signup(props) {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  

  return (
    <View style={styles.container}>
      <Text style={[styles.headline, BOLD32]}>Registrace</Text>
      <Text style={styles.text}>Zadejte svůj email a heslo pro registraci</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.input}>
          <InputComp
            onChangeText={setUsername}
            header="EMAIL"
            name="jmeno@email.com"
            source={require("../assets/images/mail.png")}
          />
        </View>
        <InputComp
          onChangeText={setPassword}
          header="HESLO"
          name="********"
          source={require("../assets/images/lock.png")}
        />
      </View>
      <View style={styles.button}>
        <BigButton
          //onPress={() => props.navigation.navigate("TabNavigator")}
          onPress={}
          name="POKRAČOVAT"
        />
      </View>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    top: 440,
  },
  container: {
    flex: 1,
  },
  headline: {
    top: 100,
    left: 16,
  },
  input: {
    marginBottom: 20
  },
  inputWrapper: {
    position: 'absolute',
    top: 228,
    alignSelf: 'center',
    width: "91%"

  },
  text: {
    fontSize: 16,
    top: 110,
    left: 16,
    fontFamily: "Mulish_400Regular",
  },
});
