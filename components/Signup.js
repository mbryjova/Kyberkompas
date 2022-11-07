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

/**
 * component of the sign-up screen
 */

function Signup(props) {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [wrongPassword, setWrongPassword] = React.useState(false);
  const [wrongUsername, setWrongUsername] = React.useState(false);

  const users = props.route.params.data;

  const handleSignup = async () => {
    
    const current = users.filter((user) => user.email == username);
    console.log(current.length, username)
    if (current.length > 0) {
      setWrongUsername(true);
      setWrongPassword(false)
    }
    else {
      setWrongUsername(false);
      if (password.length < 5) {
        setWrongPassword(true);
      }
      else {
        setWrongPassword(false);
        await post_to_url(SIGN_UP_URL, {
          "email": email,
          "username": username,
          "password": password
        })
        // POST_USER({
        //   "id": 10,
        //   "first_name": "new",
        //   "last_name": "user",
        //   "email": {username},
        //   "total_score": 0,
        //   "weekly_score": 0,
        //   "monthly_score": 0,
        //   "anual_score": 0,
        //   "image": "",
        //   "password": {password}
        // });
        props.navigation.navigate("TabNavigator");
      }
      //setWrongUsername(false);
    }


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
      <View style={{marginBottom: wrongUsername ? 0 : 20}}>
          <InputComp
            onChangeText={setUsername}
            header="USERNAME"
            name="Uživatelské jméno"
            source={require("../assets/images/user.png")}
            wrongInput={wrongUsername}
          />
        </View>
        <View style={{marginBottom: wrongUsername ? 0 : 20}}>
          <InputComp
            onChangeText={setEmail}
            header="EMAIL"
            name="jmeno@email.com"
            source={require("../assets/images/mail.png")}
            wrongInput={wrongUsername}
          />
        </View>
        <View style={{marginBottom: wrongPassword ? 0 : 20}}>
        <InputComp
          onChangeText={setPassword}
          header="HESLO"
          name="********"
          source={require("../assets/images/lock.png")}
          wrongInput={wrongPassword}
          secureTextEntry={true}
        />

        </View>

      </View>
      </View>
      {
        wrongPassword && (
          <View style={{width: "91%", backgroundColor: colors.wrong_light, padding: 15, borderRadius: 16}}>
            <Text style={[REGULAR16]}>
                Heslo musí mít alespoň 5 znaků.
            </Text>

          </View>
        )
      }
      {
        wrongUsername && (
          <View style={{width: "91%", backgroundColor: colors.wrong_light, padding: 15, borderRadius: 16}}>
            <Text style={[REGULAR16]}>
            Tento e-mail už je zaregistrovaný. Zapomněli jste heslo?
            <Text style={[BOLD16]}> Ano</Text>
            </Text>
            {/* <Text style={[BOLD16]}>
              Ano
            </Text> */}
          </View>
        )
      }
      <View style={styles.button}>
        <BigButton
          //onPress={() => props.navigation.navigate("TabNavigator")}
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
