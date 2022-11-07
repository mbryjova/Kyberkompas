import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import colors from "../assets/colors/colors";
import { BOLD20, EXTRABOLD12, SEMIBOLD16, BOLD32, BOLD15 } from "./atoms/typography";
import {GET, get_from_url, post_to_url, PUT_PHOTO, URL_SCORES} from "../database/queries";
import {UserContext} from "../App";
import axios from "axios";

function Profile(props) {

  const [user, setUser, token, setToken] = React.useContext(UserContext);
  const [scores, setScores] = React.useState(null);
  const [photo, setPhoto] = React.useState(user.profile.avatar);
  //React.useState(null); // tady bude fotka od usera, který je přihlášený
  

  console.log("photo:", photo, "user in profile:", user); // dám tu photo rovnou do app jako image ke current_user

  //console.log(userContext)

  React.useEffect(() => {
    //console.log(user, URL_SCORES.concat(user.id), user.anual_score);
    //GET(setScores, URL_SCORES.concat(user.id));
    // GET scores/contextuser.id
    //PUT_PHOTO(user.id, user);
  }, []) // potřebuju aby se to stáhlo vždycky když se změní skóre nebo property uživatele

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
     // base64: true
    }).catch(error => console.log(error));

    console.log(result);

    if (!result.cancelled) {
      //setPhoto(result);

      //user.image = photo.path;

      const formdata = new FormData();
      formdata.append('file',
        {
          uri: result.uri,
          type: result.type
        }
      )

      await post_to_url('user/set_avatar', formdata);
      //await get_from_url(setUser, 'user/me');
      setPhoto(result.uri)

      
      //PUT_PHOTO(user.id, user);
    }
  };

  const DoubleText = (props) => {
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

  const logOut = async () => {
    setUser(null);
    props.navigation.navigate("Login");

    // tady by mělo být asi něco jako loading
    await post_to_url('user/token/logout', '')
    //props.navigation.navigate("Login");
  }

  
  // if (scores == null) {
  //   return null;
  // }

  return (
    <View style={styles.profileContainer}>

      {/**view for the profile picture */}
      <View style={{backgroundColor: colors.correct, flex: 2, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <View style={styles.picture}>
      {
        photo ? (
      <Image source={{uri: photo}}
              style={styles.photo}
      />
        ) : (
          user.image == "" ? (
            <Image
          style={{width: "100%", height: "100%"}}
          source={ require("../assets/images/profile.png") }/>

          ) : 
          <Image
          style={styles.photo}
          source={{ uri: user.image }}/>
        )
      }
      </View>

      <View style={styles.namesContainer}>
      <Text style={BOLD32}>{user.username}</Text>
      <Text style={[SEMIBOLD16, {marginTop: 5, color: colors.grey}]}
      onPress={handleChoosePhoto}>Změnit profilovou fotku</Text>
      </View>

      </View>

      <View style={styles.pointsContainer}>
      <DoubleText text1="celkem bodů" text2={user.total_score}/>
      {/* <DoubleText text1="tento týden" text2={scores.weekly_score}/> */}
      <DoubleText text1="nové znalosti" text2={user.done_activities}/>
      <DoubleText text1="ukončené výzvy" text2={user.done_challenges}/>

      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={logOut}>
      <Text style={BOLD15}>
        ODHLÁSIT SE
      </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  photo: 
    {borderRadius: 12, width: "100%", height: "100%",
              borderColor: colors.blackText, borderWidth: 0.5}
  ,
  picture: {
    width: "30%", height: "50%"
  },
  button: {
    width: '45%',
    height: 52,  // 40%
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: colors.blackText,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center'

  },
  profileContainer: {
    flex: 1
  },
  namesContainer: {
    alignItems: 'center'
  },
  pointsContainer: {
    flex: 2,
    backgroundColor: colors.wrong,
    justifyContent: 'space-evenly',
    paddingLeft: 20

  }
  
})