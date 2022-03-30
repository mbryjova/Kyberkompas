import React from "react";
import { TextInput, StyleSheet, View, Text, Image } from "react-native";
import colors from "../assets/colors/colors";
import { EXTRABOLD12 } from "../components/atoms/typography";

function InputComp(props) {
  return (
    <View>
      <View style={styles.textWrapper}>
        <Text style={EXTRABOLD12}>{props.header}</Text>
      </View>
      <View style={styles.input}>
        <Image style={styles.image} source={props.source} />
        <TextInput placeholder={props.name} onChangeText={props.onChangeText} />
      </View>
    </View>
  );
}

export default InputComp;

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: 343,
    borderWidth: 0.5,
    borderColor: colors.grey,
    borderRadius: 8,
    flexDirection: "row",
  },
  image: {
    marginRight: 7,
    marginLeft: 7,
    alignSelf: "center",
  },
  textWrapper: {
    marginLeft: 6,
    marginBottom: 5,
  },
});
