import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import colors from "../assets/colors/colors";
import { BOLD20, EXTRABOLD12 } from "./atoms/typography";

function Profile(props) {

  const [photo, setPhoto] = React.useState(null); // tady bude fotka od usera, který je přihlášený

  console.log(photo); // dám tu photo rovnou do app jako image ke current_user

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
     // base64: true
    }).catch(error => console.log(error));

    console.log(result);

    if (!result.cancelled) {
      setPhoto(result);
    }
    // ImagePicker.launchImageLibrary({}, (response) => {
    //   console.log("response:", response);
    //   if (response.uri) {
    //     setPhoto(response);
    //   }
    // }).catch(error => console.log(error))
  };

  const doubleText = (props) => {
    return (
      <View>
      <Text style={[EXTRABOLD12, {textTransform: 'uppercase', color: colors.primary}]}>
        {props.text1}
      </Text>
      <Text style={[BOLD20, {color: colors.blackText, marginTop: 5}]}>
        {props.text2}
      </Text>

      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>

      {/**view for the profile picture */}
      <View style={{width: "30%", height: "19%"}}>
      {
        photo ? (
      <Image source={{uri: photo.uri}}
              style={{borderRadius: 12, width: "100%", height: "100%",
              borderColor: colors.blackText, borderWidth: 0.5}}
      />
        ) : (
          <Image
          style={{width: "100%", height: "100%"}}
          source={require("../assets/images/profile.png")}/>
        )
      }

      </View>

      <Text>Jméno Příjmení</Text>
      <Text onPress={handleChoosePhoto}>Změnit profilovou fotku</Text>
      
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1
  }
  
})