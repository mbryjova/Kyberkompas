import React from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView } from "react-native";

import colors from "../assets/colors/colors";
import { BOLD32 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";

/**
 * component of the login screen
 */

function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View>
      <Text style={[styles.headline, BOLD32]}>
        Vítejte v{"\n"} KYBERKOMPASU
      </Text>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      <View style={styles.inputWrapper}>
        <View style={styles.input}>
          <InputComp
            onChangeText={setUsername}
            header="EMAIL"
            name="jmeno@email.com"
            secureTextEmpty={false}
            source={require("../assets/images/mail.png")}
          />
        </View>
        <InputComp
          onChangeText={setPassword}
          header="HESLO"
          name="********"
          secureTextEmpty={true}
          source={require("../assets/images/lock.png")}
        />
      </View>

      <View style={styles.button}>
        <BigButton
          name="PŘIHLÁSIT SE"
          onPress={() => {
            props.navigation.navigate("TabNavigator");
          }}
        />
      </View>

      <View style={styles.signUpWrapper}>
        <Text style={styles.noAccountText}>Nemáte účet?</Text>
        <Text
          style={styles.signUp}
          onPress={() => props.navigation.navigate("Signup")}
        >
          Zaregistrujte se
        </Text>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 500,
  },
  headline: {
    textAlign: "center",
    top: 76,
  },
  input: {
    marginBottom: 20,
  },
  inputWrapper: {
    position: "absolute",
    top: 371,
    alignSelf: "center",
  },
  logo: {
    position: "absolute",
    top: 190,
    alignSelf: "center",
  },
  noAccountText: {
    color: colors.grey,
    fontFamily: "Mulish_600SemiBold",

    marginRight: 17,
  },
  signUp: {
    color: colors.blackText,
    fontFamily: "Mulish_700Bold",
  },
  signUpWrapper: {
    flexDirection: "row",
    fontSize: 16,
    top: 550,
    justifyContent: "center",
    alignItems: "center",
  },
});
