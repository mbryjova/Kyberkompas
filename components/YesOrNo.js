import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { BOLD15, BOLD20, REGULAR16 } from "./atoms/typography";
import colors from "../assets/colors/colors";
import Swiper from "react-native-deck-swiper";
import BigButton from "./BigButton";
import { URL_ACTIVITIES, ACTIVITY_FINISHED } from "../database/queries";
import { UserContext } from "../App";

function YesOrNo(props) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  /**
   * 1 - question
   * 2 - explanation
   * 3 - last question - asi zrušit
   */
  const [currentState, setCurrentState] = React.useState(1);

  // celkový počet bodů
  const [points, setPoints] = React.useState(0);
  const [optionSelected, setOptionSelected] = React.useState(null);

  const [user, setUser] = React.useContext(UserContext);
  //const data = require("../data/db.json").tinder_swipe;
  const activity = props.route.params.activity;
  const data = activity.questions;

  const submit = [];

  const AddAnswer = (question_id, answer_id) => {
    submit.push( {
      "question_id": question_id,
      "correct_answers_ids": [answer_id]
    })
  }

  const Button = (props) => {
    return (
      <TouchableOpacity
        style={{
          width: "40%",
          height: 52,
          backgroundColor: props.color,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          borderColor: props.borderColor,
          borderWidth: 0.5,
        }}
        onPress={props.onPress}
      >
        <Text
          style={[
            BOLD15,
            { color: props.textColor, textTransform: "uppercase" },
          ]}
        >
          {props.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderQuestion = () => {
    return (
        <View style={styles.questionWrapper}>
          <View style={styles.textWrapper}>
            <Text style={[BOLD20, { marginBottom: "9%" }]}>
              Jde o správné tvrzení?
            </Text>

            {/*text otázky*/}
            <Text style={REGULAR16}>{data[currentIndex].question}</Text>
          </View>
          <Image
            style={styles.image}
            source={require("../assets/images/yesno_1.png")}
          />
        </View>
    );
  };

  const lastQuestion = () => {
    //ACTIVITY_FINISHED(URL_ACTIVITIES.concat("hesla/"), props.route.params, points, user.id);
    post_from_url(TINDER_SUBMIT_URL, {'answers': {submit}}, setPoints);
    props.navigation.navigate("ActivityFinished", { points: points.achieved_score });
  };

  const nextQuestion = () => {
    setCurrentState(1);
  };

  return (
    <View style={{ flex: 1 }}>
      {
        currentState == 1 && (
          <View style={{flex: 1, justifyContent: 'space-evenly'}}> 
            
            <View style={{flex: 0.85}}
            // flex: 0.9
            >
            <Swiper // h: 70%, w: 91%
              cards={data}
              cardIndex={currentIndex}
              renderCard={ renderQuestion }
              onSwipedLeft={() => {
                console.log("explanation"),
                  setCurrentState(2),
                  setOptionSelected(data[currentIndex].answers[1]),

                  // místo tohoto si to uložím do seznamu co pošlu backendu
                  //setPoints(points + data[currentIndex].answers[1].scoreAmount),

                  AddAnswer(data[currentIndex].id, data[currentIndex].answers[1].id),

                  setCurrentIndex(currentIndex + 1);
              }}
              onSwipedRight={() => {
                console.log("explanation"),
                  setCurrentState(2),
                  setOptionSelected(data[currentIndex].answers[0]),

                  //
                  //setPoints(points + data[currentIndex].answers[0].scoreAmount),
                  AddAnswer(data[currentIndex].id, data[currentIndex].answers[0].id),
                  setCurrentIndex(currentIndex + 1);
              }}
              disableTopSwipe={true}
              disableBottomSwipe={true}
              backgroundColor={colors.white}
              cardStyle={{width: '91%', height: '100%'}}
              containerStyle={{justifyContent: 'center'}}
              
            />

              </View>
            
            <View style={styles.buttonWrapper}>
              <Button
                name={data[currentIndex].answers[1].answer}
                //name={card.options[1].text}
                color={colors.wrong_light}
                textColor={colors.wrong}
                borderColor={colors.wrong}
              />

              <Button
                name={data[currentIndex].answers[0].answer}
                color={colors.correct_light}
                textColor={colors.blackText}
                borderColor={colors.correct}
              />
            </View>

           </View>
        )
      }

      {currentState == 2 && (
        <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
            <View style={[{backgroundColor: optionSelected.is_correct ? colors.correct_light : colors.wrong_light,
                borderColor: optionSelected.is_correct ? colors.correct : colors.wrong
            }, styles.validation]}>
                {optionSelected.is_correct
                ? (
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Text style={[styles.textValidation, BOLD15]}>správně</Text> 
                        <Image
                        style={{marginLeft: '0%'}}
                        source={require('../assets/images/testIcons/check.png')}/>
                    </View>) :
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.textValidation, BOLD15]}>špatně</Text>
                        <Image source={require('../assets/images/testIcons/cross.png')}/>

                    </View>
                }
            </View>
            <View style={styles.explanation}>
          <Text style={[REGULAR16]}>
            {optionSelected.explanation}
          </Text>
            </View>
          <BigButton
            name="pokračovat"
            onPress={data.length == currentIndex ? lastQuestion : nextQuestion}
                //optionSelected.logicalValue == 1 ? setPoints(points + optionSelected.scoreAmount) : null}
          ></BigButton>
        </View>
      )}
    </View>
  );
}

export default YesOrNo;

const styles = StyleSheet.create({
  image: {
    marginTop: "4%",
  },
  textValidation:
    {textTransform: 'uppercase'
}
  ,
  validation: {
    height: "7%",
    width: '91%',
    borderRadius: 100,
    //borderColor: colors.correct,
    //backgroundColor: colors.correct_light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    marginTop: '5%'
  },
  explanation: {
      height: '40%',
      width: '91%',
      padding: 10,
      borderRadius: 16,
      borderColor: colors.blackText,
      borderWidth: 0.5,
      marginBottom: '15%'
  },
  buttonWrapper: {
    flex: 0.15,
    //height: 52,
    flexDirection: "row",
    //backgroundColor: colors.wrong,
    backgroundColor: colors.white,
    //height: "7%",
    //width: "90%",
    justifyContent: "space-around",
    alignItems: 'center'
    //marginBottom: "16%",
  },
  swiperWrapper: {
    flex: 0.7
  },
  questionWrapper: {
    backgroundColor: colors.correct,
    //height: "100%", // 70
    //width: "100%", // 91
    borderRadius: 16,
    alignItems: "center",
    borderColor: colors.blackText,
    borderWidth: 0.5,
    justifyContent: 'center',
    //flex: 0.9
  },
  textWrapper: {
    backgroundColor: colors.primary,
    height: "30%",
    width: "90%",
    marginTop: "4%",
  },
});
