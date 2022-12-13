import React from "react";
import { TextInput, StyleSheet, View, Text, Image } from "react-native";
import colors from "../assets/colors/colors";
import { EXTRABOLD12, REGULAR14 } from "../components/atoms/typography";

/**
 * @param props.wrongInput list of wrong input texts
 * @param props.header
 * @param props.source source of the icon
 * @param props.name
 * @param props.onChangeText
 * @param props.secureTextEntry true if it is the password
 *
 * @returns component for rendering the input component
 */
function InputComp(props) {
  return (
    <View style={{ marginBottom: props.wrongInput == null ? 10 : 0 }}>
      <View style={styles.textWrapper}>
        <Text
          style={[
            EXTRABOLD12,
            {
              color: props.wrongInput != null ? colors.wrong : colors.blackText,
            },
          ]}
        >
          {props.header}
        </Text>
      </View>
      <View
        style={[
          styles.input,
          {
            borderColor: props.wrongInput != null ? colors.wrong : colors.grey,
          },
        ]}
      >
        <Image style={styles.image} source={props.source} />
        <TextInput
          placeholder={props.name}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          style={{ width: "100%" }}
        />
      </View>

      {props.wrongInput != null && (
        <Text
          style={[REGULAR14, { color: colors.wrong, alignSelf: "flex-end" }]}
        >
          {props.wrongInput[0]}
        </Text>
      )}
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
