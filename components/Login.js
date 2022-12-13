import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import colors from "../assets/colors/colors";
import { BOLD32 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserContext } from "./context/context";
import { get_from_url, USER_ME_URL } from "../database/queries";
import * as SecureStore from "expo-secure-store";

/**
 * component of the login screen
 */

function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [result, setResult] = React.useState(false);

  const [user, setUser] = React.useContext(UserContext);

  React.useEffect(() => {
    if (user != null) {
      props.navigation.navigate("TabNavigator");
    }
  }, [user]);

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  /**
   * handles authentication, stores token and sets authenticated user
   */
  const handleAuth = async () => {
    const my_user = {
      password: password,
      email: username,
    };

    await axios
      .request({
        url: "http://172.26.5.28/api/user/token/login",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          password: password,
          username: username,
        },
      })
      .then((response) => {
        setResult(response.data);
        save("token", "Token ".concat(response.data.auth_token));
      })
      .catch((error) => {
        setResult(error.response.data);
      });
    await get_from_url(setUser, USER_ME_URL);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.85,
              justifyContent: "space-evenly",
              marginTop: "6%",
            }}
          >
            <Text style={[styles.headline, BOLD32]}>
              Vítejte v{"\n"} KYBERKOMPASU
            </Text>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />

            <View style={styles.inputWrapper}>
              <InputComp
                onChangeText={setUsername}
                header="UŽIVATELSKÉ JMÉNO"
                name="Uživatelské jméno"
                secureTextEmpty={false}
                source={require("../assets/images/user.png")}
                wrongInput={
                  result != null && result.non_field_errors != null
                    ? result.non_field_errors
                    : result != null
                    ? result.username
                    : null
                }
              />
              <InputComp
                onChangeText={setPassword}
                header="HESLO"
                name="********"
                secureTextEntry={true}
                source={require("../assets/images/lock.png")}
                wrongInput={
                  result != null && result.non_field_errors != null
                    ? result.non_field_errors
                    : result != null
                    ? result.password
                    : null
                }
              />
            </View>
          </View>

          <View
            style={{
              flex: 0.2,
            }}
          >
            <View style={styles.button}>
              <BigButton
                name="PŘIHLÁSIT SE"
                onPress={async () => {
                  await handleAuth();
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
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  headline: {
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
  },
  inputWrapper: {
    alignSelf: "center",
    width: "91%",
  },
  logo: {
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
    justifyContent: "center",
    alignItems: "center",
  },
});
