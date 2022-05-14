import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";
import BigButton from "./BigButton";
import * as Progress from "react-native-progress";
import { BOLD20, BOLD15, REGULAR16 } from "./atoms/typography";
import ValidationView from "./ValidationView";

function Quiz(props) {
  const allQuestions = require("../data/db.json").test_data;
  /** state which contains the index of current question */
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  /**state which contains which option of the current question is selected */
  const [currentOptionSelected, setCurrentOptionSelected] =
    React.useState(null);

  /** */
  const [correct, setCorrect] = React.useState(false);

  /**state which contains the number of points */
  const [points, setPoints] = React.useState(0);

  const [progress, setProgress] = React.useState(0);

  /** state of the quiz:
   * 1 - question
   * 2 - explanation
   * 3 - last question
   */

  const [quizState, setQuizState] = React.useState(1);

  //const [explanation, setExplanation] = React.useState(false);

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
            {/**na co chci namapovat každou option, on press se změní barva políčka */}

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
        //allQuestions[currentQuestionIndex].correct === currentOptionSelected
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
          <Progress.Bar progress={0.3} />
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
          {/* {correct ? <Text> správně</Text> : <Text>špatně</Text>} */}
          <View style={{width: '91%', height: '7%'}}>
          <ValidationView logicalValue={correct ? 1 : 0}>

          </ValidationView>

          </View>
          
          {/* <Text>{allQuestions[currentQuestionIndex].explanation}</Text> */}
          <View style={styles.explanationWrapper}>
          <Text style={[REGULAR16]}>{currentOptionSelected.explanation}</Text>

          </View>
          <View style={{justifyContent:'space-evenly', height: '15%', alignItems: 'center'}}>
          <Progress.Bar progress={0.3} />
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
        {/* {correct ? <Text> správně</Text> : <Text>špatně</Text>} */}
        <View style={{width: '91%', height: '7%'}}>
        <ValidationView logicalValue={correct ? 1 : 0}>

        </ValidationView>

        </View>
        
        {/* <Text>{allQuestions[currentQuestionIndex].explanation}</Text> */}
        <View style={styles.explanationWrapper}>
        <Text style={[REGULAR16]}>{currentOptionSelected.explanation}</Text>

        </View>
        <View style={{justifyContent:'space-evenly', height: '15%', alignItems: 'center'}}>
        <Progress.Bar progress={0.3} />
        <View style={{ backgroundColor: colors.wrong }}>
          <BigButton
            name="dokončit"
            onPress={() => props.navigation.navigate("ActivityFinished", { points: points })} // {next question} // potom už se ale nepůjde vracet
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
