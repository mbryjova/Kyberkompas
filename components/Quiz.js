import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollViewBase } from "react-native";
import colors from "../assets/colors/colors";
import BigButton from "./BigButton";
import * as Progress from "react-native-progress";
import { BOLD20, BOLD15, REGULAR16 } from "./atoms/typography";
import ValidationView from "./ValidationView";
import { POST, POST_ACTIVITY, URL_SCORES, PUT, ACTIVITY_FINISHED, URL_ACTIVITIES } from "../database/queries";
import {UserContext} from "../App";

function Quiz(props) {
  const allQuestions = require("../data/db.json").test_data;
  const [user, setUser] = React.useContext(UserContext);
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
        style={{ marginTop: "30%", backgroundColor: colors.correct, height: "43%", width: "85%", 
        justifyContent: "space-around", alignItems: "center",
        marginBottom: "15%"
      }}
      >
        {allQuestions[currentQuestionIndex].options.map((option) => (
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

            <Text style={[BOLD15, {textAlign: "center"}]}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const validate = () => {
    setCorrect(false);
    console.log("in validate", currentQuestionIndex);
    if (currentOptionSelected !== null) {
      if (
        currentOptionSelected.logicalValue == 1
      ) {
        console.log("correct")
        // přičti body
        console.log(currentOptionSelected.text, points + currentOptionSelected.scoreAmount);
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

      {quizState == 1 && (
        <View style={{ flex: 1, backgroundColor: colors.correct_light, alignItems: "center"
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
      {quizState == 2 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
          <View style={{width: '91%', height: '7%'}}>
          <ValidationView logicalValue={correct ? 1 : 0}>

          </ValidationView>

          </View>
          
          <View style={styles.explanationWrapper}>
          <Text style={[REGULAR16]}>{currentOptionSelected.explanation}</Text>

          </View>
          <View style={{justifyContent:'space-evenly', height: '15%', alignItems: 'center'}}>
          <Progress.Bar progress={currentQuestionIndex / allQuestions.length} />
          <View style={{ backgroundColor: colors.wrong }}>
            <BigButton
              name="na další otázku"
              onPress={() => {nextQuestion(), setCurrentOptionSelected(null)}} // {next question} // potom už se ale nepůjde vracet
            />
          </View>
            </View>
        </View>
      )}

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
        <Progress.Bar progress={currentQuestionIndex / allQuestions.length} />
        <View style={{ backgroundColor: colors.wrong }}>
          <BigButton
            name="dokončit"
            onPress={() => 
              // put a zmenit aktivity
              {
              
              ACTIVITY_FINISHED(URL_ACTIVITIES.concat("hesla/"), props.route.params, points);
              
              props.navigation.navigate("ActivityFinished", { points: points, name: props.route.params.module_name });
              //props.route.params.setActivityFinished(true);

              // 
              //props.route.params.activity.score = points;

              // props.route.params.data[0].data.push(props.route.params.activity);
              // props.route.params.data[1].data = props.route.params.data[1].data.filter((item) => props.route.params.activity.id != item.id);

              // POST_ACTIVITY(props.route.params.data[0], 1);
              // POST_ACTIVITY(props.route.params.data[1], 2);

              // PUT(URL_SCORES.concat(user.id), {"id": user.id, "total_score": ,
              // "weekly_score": 16,
              // "new_activities": 5,
              // "finished_challenges": 3});
              //props.navigation.navigate("ActivityFinished", { points: points })
            }} // {next question} // potom už se ale nepůjde vracet
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
