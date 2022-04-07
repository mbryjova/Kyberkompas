import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import colors from "../assets/colors/colors";
import { EXTRABOLD12, BOLD20, REGULAR16, BOLD15 } from "./atoms/typography";


  /**
   * dát image přes get, získávám z databáze - někde ho získám
   */

function Challenges(props) {
  const [challenges, setChallenges] = React.useState([]);

  const ch_data = require("../data/db.json");

  const renderChallengeItem = ({item}) => {
    const image_source = "../assets/images/challenge1.png";
  const more = "více"; // kdyžtak pro lokalizaci

  return (
    <View style={styles.challengeWrapper}>
      <Image source={require(image_source)} />
      <View style={{marginLeft: 10, marginRight: 10}}>
        <Text style={[EXTRABOLD12, {marginTop: 10}]}>{item.date_from}</Text>
        <Text style={[BOLD20, {marginBottom: 4}]}>{item.name}</Text>
        <Text style={REGULAR16} numberOfLines={2}>{item.description}</Text>
        <Text
        onPress={() => props.navigation.navigate("Challenge", {name: item.name, date_from: item.date_from, description: item.description})} // jako objekt s konkrétníma paramterama {name: {item.name}, ..}
        style={[BOLD15, {alignSelf: 'center', color: colors.primary, textTransform: 'uppercase'}]}>
          {more}
        </Text>
      </View>
    </View>
  );
};

  
  return (
    <View style={styles.container}>
      <FlatList
        data={ch_data.challenges}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderChallengeItem}
      />
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
  },
});
