import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollViewBase } from "react-native";
import colors from "../assets/colors/colors";
import BigButton from "./BigButton";
import * as Progress from "react-native-progress";
import { BOLD20, BOLD15, REGULAR16 } from "./atoms/typography";
import ValidationView from "./ValidationView";
import { post_to_url } from "../database/queries";
import {UserContext} from "../App";
import { AddAnswer } from "../helpers/utils";

function Quiz(props) {
  //const allQuestions = require("../data/db.json").test_data;

  const activity = props.route.params.activity;
  const allQuestions = activity.questions;
  //const [user, setUser] = React.useContext(UserContext);
  //const allQuestions = route.params.

  /** state which contains the index of current question */
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  /**state which contains which option of the current question is selected */
  const [currentOptionSelected, setCurrentOptionSelected] =
    React.useState(null);

  /** */
  const [correct, setCorrect] = React.useState(false);

  /**state which contains the number of points */
  const [points, setPoints] = React.useState(0);

  const [submit, setSubmit] = React.useState([]);
  /** state of the quiz:
   * 1 - question
   * 2 - explanation
   * 3 - last question
   */

  const [quizState, setQuizState] = React.useState(1);

  const renderQuestion = () => {
    return (
      <View style={{alignSelf: "center", marginTop: "15%"}}>
        <Text style={BOLD20}>
          {allQuestions[currentQuestionIndex].question}
        </Text>
      </View>
    );
  };

  const renderOption = () => {
    return (
      <View
        style={{ marginTop: "23%", backgroundColor: colors.correct, height: "43%", width: "85%", 
        justifyContent: "space-around", alignItems: "center",
        marginBottom: "15%"
      }}
      >
        {allQuestions[currentQuestionIndex].answers.map((option) => (
          <TouchableOpacity
          style={{width: "100%", borderRadius: 100, borderWidth: 0.5, 
          borderColor: colors.blackText, height: "19%", backgroundColor: (currentOptionSelected != null && currentOptionSelected.id == option.id) ? colors.correct_light : colors.white,
        justifyContent: "center"}}
            key={option.id}
            onPress={() => {
              setCurrentOptionSelected(option);
              console.log(option);
            }} // nastavím jako selected option
          >

            <Text style={[BOLD15, {textAlign: "center"}]}>{option.answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const validate = () => {
    setCorrect(false);
    console.log("in validate", currentQuestionIndex);
    if (currentOptionSelected !== null) {
      AddAnswer(allQuestions[currentQuestionIndex].id, currentOptionSelected.id, submit, setSubmit)
      if (
        currentOptionSelected.is_correct
      ) {
        console.log("correct")
        // přičti body
        console.log(currentOptionSelected.answer, points + currentOptionSelected.scoreAmount);

        // budu posílat do submit
        setPoints(points + currentOptionSelected.scoreAmount); // je o jeden krok napřed
        setCorrect(true); // podle toho se potom rendruje jestli je tam napsaný správně nebo špatně
        // mělo by se zablokovat dát jinou možnost
      }
      console.log("after if");
      console.log(points);
      currentQuestionIndex + 1 == allQuestions.length ? (
        console.log("here"),
        setQuizState(3)

      ) : (setQuizState(2)) // explanation
    }
  };

  const nextQuestion = () => {
      setCurrentQuestionIndex(currentQuestionIndex + 1), setQuizState(1)    
  };

  const handleFinish = () => {
    props.route.params.setActivityFinished(true);
    //PUT activity finished
    //PUT /scores/cotextuser.id {"total_score": + points,
      // "weekly_score": + points,
      // "monthly_score": + points,
      // "anual_score": + points}
  }

  return (
    <View
      style={{
        backgroundColor: colors.wrong,
        flex: 1
      }}
    >

       {/* otázka a odpovědi - tlačítko zkontrolovat */}
      {quizState == 1 && (
        <View style={{ 
          flex: 1, 
          //backgroundColor: colors.correct_light, 
          alignItems: "center"
        }}>
          {renderQuestion()}
          {renderOption()}

          <View style={{justifyContent:'space-evenly', height: '15%', alignItems: 'center'}}>
          <Progress.Bar progress={currentQuestionIndex / allQuestions.length} />
          <View style={{backgroundColor: colors.blackText}}>
            <BigButton
              name="zkontrolovat"
              onPress={() => validate()} // {validate}
            />

          </View>
          </View>
        </View>
      )}

      {/**vysvětlení, tlačítko na další otázku */}
      {quizState == 2 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: colors.grey}}>

          <View style={{width: '91%', height: '7%'}}>
          <ValidationView logicalValue={correct ? 1 : 0}>

          </ValidationView>

          </View>
          
          <View style={styles.explanationWrapper}>
          <Text style={[REGULAR16]}>{currentOptionSelected.explanation}</Text>

          </View>

          <View style={{justifyContent:'space-evenly', height: '15%', alignItems: 'center'}}>
          <Progress.Bar progress={(currentQuestionIndex + 1) / allQuestions.length} />
          <View style={{ backgroundColor: colors.wrong }}>
            <BigButton
              name="na další otázku"
              onPress={() => {nextQuestion(), setCurrentOptionSelected(null)}} // {next question} // potom už se ale nepůjde vracet
            />
          </View>
            </View>
        </View>
      )}

      {/** poslední otázka, jdu na dokončit */}
      {quizState == 3 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
        <View style={{width: '91%', height: '7%'}}>
        <ValidationView logicalValue={correct ? 1 : 0}>

        </ValidationView>

        </View>
        
        <View style={styles.explanationWrapper}>
        <Text style={[REGULAR16]}>{currentOptionSelected.explanation}</Text>

        </View>
        <View style={{justifyContent:'space-evenly', height: '15%', alignItems: 'center'}}>
        <Progress.Bar progress={currentQuestionIndex + 1 / allQuestions.length} />
        <View style={{ backgroundColor: colors.wrong }}>
          <BigButton
            name="dokončit"
            onPress={async () => 
              {
                console.log(submit)
                await post_to_url(props.route.params.from_challenge ? 'challenges/'.concat(props.route.params.challenge_id).concat('/submit') : 
                'test/'.concat(activity.id).concat('/submit'),
                {'answers': submit},
                setPoints);
                props.navigation.navigate("ActivityFinished", { points: points.achieved_score,
                  from_challenge: props.route.params.from_challenge });
              
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
    width: '91%',
    height: '40%',
    padding: 10,
    borderRadius: 16,
    borderColor: colors.blackText,
    borderWidth: 0.5,
    marginBottom: '15%'
  }
})
