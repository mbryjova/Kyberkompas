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
import {post_to_url} from '../database/queries';
import { AddAnswer } from "../helpers/utils";
import ValidationView from "./ValidationView";

function YesOrNo(props) {

  /** index of current card in the array data */
  const [currentIndex, setCurrentIndex] = React.useState(0);
  /**
   * 1 - question
   * 2 - explanation
   */
  const [currentState, setCurrentState] = React.useState(1);

  /** here is the response from the backend, conatining points */
  const [points, setPoints] = React.useState(null);

  /** selected option for current question */
  const [optionSelected, setOptionSelected] = React.useState(null);

  /** activity send from module and its data */
  const activity = props.route.params.activity;
  const data = activity.questions;

  /** array send to the server with answers of the user */
  const [submit, setSubmit] = React.useState([]);

  /** reference for referencing the swiper in buttons yes/no */
  const reference = React.useRef(null);

  React.useEffect(() => {
    // console.log("points", points)
    // console.log(activity.image)
    if (points != null) {
      props.navigation.navigate("ActivityFinished", { 
        points: points.achieved_score,
        from_challenge: props.route.params.from_challenge,
        max_points: props.route.params.from_challenge ? props.route.params.challenge_max_score : activity.max_score,
        name: props.route.params.module_name,
        user_points: activity.user_activity != null && activity.user_activity.length != 0 ? activity.user_activity[0].score : 0
      });
    }

  }, [points])

  const Button = (props) => {
    return (
      <TouchableOpacity
        style={{
          width: 130,
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
            source={{uri: props.route.params.from_challenge ? "http://172.26.5.28".concat(data[currentIndex].image) : data[currentIndex].image}}
            
          />
        </View>
    );
  };

  const lastQuestion = async () => {
    await post_to_url(props.route.params.from_challenge ? 'challenges/'.concat(props.route.params.challenge_id).concat('/submit/') : 
    'tinder-swipes/'.concat(activity.id).concat('/submit/'),
    {'answers': submit}, setPoints);
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
              ref={reference}
              cards={data}
              cardIndex={currentIndex}
              renderCard={ renderQuestion }
              onSwipedLeft={() => {
                console.log("explanation"),
                  setCurrentState(2),
                  setOptionSelected(data[currentIndex].answers[1]),

                  AddAnswer(data[currentIndex].id, data[currentIndex].answers[1].id, submit, setSubmit),
                  console.log(submit);
                  setCurrentIndex(currentIndex + 1);
              }}
              onSwipedRight={() => {
                console.log("explanation"),
                  setCurrentState(2),
                  setOptionSelected(data[currentIndex].answers[0]),

                  AddAnswer(data[currentIndex].id, data[currentIndex].answers[0].id, submit, setSubmit),
                  console.log(submit);
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
                onPress={() => reference.current?.swipeLeft() }
                color={colors.wrong_light}
                textColor={colors.wrong}
                borderColor={colors.wrong}
              />

              <Button
                name={data[currentIndex].answers[0].answer}
                onPress={() => reference.current?.swipeRight() }
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
            <View style={[
            //   {backgroundColor: optionSelected.is_correct ? colors.correct_light : colors.wrong_light,
            //     borderColor: optionSelected.is_correct ? colors.correct : colors.wrong
            // }, 
            styles.validation]}>
                {/* {optionSelected.is_correct
                ? (
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Text style={[styles.textValidation, BOLD15]}>správně</Text> 
                        <Image
                        style={{marginLeft: '0%'}}
                        source={require('../assets/images/testIcons/check.png')}/>
                    </View>
                    ) :
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.textValidation, BOLD15]}>špatně</Text>
                        <Image source={require('../assets/images/testIcons/cross.png')}/>

                    </View>
                } */}
                <ValidationView logicalValue={optionSelected.is_correct ? 1 : 0}>

                </ValidationView>
            </View>
            <View style={styles.explanation}>
          <Text style={[REGULAR16]}>
            {optionSelected.explanation}
          </Text>
            </View>
          <BigButton
            name="pokračovat"
            onPress={data.length == currentIndex ? lastQuestion : nextQuestion}
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
    height: 269,
    width: 277,
    borderRadius: 16
  },
  textValidation:
    {textTransform: 'uppercase'
}
  ,
  validation: {
    height: "7%",
    width: '91%',
    borderRadius: 100, // když bych toto smazala
    //borderColor: colors.correct,
    //backgroundColor: colors.correct_light,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 0.5, // když bych toto smazala
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
    //backgroundColor: colors.correct,
    //height: "100%", // 70
    //width: "100%", // 91
    borderRadius: 16,
    alignItems: "center",
    alignSelf: 'center',
    borderColor: colors.blackText,
    borderWidth: 0.5,
    justifyContent: 'center',
    height: '85%',
    width: '95%',
    //marginBottom: 20
    //flex: 0.9
  },
  textWrapper: {
    //backgroundColor: colors.primary,
    //height: "30%",
    width: "90%",
    marginTop: 20,
  },
});
