import React from "react";
import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";
import {
  GET,
  URL_BREACHES,
  ACTIVITY_FINISHED,
  URL_ACTIVITIES,
} from "../database/queries";
import { BOLD16, BOLD20, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";
import { UserContext } from "../App";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function APIActivity(props) {
  // proč tady mám?
  const [wrong, setWrong] = React.useState(false);
  const [user, setUser, token, setToken] = React.useContext(UserContext);

  const [input, setInput] = React.useState("");

  /**
   * 1 - getting user input
   * 2 - finishig the activity
   * 3 - account doesnt exist
   */
  const [status, setStatus] = React.useState(1);

  const [breaches, setBreaches] = React.useState([]);
  const [validate, setValidate] = React.useState(false);

  const [errorStatus, setErrorStatus] = React.useState(0);
  //const { screenHeight } = Dimensions.get('screen').height;


  React.useEffect(async () => {
    console.log(errorStatus);
    if (validate) {
      await GET(setBreaches, URL_BREACHES.concat(input), setErrorStatus);
      console.log("here", errorStatus);
      setStatus(2);
    }
  }, [validate]);

  return (
    <View style={styles.container}>
      
        {/* title */}
        <Text style={[BOLD20, styles.title]}>Byl váš účet prolomen?</Text>

        {/* description */}
        <Text style={[REGULAR16, styles.description]}>
          Zadejte email a zjistětě, zda byl váš učet někde prolomen.
        </Text>
        <View style={{ width: "100%", marginTop: 5, marginBottom: 20 }}>
          <InputComp
            onChangeText={setInput}
            header=""
            name=""
            secureTextEmpty={false}
            source={require("../assets/images/mail.png")}
            wrongInput={wrong}
            error="Email cant be empty"
          />
        </View>

      {status == 3 ? (
        <View>
          <Text>doesnt exist</Text>
        </View>
      ) : null}
      {status == 1 ? (
        <View style={styles.button}>
          <BigButton
            name="zkontrolovat"
            onPress={() => {
              //validate();
              setValidate(true);
            }}
          />

        </View>
      ) : null}
      {status == 2 ? (
        <View style={{ flex: 1, justifyContent: 'space-between'}}>
          {breaches.length == 0 ? (
            <View
              style={{
                borderRadius: 16,
                backgroundColor: colors.correct_light,
                borderColor: colors.correct_light,
                //height: "40%",
                width: "100%",
                padding: "6%",
                alignSelf: 'center'
              }}
            >
              <Text
                style={[
                  BOLD20,
                  { textTransform: "uppercase", marginBottom: 10 },
                ]}
              >
                chráněn
              </Text>
              <Text style={REGULAR16}>
                Dobrý, žádný váš účet není evidovaný v databázi datových úniků.
              </Text>
            </View>
          ) : (
            <View style={{width: '100%', alignSelf: 'center'}}>
              <FlatList
                contentContainerStyle={{
                  borderRadius: 16,
                  backgroundColor: colors.wrong_light,
                  borderColor: colors.correct_light,
                  alignSelf: "center",
                  //width: "90%",
                  padding: "6%",
                }}
                data={breaches}
                keyExtractor={(item) => item.Name}
                ListHeaderComponent={() => {
                  return (
                    <Text style={[BOLD16, { marginBottom: 10 }]}>
                      Váš účet je evidován v těchto únicích:
                    </Text>
                  );
                }}
                renderItem={({ item }) => {
                  return <Text style={REGULAR16}>{item.Name}</Text>;
                }}
              />
            </View>
          )}
          <View style={{marginBottom: 40}}>
            <BigButton
              name="dokončit"
              onPress={() => {
                ACTIVITY_FINISHED(
                  URL_ACTIVITIES.concat("hesla/"),
                  props.route.params,
                  2,
                  user.id
                ); // 2 points

                props.navigation.navigate("ActivityFinished", {
                  points: 2,
                  name: props.route.params.module_name,
                });
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default APIActivity;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.correct_light,
    flex: 1,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    marginTop: 50,
    textAlign: 'center'

  },
  description: {
    marginTop: 20 ,
    textAlign: 'center'
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
    //flexDirection: 'column-reverse',
    //alignSelf: 'flex-end',
    backgroundColor: colors.wrong,

  }
})
