import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import colors from "../assets/colors/colors";
import { BOLD16, BOLD32, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";
import Constants from "expo-constants";
import { post_to_url, POST_USER, SIGN_UP_URL } from "../database/queries";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FlatList } from "react-native-web";

/**
 * component of the sign-up screen
 */

function Signup(props) {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  // const [wrongPassword, setWrongPassword] = React.useState(false);
  // const [wrongUsername, setWrongUsername] = React.useState(false);

  const [result, setResult] = React.useState(null);

  const [error, setError] = React.useState(null);
  //const users = props.route.params.data;

  const handleSignup = async () => {
        await post_to_url(SIGN_UP_URL, {
          "email": email,
          "username": username,
          "password": password
        }, setResult);

        if (result != null && result.id != null) {
          props.navigation.navigate("Login");
        } else {
          setError(result)
        }
  }

  const renderError = (errorList) => {
    <View style={{width: "91%", backgroundColor: colors.wrong_light, padding: 15, borderRadius: 16}}>
            <FlatList
              data={errorList}
              renderItem={() => {
                <Text style={[REGULAR16]}>
                {item}
                </Text>
              }}
            />

          </View>
  }

  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      <View style={{width: "91%", backgroundColor: colors.primary, marginTop: "14%"}}>
      <Text style={[styles.headline, BOLD32]}>Registrace</Text>
      <Text style={REGULAR16}>Zadejte svůj email, uživatelské jméno a heslo pro registraci</Text>

      </View>
      <View style={{width: "100%", alignItems: 'center', marginTop: '14%'}}>
      <View style={styles.inputWrapper}>
      {/* <View style={{marginBottom: wrongUsername ? 0 : 20}}> */}
          <InputComp
            onChangeText={setUsername}
            header="USERNAME"
            name="Uživatelské jméno"
            source={require("../assets/images/user.png")}
            wrongInput={error !== null ? error.username : null}
          />
        {/* </View> */}
        {/* <View style={{marginBottom: wrongUsername ? 0 : 20}}> */}
          <InputComp
            onChangeText={setEmail}
            header="EMAIL"
            name="jmeno@email.com"
            source={require("../assets/images/mail.png")}
            wrongInput={error !== null ? error.email : null}
          />
        {/* </View>
        <View style={{marginBottom: wrongPassword ? 0 : 20}}> */}
        <InputComp
          onChangeText={setPassword}
          header="HESLO"
          name="********"
          source={require("../assets/images/lock.png")}
          wrongInput={error !== null ? error.password : null}
          secureTextEntry={true}
        />

        {/* </View> */}

      </View>
      </View>
      {
        error != null && error.password !== null && (
          renderError(error.password)
        )
      }
      {
        error != null && error.username !== null && (
          renderError(error.username)
        )
      }
      {
        error != null && error.email !== null && (
          renderError(error.email)
        )
      }
      {/* {
        wrongUsername && (
          <View style={{width: "91%", backgroundColor: colors.wrong_light, padding: 15, borderRadius: 16}}>
            <Text style={[REGULAR16]}>
            Tento e-mail už je zaregistrovaný. Zapomněli jste heslo?
            <Text style={[BOLD16]}> Ano</Text>
            </Text>
            <Text style={[BOLD16]}>
              Ano
            </Text>
          </View>
        )
      } */}
      <View style={styles.button}>
        <BigButton
          onPress={handleSignup}
          name="Zaregistrovat se"
        />
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}

export default Signup;

const styles = StyleSheet.create({
  button: {
    //alignSelf: "center",
    //top: 440,
    //marginTop: '60%'
    marginVertical: 10,
    //marginTop: 10
  },
  container: {
    backgroundColor: colors.correct,
    flex: 1,
    alignItems: 'center',
    marginTop: Constants.statusBarHeight
    
  },
  headline: {
    marginBottom: 10
    //top: 100,
    //margin: 16
    //left: 16,
  },
  input: {
    //marginBottom: 20
  },
  inputWrapper: {
    //position: 'absolute',
    //top: 228,
    //alignSelf: 'center',
    width: "91%"

  }
});
