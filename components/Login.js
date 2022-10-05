import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import colors from "../assets/colors/colors";
import { BOLD32 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LOGIN } from "../database/queries";
import { UserContext } from "../App";

/**
 * component of the login screen
 */

function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [wrongPassword, setWrongPassword] = React.useState(false);
  const [wrongUsername, setWrongUsername] = React.useState(false);

  const [user, setUser] = React.useContext(UserContext);

  React.useEffect(() => {
    //GET_USERS(setUsers);
    //console.log(users);
    if (user != null) {
      props.navigation.navigate("TabNavigator");
    }
  }, [user]);

  // const handleLogin = (new_user) => {
  //   //setUser(new_user);
  //   console.log("setting user context", user);
  //   if (user != null) {
  //     props.navigation.navigate("TabNavigator");
  //   }
  // }

  const handleAuth = async () => {
    const my_user = {
      password: password,
      email: username,
    };
    const new_user = await LOGIN(my_user);
    return new_user;
    // if (user == null) {
    //   setWrongPassword(true);
    //   setWrongUsername(true);
    //   //chyba
    // } else {
    //   await props.navigation.navigate("TabNavigator");
    // }
    // if user == null -> chyba
  };
  return (
    // contentContainerStyle={{backgroundColor: colors.correct, flex: 1}}
    <ScrollView 
    style={{flex: 1}}
    contentContainerStyle={{minHeight: '100%'}} // minHeight - bude se to scrollovat - zajímavý?
    >
    <KeyboardAwareScrollView
      contentContainerStyle={{ backgroundColor: colors.correct, flex: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={(Platform.OS === 'ios')}
    >
      <View style={{ flex: 1, backgroundColor: colors.correct }}>
        <View
          style={{
            backgroundColor: colors.wrong_light,
            flex: 0.85,
            justifyContent: "space-evenly",
            marginTop: "6%",
          }}
        >
          <Text
            style={[styles.headline, BOLD32, { backgroundColor: colors.wrong }]}
          >
            Vítejte v{"\n"} KYBERKOMPASU
          </Text>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />

          {/**tady bylo styles.input */}
          <View style={styles.inputWrapper}>
            <View style={{ marginBottom: wrongUsername ? 0 : 20 }}>
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
          </View>
        </View>
        {/* </KeyboardAwareScrollView> */}

        <View style={{ backgroundColor: colors.white, flex: 0.2 }}>
          <View style={styles.button}>
            <BigButton
              name="PŘIHLÁSIT SE"
              //  onPress={() => {
              //      props.navigation.navigate("TabNavigator");
              // //     //handleLogin;
              //   }}
              onPress={async () => {
                const new_user = await handleAuth();
                setUser(new_user);
                //console.log("new_user:", new_user, user);
                //handleLogin(new_user)
              }}
            />
          </View>

          <View style={styles.signUpWrapper}>
            <Text style={styles.noAccountText}>Nemáte účet?</Text>
            <Text
              style={styles.signUp}
              onPress={() => props.navigation.navigate("Signup", { data: [] })}
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
    backgroundColor: colors.wrong_light,
  },
  headline: {
    textAlign: "center",
  },
  input: {
    marginBottom: 20, // dát jen když je input správně
  },
  inputWrapper: {
    alignSelf: "center",
    backgroundColor: colors.primary,
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
    backgroundColor: colors.primary,
  },
});
