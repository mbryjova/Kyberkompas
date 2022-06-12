import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";
import { BOLD15, BOLD20, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";
import Accordion from 'react-native-collapsible/Accordion';

/**
 * component for interactive reading activity
 *
 * co potřebuji vědět: počet options - to se asi vyřeší v render options - ok
 *
 * udělat políčko pro option jako shared component
 *
 * asi bude seznam kartičk s textem a seznam otázek a jejich odpovědí - ok
 *
 * udělat jako seznam jak jdou text/otázky za sebou, objekt bude mít flag jestli je text nebo otázka, podle toho se rendruje - ok
 *
 * bude stav item index a podle toho tolik prvních items se vyfiltruje -> potom simple if jestli je to otázka nebo text - ok
 *
 * onPress u option vytrigruje přidání dalších částí
 *
 * udělat function se statem pro každou otázku? - ok
 */
function InteractiveReading(props) {
  const data = require("../data/db.json").interactive_reading;

  /** index of the current item so we can slice the array */
  const [itemIndex, setItemIndex] = React.useState(0);

  /** points of the user */
  const [points, setPoints] = React.useState(0);

  /** active states */
  const [states, setStates] = React.useState([]);

  // function arePropsEqual(prevProps, nextProps) {
  //   return prevProps.question.text === nextProps.question.text;
  // }
  /**
   * 
   * @param {*} props 
   * @returns visual representation of one question
   */
  function Question(props) {

    // /**if false, question isnt showed */
    // const [show, setShow] = React.useState(false);

    // /**which option did user select */
    // const [currentOptionSelected, setCurrentOptionSelected] =
    //   React.useState(null);

    // /**if true, disabeling touchable functionality */
    // const [questionAnswered, setQuestionAnswered] = React.useState(false);

    const index = props.index;
    const [show, setShow] = React.useState(states[index].show);

    /**which option did user select */
    const [currentOptionSelected, setCurrentOptionSelected] =
      React.useState(states[index].currentOptionSelected);

    /**if true, disabeling touchable functionality */
    const [questionAnswered, setQuestionAnswered] = React.useState(states[index].questionAnswered);

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

          <Text style={[BOLD20, {paddingLeft: 10}]}>{props.question.text}</Text>
        </TouchableOpacity>

        {show ? (
          // nevím jak změnit state index a points
          props.question.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => {
                console.log(option);
                //setCurrentOptionSelected(option);
                //setQuestionAnswered(true);
                //questionAnswered = true;
                console.log(currentOptionSelected, show, questionAnswered)
                const current = states[index]
                current.show = show;
                current.currentOptionSelected = option;
                current.questionAnswered = true;
                states[index] = current;
                setStates(states);
                setItemIndex(itemIndex + 1);
                console.log(points);
                setPoints(points + option.scoreAmount);
                console.log(currentOptionSelected, show, questionAnswered)
              }}
              disabled={questionAnswered}
            >
              <View style={[styles.optionWrapper, {backgroundColor: option.logicalValue == 1 && questionAnswered ? 
                colors.correct_light : (option == currentOptionSelected ? colors.wrong_light : colors.white)}]}>
              <Text style={[BOLD15, {textTransform: 'uppercase'}]}>{option.text}</Text>
              {
                (option.logicalValue == 1 && questionAnswered ? (
                  <Image
                    source={require("../assets/images/testIcons/check.png")}
                  />
                ) : option == currentOptionSelected ? (
                  <Image
                    source={require("../assets/images/testIcons/cross.png")}
                  />
                ) : null)

              }
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View></View>
        )}
      </View>
    );
  };

  
  
  const renderItem = ({ item, index }) => {
    console.log(states[index]);
    states.push({show: false, currentOptionSelected: null, 
      questionAnswered: false});
    return (
      <View style={{alignItems: 'center'}}>
        <View style={styles.contentWrapper}>
        <Text style={[styles.textStyle, REGULAR16]} >{item.content}</Text>

        </View>
        <View style={{width: '91%'}}>
          <Question
            key={item.id}
            question={item.question}
            // onPress={() => setItemIndex(itemIndex + 1)}
            // addPoints={(points) => setPoints(points)}
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
    <View style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={<Text style={[BOLD20, {padding: 20}]}>{props.route.params.header}</Text>}
        data={data.slice(0, itemIndex + 1)} // pokd je itemindex víc než max index akorát se vrátí všechna data
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<BigButton
          name="hotovo"
          onPress={() =>
            props.navigation.navigate("ActivityFinished", { points: points })
          }
        />}
        ListFooterComponentStyle={
          {
            alignSelf: 'center',
            paddingVertical: '5%'
          }
        }
      />

      {/* <Accordion
        sections={data}
        renderContent={renderItem}
        activeSections={data.slice(0, itemIndex + 1)}
        onChange={setItemIndex}

      /> */}
      
    </View>
  );
}

//export default React.memo(Question);
export default InteractiveReading;

const styles = StyleSheet.create({
  contentWrapper: {
    width: '91%',
    borderColor: colors.blackText,
    borderWidth: 0.5,
    borderRadius: 16
  },
  textStyle: {
    padding: 10,
    paddingBottom: 20
  },
  optionWrapper: {
    width: '90%',
    flexDirection: 'row',
    height: 45,
    borderColor: colors.blackText,
    borderWidth: 0.5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'center'
  },
  questionWrapper: {
    width: '100%',
    //backgroundColor: colors.primary,
    //backgroundColor: colors.correct,
    padding: 10,
    justifyContent: 'space-evenly'
  }
})