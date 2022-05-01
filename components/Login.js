import React from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";

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

  const [wrongPassword, setWrongPassword] = React.useState(false);
  const [wrongUsername, setWrongUsername] = React.useState(false);

  const [users, setUsers] = React.useState(require("../data/db.json").users);
  const [currentUser, setCurrentUser] = React.useState(null);

  
  //console.log(wrongPassword);
  const handleLogin = () => {
    if (password.length < 5) {
      setWrongPassword(true);
      console.log("password not given or short");
    }
    else if (username == "") {
      setWrongUsername(true);
      console.log("username not given");
    }
    else {
      //setUsers(require("../data/db.json").users);
      const current = users.filter((user) => user.email == username);
      setCurrentUser(current[0]);
      if (current.length == 0) {
        setWrongUsername(true);
        console.log("email not in database", username)
      }
      else {
        setWrongUsername(false);
        console.log(current);
       // setCurrentUser(current[0]);
        if (currentUser.password == password) {
          setWrongPassword(false)
          props.callback(currentUser)
          props.navigation.navigate("TabNavigator");
        } else {
          console.log("wrong password", password);
          setWrongPassword(true);
        }
      }
    }

  }

  return (
    <View>
      <Text style={[styles.headline, BOLD32]}>
        Vítejte v{"\n"} KYBERKOMPASU
      </Text>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      <KeyboardAvoidingView style={styles.inputWrapper}
      behavior='position'
      >
        {/**tady bylo styles.input */}
        <View style={{marginBottom: wrongUsername ? 0 : 20}}>
          <InputComp
            onChangeText={setUsername}
            header="EMAIL"
            name="jmeno@email.com"
            secureTextEmpty={false}
            source={require("../assets/images/mail.png")}
            wrongInput={wrongUsername}
            error="Nesprávný e-mail"
          />
        </View>
        <InputComp
          onChangeText={setPassword}
          header="HESLO"
          name="********"
          secureTextEntry={true}
          source={require("../assets/images/lock.png")}
          wrongInput={wrongPassword}
          error="Nesprávné heslo"
        />
      </KeyboardAvoidingView>

      <View style={styles.button}>
        <BigButton
          name="PŘIHLÁSIT SE"
           onPress={() => {
             props.navigation.navigate("TabNavigator");
          //   handleLogin;
           }}
          //onPress={handleLogin}
        />
      </View>

      <View style={styles.signUpWrapper}>
        <Text style={styles.noAccountText}>Nemáte účet?</Text>
        <Text
          style={styles.signUp}
          onPress={() => props.navigation.navigate("Signup", {data: users})}
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
    marginBottom: 20 // dát jen když je input správně
  },
  inputWrapper: {
    position: "absolute",
    top: 371,
    alignSelf: "center",
    backgroundColor: colors.primary,
    width: "91%"
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
