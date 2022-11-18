import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import axios from "axios";
import colors from "../assets/colors/colors";
import { BOLD32 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserContext } from "../App";
//import { UserContext } from "./context/context";
import { get_from_url, USER_ME_URL } from "../database/queries";
import * as SecureStore from 'expo-secure-store';

/**
 * component of the login screen
 */

function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [result, setResult] = React.useState(false);
  //const [wrongUsername, setWrongUsername] = React.useState(false);

  const [user, setUser, token, setToken] = React.useContext(UserContext);
  //const context = useUserContext();

  React.useEffect(() => {
    if (user != null) {
      props.navigation.navigate("TabNavigator");
    }
  }, [user]);

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  }

  const get_value = async (key) => {
    const value = await SecureStore.getItemAsync(key);
    return value;
  }

  const handleAuth = async () => {
    const my_user = {
      password: password,
      email: username,
    };

    // tady ještě není v headeru token
    // musím importovat axios
    await axios.request(
      {
        url: 'http://172.26.5.28/api/user/token/login',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
          "password": password,
          "username": username
          // "password": "admin",
          // "username": "admin"
        }
      }
    ).then((response) => {
      setResult(response.data)
      console.log("response data:", response.data);
      save('token', 'Token '.concat(response.data.auth_token));
    }).catch(error => {
    console.log("login:", error);
    setResult(error.response.data);
    console.log("error:", result)
    });
    //console.log(token);
    const value = await get_value('token');
    console.log("token", value);
    await get_from_url(setUser, USER_ME_URL);
    console.log("logged user:", user);
  };
  return (
    // contentContainerStyle={{backgroundColor: colors.correct, flex: 1}}
    <ScrollView 
    style={{flex: 1}}
    contentContainerStyle={{minHeight: '100%'}} // minHeight - bude se to scrollovat - zajímavý?
    >
    <KeyboardAwareScrollView
      contentContainerStyle={{ 
        //backgroundColor: colors.correct, 
        flex: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={(Platform.OS === 'ios')}
    >
      <View style={{ flex: 1, 
        //backgroundColor: colors.correct 
        }}>
        <View
          style={{
            //backgroundColor: colors.wrong_light,
            flex: 0.85,
            justifyContent: "space-evenly",
            marginTop: "6%",
          }}
        >
          <Text
            style={[styles.headline, BOLD32, 
              //{ backgroundColor: colors.wrong }
            ]}
          >
            Vítejte v{"\n"} KYBERKOMPASU
          </Text>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />

          {/**tady bylo styles.input */}
          <View style={styles.inputWrapper}>
            {/* <View style={{ marginBottom: wrongUsername ? 0 : 20 }}> */}
              <InputComp
                onChangeText={setUsername}
                //header="EMAIL" // uživatelské jméno
                //name="jmeno@email.com"
                header="USERNAME"
                name="Uživatelské jméno"
                secureTextEmpty={false}
                source={require("../assets/images/user.png")} // změnit na panáček - ok
                wrongInput={result != null && result.non_field_errors != null ? result.non_field_errors : (result != null ? result.username : null)}
                //error="Nesprávný e-mail"
              />
            {/* </View> */}
            <InputComp
              onChangeText={setPassword}
              header="HESLO"
              name="********"
              secureTextEntry={true}
              source={require("../assets/images/lock.png")}
              wrongInput={result != null && result.non_field_errors != null ? result.non_field_errors : (result != null ? result.password : null)}
              //error="Nesprávné heslo"
            />
          </View>
        </View>
        {/* </KeyboardAwareScrollView> */}

        <View style={{ 
          //backgroundColor: colors.white, 
          flex: 0.2 }}>
          <View style={styles.button}>
            <BigButton
              name="PŘIHLÁSIT SE"
              onPress={async () => {
                await handleAuth();
                //setUser(new_user);
                //console.log("new_user:", new_user, user);
                //handleLogin(new_user)
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
        {/* </View> */}
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
    //backgroundColor: colors.wrong_light,
  },
  headline: {
    textAlign: "center",
  },
  input: {
    marginBottom: 20, // dát jen když je input správně
  },
  inputWrapper: {
    alignSelf: "center",
    //backgroundColor: colors.primary,
    width: "91%"
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
    //backgroundColor: colors.primary,
  },
});
