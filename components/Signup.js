import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList} from "react-native";
import colors from "../assets/colors/colors";
import { BOLD16, BOLD32, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";
import Constants from "expo-constants";
//import { post_to_url, POST_USER, SIGN_UP_URL } from "../database/queries";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

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
        await axios.request(
          {
            url: 'http://172.26.5.28/api/user/',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data: {
              "email": email,
              "username": username,
              "password": password
            }
          }
        ).then(
          (response) => {
            setResult(response);

            // aby tam potom nesvítily červený věci
            setError(null);
            console.log(response)
          }
        ).catch(
          error => {
            console.log("signup:", error);
            setError(error.response.data);
            console.log(error.response.data, error)
        })
        // if (result != null) {
        //   props.navigation.navigate("Login");
        // }
  }

  
  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>
      <View style={{width: "91%", 
      //backgroundColor: colors.primary, 
      marginTop: "14%"}}>
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
        result != null && (
          <View style={{
            borderRadius: 16,
            backgroundColor:  colors.correct_light,
            borderColor:  colors.correct_light,
            //height: 150, // kdyby tady byly procenta tak se to mění
            width: "91%",
            padding: "6%",
            alignSelf: 'center'}}>
          <Text>
            ok
          </Text>
          </View>
        )
      }

      <View style={styles.button}>
        <BigButton
          onPress={ result == null ? handleSignup : props.navigation.navigate("TabNavigator")}
          name={result == null ? "Zaregistrovat se" : "Pokračovat"}
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
    //backgroundColor: colors.correct,
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
