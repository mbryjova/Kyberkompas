import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import colors from "../assets/colors/colors";
import { BOLD32, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

/**
 *
 * @param {*} props
 * @returns component that renders sign up screen
 */
function Signup(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [result, setResult] = React.useState(null);

  const [error, setError] = React.useState(null);

  /**
   * communicates with the server
   */
  const handleSignup = async () => {
    await axios
      .request({
        url: "http://172.26.5.28/api/user/",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          email: email,
          username: username,
          password: password,
        },
      })
      .then((response) => {
        setResult(response);

        setError(null);
      })
      .catch((error) => {
        console.log("signup:", error);
        setError(error.response.data);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={{ width: "91%", marginTop: "14%" }}>
          <Text style={[styles.headline, BOLD32]}>Registrace</Text>
          <Text style={REGULAR16}>
            Zadejte svůj email, uživatelské jméno a heslo pro registraci
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: "14%" }}>
          <View style={styles.inputWrapper}>
            <InputComp
              onChangeText={setUsername}
              header="UŽIVATELSKÉ JMÉNO"
              name="Uživatelské jméno"
              source={require("../assets/images/user.png")}
              wrongInput={error !== null ? error.username : null}
            />

            <InputComp
              onChangeText={setEmail}
              header="EMAIL (nepovinné)"
              name="jmeno@email.com"
              source={require("../assets/images/mail.png")}
              wrongInput={error !== null ? error.email : null}
            />

            <InputComp
              onChangeText={setPassword}
              header="HESLO"
              name="********"
              source={require("../assets/images/lock.png")}
              wrongInput={error !== null ? error.password : null}
              secureTextEntry={true}
            />
          </View>
        </View>
        {result != null && (
          <View
            style={{
              borderRadius: 16,
              backgroundColor: colors.correct_light,
              borderColor: colors.correct_light,
              marginTop: 15,
              marginBottom: 15,
              width: "91%",
              padding: "6%",
              alignSelf: "center",
            }}
          >
            <Text style={REGULAR16}>Uživatel byl úspěšně zaregistrován</Text>
          </View>
        )}

        {result == null && (
          <View style={styles.button}>
            <BigButton onPress={handleSignup} name={"Zaregistrovat se"} />
          </View>
        )}

        {result != null && (
          <View style={styles.button}>
            <BigButton
              onPress={() => props.navigation.navigate("Login")}
              name={"Přihlásit se"}
            />
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Signup;

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  headline: {
    marginBottom: 10,
  },
  input: {},
  inputWrapper: {
    width: "91%",
  },
});
