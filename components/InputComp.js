import React from "react";
import { TextInput, StyleSheet, View, Text, Image } from "react-native";
import colors from "../assets/colors/colors";
import {
  EXTRABOLD12,
  REGULAR12,
  REGULAR14,
} from "../components/atoms/typography";

function InputComp(props) {
  return (
    <View>
      <View style={styles.textWrapper}>
        <Text
          style={[
            EXTRABOLD12,
            { color: props.wrongInput != null ? colors.wrong : colors.blackText },
          ]}
        >
          {props.header}
        </Text>
      </View>
      <View
        style={[
          styles.input,
          { borderColor: props.wrongInput != null ? colors.wrong : colors.grey },
        ]}
      >
        <Image style={styles.image} source={props.source} />
        <TextInput
          placeholder={props.name}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          style={{width: '100%'}}
        />
      </View>

      {/* {props.wrongInput != null && (
        <Text style={[REGULAR14, { color: colors.wrong, marginLeft: "60%" }]}>
          {props.error}
        </Text>
      )} */}
    </View>
  );
}

export default InputComp;

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: colors.white,
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
