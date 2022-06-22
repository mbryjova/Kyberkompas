import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import colors from "../assets/colors/colors";
import { BOLD20, EXTRABOLD12, SEMIBOLD16, BOLD32, BOLD15 } from "./atoms/typography";
import {GET_ACTIVITIES, GET_CHALLENGES, PUT_PHOTO} from "../database/queries";
import {UserContext} from "../App";

function Profile(props) {

  const [user, setUser] = React.useContext(UserContext);
  const [photo, setPhoto] = React.useState(null); // tady bude fotka od usera, který je přihlášený
  
  const [challenges, setChallenges] = React.useState([]);
  const [activities, setActivities] = React.useState([]);

  console.log(photo, user); // dám tu photo rovnou do app jako image ke current_user

  //console.log(userContext)

  React.useEffect(() => {
    // GET scores/contextuser.id
    //GET_CHALLENGES(setChallenges);
    //GET_ACTIVITIES(setActivities);
    //PUT_PHOTO(user.id, user);
  }, []

  )

  const countChallenges = () => {
    //const data = require("../data/db.json").challenges;
    const finished = challenges.filter((item) => item.finished == 1);
    return finished.length;
  }

  const countActivities = () => {
    //const data = require("../data/db.json").activities[0].data;
    return activities[0].data.length;
  }

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
     // base64: true
    }).catch(error => console.log(error));

    console.log(result);

    if (!result.cancelled) {
      setPhoto(result);
      user.image = photo.path;
      PUT_PHOTO(user.id, user);
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

  const logOut = () => {
    setUser(null);
    props.navigation.navigate("Login");
  }

  if (challenges.length == 0 || activities.length == 0) {
    return null;
  }

  return (
    <View style={styles.profileContainer}>

      {/**view for the profile picture */}
      <View style={{backgroundColor: colors.correct, flex: 2, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <View style={styles.picture}>
      {
        photo ? (
      <Image source={{uri: photo.uri}}
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
      <Text style={BOLD32}>{user.first_name} {user.last_name}</Text>
      <Text style={[SEMIBOLD16, {marginTop: 5, color: colors.grey}]}
      onPress={handleChoosePhoto}>Změnit profilovou fotku</Text>
      </View>

      </View>

      <View style={styles.pointsContainer}>
      <DoubleText text1="celkem bodů" text2={user.total_score}/>
      <DoubleText text1="tento týden" text2={user.weekly_score}/>
      <DoubleText text1="nové znalosti" text2={countActivities()}/>
      <DoubleText text1="ukončené výzvy" text2={countChallenges()}/>

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