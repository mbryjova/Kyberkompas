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

function YesOrNo(props) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  /**
   * 1 - question
   * 2 - explanation
   * 3 - last question - asi zrušit
   */
  const [currentState, setCurrentState] = React.useState(1);
  const [points, setPoints] = React.useState(0);
  const [optionSelected, setOptionSelected] = React.useState(null);

  const data = require("../data/db.json").tinder_swipe;

  const Button = (props) => {
    return (
      <TouchableOpacity
        style={{
          width: "40%",
          height: "100%",
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
            <Text style={REGULAR16}>{data[currentIndex].question.text}</Text>
          </View>
          <Image
            style={styles.image}
            source={require("../assets/images/yesno_1.png")}
          />
        </View>
    );
  };

  const lastQuestion = () => {
    props.navigation.navigate("ActivityFinished", { points: points });
  };

  const nextQuestion = () => {
    setCurrentState(1);
  };

  return (
    <View style={{  }}>
      {
        currentState == 1 && (
          <View style={{flex: 1, backgroundColor: colors.white, justifyContent: 'center'}}> 
            
            <View style={{flex: 0.9}}>
            <Swiper // h: 70%, w: 91%
              cards={data}
              cardIndex={currentIndex}
              renderCard={ renderQuestion }
              onSwipedLeft={() => {
                console.log("explanation"),
                  setCurrentState(2),
                  setOptionSelected(data[currentIndex].options[1]),
                  setPoints(points + data[currentIndex].options[1].scoreAmount),
                  setCurrentIndex(currentIndex + 1);
              }}
              onSwipedRight={() => {
                console.log("explanation"),
                  setCurrentState(2),
                  setOptionSelected(data[currentIndex].options[0]),
                  setPoints(points + data[currentIndex].options[0].scoreAmount),
                  setCurrentIndex(currentIndex + 1);
              }}
              disableTopSwipe={true}
              disableBottomSwipe={true}
              //backgroundColor={colors.white}
              //cardStyle={{width: '100%', height: '100%'}}
              //containerStyle={{}}
              //overlayLabelStyle={{position: 'relative'}}
            />

              </View>
            
            <View style={styles.buttonWrapper}>
              <Button
                name={data[currentIndex].options[1].text}
                //name={card.options[1].text}
                color={colors.wrong_light}
                textColor={colors.wrong}
                borderColor={colors.wrong}
              />

              <Button
                name={data[currentIndex].options[0].text}
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
            <View style={[{backgroundColor: optionSelected.logicalValue == 1 ? colors.correct_light : colors.wrong_light,
                borderColor: optionSelected.logicalValue == 1 ? colors.correct : colors.wrong
            }, styles.validation]}>
                {optionSelected.logicalValue == 1
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
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: colors.wrong,
    //height: "7%",
    //width: "90%",
    justifyContent: "space-between",
    //marginBottom: "16%",
  },
  swiperWrapper: {
    flex: 0.7
  },
  questionWrapper: {
    //marginTop: "8%",
    backgroundColor: colors.correct,
    height: "100%", // 70
    width: "100%", // 91
    borderRadius: 16,
    alignItems: "center",
    borderColor: colors.blackText,
    borderWidth: 0.5,
    justifyContent: 'center',
    flex: 0.9
  },
  textWrapper: {
    backgroundColor: colors.primary,
    height: "30%",
    width: "90%",
    marginTop: "4%",
  },
});
