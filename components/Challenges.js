import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import colors from "../assets/colors/colors";
import { EXTRABOLD12, BOLD20, REGULAR16, BOLD15, SEMIBOLD16, BOLD32 } from "./atoms/typography";
import axios from "axios";

/**
 * dát image přes get, získávám z databáze - někde ho získám
 * udělat že kliknu na minulé a bude to click handler, ne navigator mezi stránkama, použít filtr, udělat si stav co je vybraný
 */

function Challenges(props) {
  //const ch_data = require("../data/db.json");
  const [challenges, setChallenges] = React.useState([]);
  /**
   * 1 - následující
   * 2 - ukončené
   * 3 - minulé
   */
  const [currentState, setCurrentState] = React.useState(1);

  /** getting the data */
  

  /** a function for rendering the challenge item */

  React.useEffect(() => {

    const fetchData = () => {
      console.log("here");
      axios.get('https://kyberkompas-database.herokuapp.com/challenges')
      .then((response) => {
        console.log(response);
        setChallenges(response.data);
        console.log(challenges);
      }).catch(error => console.log(error));
      
    }
    fetchData();
  }
  , [])


  const renderChallengeItem = ({ item }) => {
    const image_source = "../assets/images/challenge1.png";
    const more = "více"; // kdyžtak pro lokalizaci

    // todo, upravit styl obrázku
    return (
      <View style={styles.challengeWrapper}>
        <Image source={require(image_source)} />
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={[EXTRABOLD12, { marginTop: 10 }]}>{item.date_from}</Text>
          <Text style={[BOLD20, { marginBottom: 4 }]}>{item.title}</Text>
          <Text style={REGULAR16} numberOfLines={2}>
            {item.description}
          </Text>
          <Text
            onPress={() =>
              props.navigation.navigate("Challenge", {
                item: item,
                name: item.title,
                date_from: item.date_from,
                description: item.description,
                challenge: item.challenge
              })
            } // jako objekt s konkrétníma paramterama {name: {item.name}, ..}
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
            {more}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: colors.correct, flex: 1}}>
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
      <View style={{flex: 1, backgroundColor: colors.primary}}>
      <FlatList
        data={currentState == 2 ? challenges.filter((item) => item.finished == 1) : challenges.filter((item) => item.finished == 0)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderChallengeItem}
        
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
