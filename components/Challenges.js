import React from "react";
import { View, StyleSheet, Text, Image, FlatList, Alert } from "react-native";
import colors from "../assets/colors/colors";
import { EXTRABOLD12, BOLD20, REGULAR16, BOLD15, SEMIBOLD16, BOLD32 } from "./atoms/typography";
//import axios from "axios";
//import {GET, URL_CHALLENGES, URL_INACTIVE} from "../database/queries";
import {get_from_url, VALID_CHALLENGES_URL, INVALID_CHALLENGES_URL} from '../database/queries';

/**
 * dát image přes get, získávám z databáze - někde ho získám
 * udělat že kliknu na minulé a bude to click handler, ne navigator mezi stránkama, použít filtr, udělat si stav co je vybraný
 */

function Challenges(props) {
  //const ch_data = require("../data/db.json");
  const [challenges, setChallenges] = React.useState([]);
  const [inactive, setInactive] = React.useState([]);
  /**
   * 1 - následující
   * 2 - ukončené
   * 3 - minulé
   */
  const [currentState, setCurrentState] = React.useState(1);

  //const [changed, setChanged] = React.useState(false);

  const finishedChallenges = challenges.filter(item => item.user_activity.length != 0
    && item.user_activity[0].done);
  const unfinishedChallenges = challenges.filter(item => (item.user_activity.length == 0)
  || (item.user_activity.length != 0 && !item.user_activity[0].done));

  /** getting the data */
  
  React.useEffect(() => {
    // GET(setChallenges, URL_CHALLENGES);
    // GET(setInactive, URL_INACTIVE);
    const unsubscribe = props.navigation.addListener('focus',
      () => 
      {get_from_url(setChallenges, VALID_CHALLENGES_URL);
      get_from_url(setInactive, INVALID_CHALLENGES_URL);
      setInactive(inactive.map(item => {item.inactive = true; return item}))
      console.log(inactive)
    }
    )
    console.log("chall:", challenges);
    //setChanged(false);
    return unsubscribe
  }
  , [props.navigation]);

  const activityType = {
    "api | test": "Quiz",
    "api | tinder swipe": "YesOrNo",
    "api | interactive reading": "InteractiveReading",
    "api | interactive activity": "APIActivity"
  }
  /** a function for rendering the challenge item */

  const renderChallengeItem = ({ item }) => {

    const from = new Date(item.valid_from)
    const to = new Date(item.valid_to)
    const month_from = from.getMonth() + 1;
    const month_to = to.getMonth() + 1
    //console.log(from.getMonth() + 1)
    // todo, upravit styl obrázku
    return (
      <View style={styles.challengeWrapper}>
        {/* <Image source={{uri: item.image}}
        style={styles.image} /> */}
        <Image style={styles.image} source={{uri: item.image}} />
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={[EXTRABOLD12, { marginTop: 10 }]}>{from.getDate() + ". " + month_from + ". " + from.getFullYear()
          + " - " + to.getDate() + ". " + month_to + ". " + to.getFullYear()}</Text>
          <Text style={[BOLD20, { marginBottom: 4 }]}>{item.title}</Text>
          <Text style={REGULAR16} numberOfLines={2}>
            {item.description}
          </Text>
          {item.user_activity.length != 0
            && item.user_activity[0].done ? (
                <Text style={[
                  BOLD15,
                  {
                    textAlign: "center",
                    color: colors.grey,
                    textTransform: "uppercase",
                    paddingTop: 40,
                  },
                ]}>
                  dokončena
                </Text>
    ) : (<Text
            onPress={ 
            () =>
               props.navigation.navigate(activityType[item.activity_type], {
                from_challenge: true,
                activity: item.activity,
                challenge_id: item.id,
                challenge_max_score: item.max_score
              })
            }
            // jako objekt s konkrétníma parametrama {name: {item.name}, ..}
            style={[
              BOLD15,
              {
                textAlign: "center",
                color: colors.primary,
                textTransform: "uppercase",
                paddingTop: 40,
              },
            ]}
          >
            více
          </Text>)
          }
        </View>
      </View>
    );
  };

  // if (challenges.length == 0) {
  //   return null;
  // }
  return (
    <View style={{
      //backgroundColor: colors.correct, 
    flex: 1}}>
      <Text style={[BOLD32, {margin: 16}]}>
        Výzvy
      </Text>
      <View style={{width: 343, flexDirection: "row", justifyContent: "space-evenly", marginBottom: 8}}>
        <Text onPress={() =>{ setCurrentState(1)}} style={[SEMIBOLD16, {color: currentState == 1 ? colors.blackText : colors.grey}]}>
          Nadcházející
        </Text>
        <Text onPress={() => {setCurrentState(2)}} style={[SEMIBOLD16, {color: currentState == 2 ? colors.blackText : colors.grey}]}>
          Ukončené
        </Text>
        <Text onPress={() => setCurrentState(3)} style={[SEMIBOLD16, {color: currentState == 3 ? colors.blackText : colors.grey}]}>
          Minulé
        </Text>
      </View>
      <View style={{borderBottomColor: colors.blackText, borderWidth: 1, width: 343, alignSelf: "center", marginBottom: 14}}>

      </View>
      <View style={{flex: 1, 
        //backgroundColor: colors.primary
        }}>
      <FlatList
        data={ currentState == 3 ? inactive :
          (currentState == 2 ? finishedChallenges :  // toto se musí filtrovat jinak - už ok
          unfinishedChallenges)
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderChallengeItem}
        ListEmptyComponent={ 
          <Text style={[BOLD20, {paddingTop: 100, textAlign: 'center'}]}>
          žádné výzvy
          </Text>
        }
        
      />

      </View>
    </View>
  );
}

export default Challenges;

const styles = StyleSheet.create({
  image: {
    width: 343,
    height: 163,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  challengeWrapper: {
    borderRadius: 16,
    borderColor: colors.blackText,
    borderWidth: 0.5,
    height: 340,
    width: 343,
    alignSelf: "center",
    marginBottom: 14,
    backgroundColor: colors.white,
  },
});
