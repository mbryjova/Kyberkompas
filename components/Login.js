import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { loadAsync, useFonts } from "expo-font";

import colors from "../assets/colors/colors";
import BigButton from "./BigButton";

/**
 * component of the login screen
 */

function Login(props) {
  // doplnit co se stane když se nenačte font

  /*loadAsync({
    MulishBold: require("../assets/fonts/Mulish-Bold.ttf"),
    MulishSemiBold: require("../assets/fonts/Mulish-SemiBold.ttf"),
  });
  */

  return (
    <View>
      <Text style={styles.headline}>Vítejte v{"\n"} KYBERKOMPASU</Text>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      <Pressable
        //onPress={() => props.navigation.navigate("TabNavigator")}
        style={styles.button}
      >
        {BigButton("PŘIHLÁSIT SE", "TabNavigator")}
      </Pressable>

      <View style={styles.signUpWrapper}>
        <Text
          style={styles.noAccountText}
        >
          Nemáte účet?
        </Text>
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

  // style of the headline text
  headline: {
    textAlign: "center",
    fontSize: 32,
    //fontFamily: "MulishBold",
    top: 76,
  },
  logo: {
      position: 'absolute',
      top: 190,
      alignSelf: 'center'
  },
  noAccountText: {
    color: colors.grey,
    //fontFamily: 'MulishSemiBold',

    marginRight: 17,
  },
  signUp: {
    color: colors.blackText,
    //fontFamily: 'Mulish-Bold',
  },
  signUpWrapper: {
    flexDirection: "row",
    marginRight: 17,
    fontSize: 16,
    top: 550,
    justifyContent: "center",
    alignItems: "center",
  },
});
