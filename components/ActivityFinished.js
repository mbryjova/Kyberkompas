import React from "react";
import { View, Text, Image } from "react-native";
import colors from "../assets/colors/colors";
import { BOLD23, BOLD32, SEMIBOLD16 } from "./atoms/typography";
import BigButton from "./BigButton";

/**
 *
 * @param props.route.params.max_points - max points for the activity
 * @param props.route.params.points - points user got from activity
 * @param props.route.params.name - name of the module we came from
 * @param props.route.params.from_challenge - if we came from challenge
 *
 * @returns component for rendering the screen of finished activity
 */
function ActivityFinished(props) {
  return (
    <View
      style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}
    >
      <View style={{ margin: "8%" }}>
        <Image source={require("../assets/images/finished_icon.png")}></Image>
      </View>
      <Text style={[BOLD32, { color: colors.primary, marginBottom: "5%" }]}>
        {"+ " + Math.round(props.route.params.points) + " b"}
      </Text>

      <View style={{ alignItems: "center", flex: 2, width: "91%" }}>
        {props.route.params.points == props.route.params.max_points ? (
          <Text style={[BOLD23, { marginBottom: "5%" }]}>
            Aktivita dokončena!
          </Text>
        ) : (
          <Text style={[BOLD23, { marginBottom: "5%", textAlign: "center" }]}>
            Na dokončení aktivity chybí{" "}
            {Math.round(
              props.route.params.max_points - props.route.params.points
            )}{" "}
            b.
          </Text>
        )}
        <Text style={[SEMIBOLD16, { textAlign: "center" }]}>
          Podívejte se na další aktivity.
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <BigButton
          name="na další aktivity"
          onPress={() =>
            props.route.params.from_challenge
              ? props.navigation.navigate("Výzvy")
              : props.navigation.navigate("Module", {
                  name: props.route.params.name,
                })
          }
        />
      </View>
    </View>
  );
}

export default ActivityFinished;
