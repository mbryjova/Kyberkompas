import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "../assets/colors/colors";
import {
  BOLD20,
  EXTRABOLD12,
  SEMIBOLD16,
  BOLD32,
  BOLD15,
} from "./atoms/typography";
import { get_from_url, post_picture, post_to_url } from "../database/queries";
import { UserContext } from "./context/context";

/**
 *
 * @param {*} props
 * @returns component that renders profile
 */
function Profile(props) {
  const [user, setUser] = React.useContext(UserContext);
  const [photo, setPhoto] = React.useState(user.avatar);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () =>
      get_from_url(setUser, "user/me")
    );
    return unsubscribe;
  }, [props.navigation]);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    }).catch((error) => console.log(error));

    if (!result.cancelled) {
      const formdata = new FormData();
      let fileType = result.uri.substring(result.uri.lastIndexOf(".") + 1);
      formdata.append("file", {
        uri: result.uri,
        name: "picture.".concat(fileType),
        type: "image/".concat(fileType),
      });

      await post_picture("user/set_avatar", formdata);
      setPhoto(result.uri);
    }
  };

  const DoubleText = (props) => {
    return (
      <View>
        <Text
          style={[
            EXTRABOLD12,
            { textTransform: "uppercase", color: colors.primary },
          ]}
        >
          {props.text1}
        </Text>
        <Text style={[BOLD20, { color: colors.blackText, marginTop: 5 }]}>
          {props.text2}
        </Text>
      </View>
    );
  };

  const logOut = async () => {
    setUser(null);
    props.navigation.navigate("Login");
    await post_to_url("user/token/logout", "");
  };

  return (
    <View style={styles.profileContainer}>
      {/**view for the profile picture */}
      <View
        style={{
          flex: 2,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View style={styles.picture}>
          {photo != null ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={require("../assets/images/profile.png")}
            />
          )}
        </View>

        <View style={styles.namesContainer}>
          <Text style={BOLD32}>{user.username}</Text>
          <Text
            style={[SEMIBOLD16, { marginTop: 5, color: colors.grey }]}
            onPress={handleChoosePhoto}
          >
            Změnit profilovou fotku
          </Text>
        </View>
      </View>

      <View style={styles.pointsContainer}>
        <DoubleText
          text1="celkem bodů"
          text2={Math.round(user.total_score, 2)}
        />
        <DoubleText text1="tento týden" text2={Math.round(user.weekly_score)} />
        <DoubleText
          text1="nové znalosti"
          text2={Math.round(user.done_activities)}
        />
        <DoubleText
          text1="ukončené výzvy"
          text2={Math.round(user.done_challenges)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={logOut}>
          <Text style={BOLD15}>ODHLÁSIT SE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  photo: {
    borderRadius: 12,
    width: "100%",
    height: "100%",
    borderColor: colors.blackText,
    borderWidth: 0.5,
  },
  picture: {
    width: "30%",
    height: "50%",
  },
  button: {
    width: "45%",
    height: 52,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: colors.blackText,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    flex: 1,
  },
  namesContainer: {
    alignItems: "center",
  },
  pointsContainer: {
    flex: 2,
    justifyContent: "space-evenly",
    paddingLeft: 20,
  },
});
