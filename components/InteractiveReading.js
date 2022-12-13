import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import colors from "../assets/colors/colors";
import { BOLD15, BOLD20, EXTRABOLD12, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";
import { AddAnswer } from "../helpers/utils";
import { post_to_url } from "../database/queries";

/**
 *
 * @param {*} props
 * @returns component that renders the interactive reading
 */
function InteractiveReading(props) {
  const activity = props.route.params.activity;

  /** if I come from challenges and the activity is null */
  if (activity == null) {
    return null;
  }
  const data = props.route.params.activity.questions;
  const data_length = data.length;

  /** index of the current item so we can slice the array */
  const [itemIndex, setItemIndex] = React.useState(0);

  /** points of the user, set to the answer from the server */
  const [points, setPoints] = React.useState(null);

  /** list of objects {show: false, currentOptionSelected: null, 
      questionAnswered: false} which represent availabe questions
      - show is false when the question is hidden
      - currentOptionSelected is null when no option from question is selected, otherwise the option
      - questionAnswered is false when question havent been answered yet, otherwise yes
  */
  const [states, setStates] = React.useState([]);

  /** array to be send to server, with question id and selected answer*/
  const [submit, setSubmit] = React.useState([]);

  React.useEffect(() => {
    if (points != null) {
      props.navigation.navigate("ActivityFinished", {
        points: points.achieved_score,
        from_challenge: props.route.params.from_challenge,
        max_points: props.route.params.from_challenge
          ? props.route.params.challenge_max_score
          : activity.max_score,
        name: props.route.params.module_name,
      });
    }
  }, [points]);
  /**
   *
   * @param props.index index of the question
   * @param props.question object representing the question
   * @returns visual representation of one question
   */
  function Question(props) {
    const index = props.index;
    const [show, setShow] = React.useState(states[index].show);

    /**which option did user select */
    const [currentOptionSelected, setCurrentOptionSelected] = React.useState(
      states[index].currentOptionSelected
    );

    /**if true, disabeling touchable functionality */
    const [questionAnswered, setQuestionAnswered] = React.useState(
      states[index].questionAnswered
    );

    return (
      <View style={styles.questionWrapper}>
        <TouchableOpacity
          onPress={() => setShow((show) => !show)}
          style={{ flexDirection: "row" }}
        >
          {show ? (
            <Image source={require("../assets/images/testIcons/up.png")} />
          ) : (
            <Image source={require("../assets/images/testIcons/down.png")} />
          )}

          <Text style={[BOLD20, { paddingLeft: 15 }]}>
            {props.question.question}
          </Text>
        </TouchableOpacity>

        {show ? (
          props.question.answers.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => {
                AddAnswer(props.question.id, option.id, submit, setSubmit);
                const current = states[index];
                current.show = show;
                current.currentOptionSelected = option;
                current.questionAnswered = true;

                states[index] = current;
                setStates(states);
                setItemIndex(itemIndex + 1);
              }}
              disabled={questionAnswered}
            >
              <View
                style={[
                  styles.optionWrapper,
                  {
                    backgroundColor:
                      option.is_correct && questionAnswered
                        ? colors.correct_light
                        : option == currentOptionSelected
                        ? colors.wrong_light
                        : colors.white,
                  },
                ]}
              >
                <Text style={[BOLD15, { textTransform: "uppercase" }]}>
                  {option.answer}
                </Text>
                {option.is_correct && questionAnswered ? (
                  <Image
                    source={require("../assets/images/testIcons/check.png")}
                  />
                ) : option == currentOptionSelected ? (
                  <Image
                    source={require("../assets/images/testIcons/cross.png")}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View></View>
        )}
      </View>
    );
  }

  /**
   *
   * @param props.item item from flatlist
   * @param props.index index of the item
   * @returns one interactive reading item - textbox + question
   */
  const renderItem = ({ item, index }) => {
    states.push({
      show: false,
      currentOptionSelected: null,
      questionAnswered: false,
    });
    return (
      <View style={{ alignItems: "center" }}>
        <View style={styles.contentWrapper}>
          <Text style={[styles.textStyle, REGULAR16]}>{item.reading}</Text>
        </View>
        <View style={{ width: "91%" }}>
          <Question
            key={item.id}
            question={item}
            index={index}
            show={states[index].show}
            currentOptionSelected={states[index].currentOptionSelected}
            questionAnswered={states[index].questionAnswered}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text
              style={[
                EXTRABOLD12,
                { textTransform: "uppercase", paddingLeft: 20, paddingTop: 20 },
              ]}
            >
              {props.route.params.moduleName}
            </Text>
            <Text style={[BOLD20, { paddingLeft: 20, paddingBottom: 20 }]}>
              {activity.title}
            </Text>
          </View>
        }
        data={data.slice(0, itemIndex + 1)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          data_length < itemIndex + 1 ? (
            <BigButton
              name="hotovo"
              /* sending submit list  to server */
              onPress={async () => {
                await post_to_url(
                  props.route.params.from_challenge
                    ? "challenges/"
                        .concat(props.route.params.challenge_id)
                        .concat("/submit/")
                    : "interactive-reading/"
                        .concat(activity.id)
                        .concat("/submit/"),
                  { answers: submit },
                  setPoints
                );
              }}
            />
          ) : null
        }
        ListFooterComponentStyle={{
          alignSelf: "center",
          paddingVertical: "5%",
        }}
      />
    </View>
  );
}

export default InteractiveReading;

const styles = StyleSheet.create({
  contentWrapper: {
    width: "91%",
    borderColor: colors.blackText,
    borderWidth: 0.5,
    borderRadius: 16,
  },
  textStyle: {
    padding: 10,
    paddingBottom: 20,
  },
  optionWrapper: {
    width: "100%",
    flexDirection: "row",
    height: 45,
    borderColor: colors.blackText,
    borderWidth: 0.5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    alignSelf: "center",
  },
  questionWrapper: {
    width: "100%",
    padding: 10,
    justifyContent: "space-evenly",
  },
});
