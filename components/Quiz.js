import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";
import BigButton from "./BigButton";
import * as Progress from "react-native-progress";
import { BOLD20, BOLD15, REGULAR16 } from "./atoms/typography";
import ValidationView from "./ValidationView";
import { post_to_url } from "../database/queries";
import { AddAnswer } from "../helpers/utils";

/**
 *
 * @param {*} props
 * @returns component that renders the quiz activity
 */
function Quiz(props) {
  const activity = props.route.params.activity;
  const allQuestions = activity.questions;

  /** state which contains the index of current question */
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  /**state which contains which option of the current question is selected */
  const [currentOptionSelected, setCurrentOptionSelected] =
    React.useState(null);

  /** */
  const [correct, setCorrect] = React.useState(false);

  /**state which contains the number of points */
  const [points, setPoints] = React.useState(null);

  const [submit, setSubmit] = React.useState([]);
  /** state of the quiz:
   * 1 - question
   * 2 - explanation
   * 3 - last question
   */

  const [quizState, setQuizState] = React.useState(1);

  React.useEffect(() => {
    if (points != null) {
      props.navigation.navigate("ActivityFinished", {
        points: points.achieved_score,
        from_challenge: props.route.params.from_challenge,
        max_points: props.route.params.from_challenge
          ? props.route.params.challenge_max_score
          : activity.max_score,
        name: props.route.params.module_name,
        user_points:
          activity.user_activity != null && activity.user_activity.length != 0
            ? activity.user_activity[0].score
            : 0,
      });
    }
  }, [points]);

  const renderQuestion = () => {
    return (
      <View
        style={{ alignSelf: "center", marginTop: "15%", marginHorizontal: 7 }}
      >
        <Text style={[BOLD20, { textAlign: "center" }]}>
          {allQuestions[currentQuestionIndex].question}
        </Text>
      </View>
    );
  };

  const renderOption = () => {
    return (
      <View
        style={{
          marginTop: "23%",
          height: "43%",
          width: "85%",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "15%",
        }}
      >
        {allQuestions[currentQuestionIndex].answers.map((option) => (
          <TouchableOpacity
            style={{
              width: "100%",
              borderRadius: 100,
              borderWidth: 0.5,
              borderColor: colors.blackText,
              height: "19%",
              backgroundColor:
                currentOptionSelected != null &&
                currentOptionSelected.id == option.id
                  ? colors.correct_light
                  : colors.white,
              justifyContent: "center",
            }}
            key={option.id}
            onPress={() => {
              setCurrentOptionSelected(option);
            }}
          >
            <Text style={[BOLD15, { textAlign: "center" }]}>
              {option.answer}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const validate = () => {
    setCorrect(false);
    if (currentOptionSelected !== null) {
      AddAnswer(
        allQuestions[currentQuestionIndex].id,
        currentOptionSelected.id,
        submit,
        setSubmit
      );
      if (currentOptionSelected.is_correct) {
        setCorrect(true);
      }
      currentQuestionIndex + 1 == allQuestions.length
        ? setQuizState(3)
        : setQuizState(2);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1), setQuizState(1);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* questions with answers */}
      {quizState == 1 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {renderQuestion()}
          {renderOption()}

          <View
            style={{
              justifyContent: "space-evenly",
              height: "15%",
              alignItems: "center",
            }}
          >
            <Progress.Bar
              progress={currentQuestionIndex / allQuestions.length}
              color={colors.primary}
              borderColor={colors.blackText}
            />
            <View style={{}}>
              <BigButton name="zkontrolovat" onPress={() => validate()} />
            </View>
          </View>
        </View>
      )}

      {/**explanation */}
      {quizState == 2 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ width: "91%", height: "7%" }}>
            <ValidationView logicalValue={correct ? 1 : 0}></ValidationView>
          </View>

          <View style={styles.explanationWrapper}>
            <Text style={[REGULAR16]}>{currentOptionSelected.explanation}</Text>
          </View>

          <View
            style={{
              justifyContent: "space-evenly",
              height: "15%",
              alignItems: "center",
            }}
          >
            <Progress.Bar
              progress={(currentQuestionIndex + 1) / allQuestions.length}
              color={colors.primary}
              borderColor={colors.blackText}
            />
            <View style={{}}>
              <BigButton
                name="na další otázku"
                onPress={() => {
                  nextQuestion(), setCurrentOptionSelected(null);
                }}
              />
            </View>
          </View>
        </View>
      )}

      {/** last question */}
      {quizState == 3 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ width: "91%", height: "7%" }}>
            <ValidationView logicalValue={correct ? 1 : 0}></ValidationView>
          </View>

          <View style={styles.explanationWrapper}>
            <Text style={[REGULAR16]}>{currentOptionSelected.explanation}</Text>
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              height: "15%",
              alignItems: "center",
            }}
          >
            <Progress.Bar
              progress={currentQuestionIndex + 1 / allQuestions.length}
              color={colors.primary}
            />
            <View style={{}}>
              <BigButton
                name="dokončit"
                onPress={async () => {
                  await post_to_url(
                    props.route.params.from_challenge
                      ? "challenges/"
                          .concat(props.route.params.challenge_id)
                          .concat("/submit/")
                      : "test/".concat(activity.id).concat("/submit/"),
                    { answers: submit },
                    setPoints
                  );
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default Quiz;

const styles = StyleSheet.create({
  explanationWrapper: {
    width: "91%",
    height: "40%",
    padding: 10,
    borderRadius: 16,
    borderColor: colors.blackText,
    borderWidth: 0.5,
    marginBottom: "15%",
  },
});
