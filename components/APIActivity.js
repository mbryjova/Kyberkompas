import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import colors from "../assets/colors/colors";
import { GET, URL_BREACHES, ACTIVITY_FINISHED, URL_ACTIVITIES } from "../database/queries";
import { BOLD16, BOLD20, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";
import { UserContext } from "../App";

function APIActivity(props) {
  const [input, setInput] = React.useState("");

  /**
   * 1 - getting user input
   * 2 - finishig the activity
   */
  const [status, setStatus] = React.useState(1);
  const [wrong, setWrong] = React.useState(false);
  //const [OK, setOK] = React.useState(true);
  const [user, setUser] = React.useContext(UserContext);

  const [breaches, setBreaches] = React.useState([]);
  const [validate, setValidate] = React.useState(false);

  const [errorStatus, setErrorStatus] = React.useState(0);

  React.useEffect(async () => {
    // if (breaches.length != 0) {
    //     //setWrong(true);
    //     setOK(false);
    // }
    // console.log(breaches);
    // if (input.length == 0) {
    //       setWrong(true);
    //     }
    //setErrorStatus(0);
    console.log(errorStatus);
    if (validate) {
      await GET(setBreaches, URL_BREACHES.concat(input), setErrorStatus);
      console.log("here", errorStatus);
      setStatus(2)
    }
    // if (validate && errorStatus == undefined) {
    //   setStatus(2)
    // }
    // if (validate && errorStatus != undefined) {
    //   setStatus(3)
    // }
  }, [validate]);

  // const validate = async () => {
  //   if (input.length == 0) {
  //     setWrong(true);
  //   }
  //   await GET(setBreaches, URL_BREACHES.concat(input));
  // };
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          height: "30%",
          marginTop: "10%",
          justifyContent: "space-evenly",
          width: "90%",
          alignSelf: "center",
        }}
      >
        <Text style={BOLD20}>Byl váš účet prolomen?</Text>

        <Text style={REGULAR16}>
          Zadejte email a zjistětě, zda byl váš učet někde prolomen.
        </Text>
        <View style={{ width: "100%" }}>
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
      </View>
        {
          status == 3 ? (
            <View>
              <Text>
                doesnt exist
              </Text>
            </View>
          ) : null
        }
      {status == 1 ? (
        <View style={{ height: "70%", alignItems: "center" }}>
          <BigButton
            name="zkontrolovat"
            onPress={() => {
              //validate();
              setValidate(true);
            }}
          />
        </View>
      ) : null}
      { status == 2 ? (
        <View style={{ height: "70%", alignItems: "center" }}>
          {breaches.length == 0 ? (
            <View
              style={{
                borderRadius: 16,
                backgroundColor: colors.correct_light,
                borderColor: colors.correct_light,
                height: "40%",
                width: "90%",
                padding: "6%",
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
            <View
              style={{ height: "40%", width: "100%" }}
            >
              <FlatList
                contentContainerStyle={{
                  borderRadius: 16,
                  backgroundColor: colors.wrong_light,
                  borderColor: colors.correct_light,
                  alignSelf: "center",
                  width: "90%",
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
          <View>
            <BigButton name="dokončit" onPress={ () =>
                {ACTIVITY_FINISHED(URL_ACTIVITIES.concat("hesla/"), props.route.params, 2, user.id); // 2 points

                props.navigation.navigate("ActivityFinished", { points: 2, name: props.route.params.module_name });}
            } />
          </View>
        </View>
          
      ) : null}
    </View>
  );
}

export default APIActivity;

