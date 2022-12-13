import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../assets/colors/colors";

/**
 *
 * @param props.name
 * @param props.onPress
 * @returns component representing the big yellow button
 */

function BigButton(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.name}</Text>
    </TouchableOpacity>
  );
}

export default BigButton;

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 335,
    height: 52,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.blackText,
    borderWidth: 0.5,
    opacity: 1,
  },
  title: {
    textAlign: "center",
    fontFamily: "Mulish_700Bold",
    fontSize: 15,
    textTransform: "uppercase",
  },
});
