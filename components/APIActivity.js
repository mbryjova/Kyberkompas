import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../assets/colors/colors";
import { post_to_url } from "../database/queries";
import { BOLD20, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";

/**
 *
 * @param props.route.params.from_challenge - if user came from challenge
 * @param props.route.params.challenge_id - id of the challenge
 * @param props.route.params.module_name - module name
 * @returns component for rendering the API Activity
 */
function APIActivity(props) {
  /** user input */
  const [input, setInput] = React.useState(" ");

  /**
   * 1 - getting user input
   * 2 - finishig the activity
   */
  const [status, setStatus] = React.useState(1);

  /**
   * response from the server
   */
  const [response, setResponse] = React.useState(null);

  // object of the activity
  const activity = props.route.params.activity;

  React.useEffect(() => {
    const setState = () => {
      if (response != null && response.achieved_score != null) {
        setStatus(2);
      }
    };
    setState();
  }, [response]);

  return (
    <View style={styles.container}>
      {/* title */}
      <Text style={[BOLD20, styles.title]}>{activity.title}</Text>

      {/* description */}
      <Text style={[REGULAR16, styles.description]}>
        {activity.description}
      </Text>
      <View style={{ width: "100%", marginTop: 5, marginBottom: 20 }}>
        <InputComp
          onChangeText={setInput}
          header=""
          name=""
          secureTextEmpty={false}
          source={require("../assets/images/lock.png")}
          wrongInput={
            response != null
              ? response.input == null
                ? [response.detail]
                : response.input
              : null
          }
        />
      </View>

      {status == 1 ? (
        <View style={styles.button}>
          {/* submits input to the server */}
          <BigButton
            name="zkontrolovat"
            onPress={async () => {
              await post_to_url(
                props.route.params.from_challenge
                  ? "challenges/"
                      .concat(props.route.params.challenge_id)
                      .concat("/submit/")
                  : "interactive-activity/"
                      .concat(activity.id)
                      .concat("/submit/"),
                { input },
                setResponse,
                setResponse
              );
            }}
          />
        </View>
      ) : null}
      {status == 2 ? (
        <View
          style={{ flex: 1, justifyContent: "space-between", width: "100%" }}
        >
          <View
            style={{
              borderRadius: 16,
              backgroundColor:
                response != null &&
                activity.max_score == response.achieved_score
                  ? colors.correct_light
                  : colors.wrong_light,
              borderColor:
                response != null &&
                activity.max_score == response.achieved_score
                  ? colors.correct_light
                  : colors.wrong_light,
              width: "100%",
              padding: "6%",
              alignSelf: "center",
            }}
          >
            <ScrollView>
              <Text style={REGULAR16}>
                {response != null ? response.message : null}
              </Text>
            </ScrollView>
          </View>

          <View style={{ marginBottom: 40, alignSelf: "center" }}>
            {/* navigates to ActivityFinished screen */}
            <BigButton
              name="dokončit"
              onPress={() => {
                props.navigation.navigate("ActivityFinished", {
                  from_challenge: props.route.params.from_challenge,
                  points: response.achieved_score,
                  name: props.route.params.module_name,
                  max_points: response.achieved_score,
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
    flex: 1,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  title: {
    marginTop: 50,
    textAlign: "center",
  },
  description: {
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 40,
  },
});
