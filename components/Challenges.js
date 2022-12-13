import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import colors from "../assets/colors/colors";
import {
  EXTRABOLD12,
  BOLD20,
  REGULAR16,
  BOLD15,
  SEMIBOLD16,
  BOLD32,
} from "./atoms/typography";
import {
  get_from_url,
  VALID_CHALLENGES_URL,
  INVALID_CHALLENGES_URL,
} from "../database/queries";

/**
 *
 * @param {*} props
 * @returns component that renders challenges screen
 */
function Challenges(props) {
  const [challenges, setChallenges] = React.useState([]);
  const [inactive, setInactive] = React.useState([]);
  /**
   * 1 - následující
   * 2 - ukončené
   * 3 - minulé
   */
  const [currentState, setCurrentState] = React.useState(1);

  /** fisnihed challenges */
  const finishedChallenges = challenges.filter(
    (item) => item.user_activity.length != 0 && item.user_activity[0].done
  );

  /** challenges not done on full score */
  const unfinishedChallenges = challenges.filter(
    (item) =>
      item.user_activity.length == 0 ||
      (item.user_activity.length != 0 && !item.user_activity[0].done)
  );

  /** getting the data */
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      get_from_url(setChallenges, VALID_CHALLENGES_URL);
      get_from_url(setInactive, INVALID_CHALLENGES_URL);
      setInactive(
        inactive.map((item) => {
          item.inactive = true;
          return item;
        })
      );
      console.log(inactive);
    });
    return unsubscribe;
  }, [props.navigation]);

  /**
   * map for activity type
   */
  const activityType = {
    "api | test": "Quiz",
    "api | tinder swipe": "YesOrNo",
    "api | interactive reading": "InteractiveReading",
    "api | interactive activity": "APIActivity",
  };

  /**
   *
   * @param {*} item representing one item from flatlist
   * @returns component that renders one challenge
   */
  const renderChallengeItem = ({ item }) => {
    const from = new Date(item.valid_from);
    const to = new Date(item.valid_to);
    const month_from = from.getMonth() + 1;
    const month_to = to.getMonth() + 1;

    return (
      <View style={styles.challengeWrapper}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Text style={[EXTRABOLD12, { marginTop: 10 }]}>
            {from.getDate() +
              ". " +
              month_from +
              ". " +
              from.getFullYear() +
              " - " +
              to.getDate() +
              ". " +
              month_to +
              ". " +
              to.getFullYear()}
          </Text>
          <Text style={[BOLD20, { marginBottom: 4 }]}>{item.title}</Text>
          <Text style={REGULAR16} numberOfLines={2}>
            {item.description}
          </Text>
          {item.user_activity.length != 0 && item.user_activity[0].done ? (
            <Text
              style={[
                BOLD15,
                {
                  textAlign: "center",
                  color: colors.grey,
                  textTransform: "uppercase",
                  paddingTop: 40,
                },
              ]}
            >
              dokončena
            </Text>
          ) : (
            <Text
              /* navigating to the activity with these route parameters */
              onPress={() =>
                props.navigation.navigate(activityType[item.activity_type], {
                  from_challenge: true,
                  activity: item.activity,
                  challenge_id: item.id,
                  challenge_max_score: item.max_score,
                })
              }
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
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={[BOLD32, { margin: 16 }]}>Výzvy</Text>
      {/* changes the state of the screen */}
      <View
        style={{
          width: 343,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 8,
        }}
      >
        <Text
          onPress={() => {
            setCurrentState(1);
          }}
          style={[
            SEMIBOLD16,
            { color: currentState == 1 ? colors.blackText : colors.grey },
          ]}
        >
          Nadcházející
        </Text>
        <Text
          onPress={() => {
            setCurrentState(2);
          }}
          style={[
            SEMIBOLD16,
            { color: currentState == 2 ? colors.blackText : colors.grey },
          ]}
        >
          Ukončené
        </Text>
        <Text
          onPress={() => setCurrentState(3)}
          style={[
            SEMIBOLD16,
            { color: currentState == 3 ? colors.blackText : colors.grey },
          ]}
        >
          Minulé
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: colors.blackText,
          borderWidth: 1,
          width: 343,
          alignSelf: "center",
          marginBottom: 14,
        }}
      ></View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={
            currentState == 3
              ? inactive
              : currentState == 2
              ? finishedChallenges
              : unfinishedChallenges
          }
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderChallengeItem}
          ListEmptyComponent={
            <Text style={[BOLD20, { paddingTop: 100, textAlign: "center" }]}>
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
