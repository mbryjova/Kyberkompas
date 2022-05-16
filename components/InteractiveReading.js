import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";
import { BOLD15, BOLD20, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";

/**
 *
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

  function arePropsEqual(prevProps, nextProps) {
    return prevProps.question.text === nextProps.question.text;
  }

  function Question(props) {

    /**if false, question isnt showed */
    const [show, setShow] = React.useState(false);

    /**which option did user select */
    const [currentOptionSelected, setCurrentOptionSelected] =
      React.useState(null);

    /**if true, disabeling touchable functionality */
    const [questionAnswered, setQuestionAnswered] = React.useState(false);

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
                setCurrentOptionSelected(option);
                //setCorrectOption(props.correct);
                //option.logicalValue == 1 ? props.addPoints(points + option.scoreAmount) : null; // asi nemusím posílat přes props
                //correctOption == option ? props.addPoints(1) : null;
                //console.log(points);
                //setItemIndex(itemIndex + 1);
                //setShow(true);
                //{props.onPress()}
                setQuestionAnswered(true);
              }}
              disabled={questionAnswered}
            >
              <View style={styles.optionWrapper}>
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

  
  
  const renderItem = ({ item }) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={styles.contentWrapper}>
        <Text style={[styles.textStyle, REGULAR16]} >{item.content}</Text>

        </View>
        <View style={{width: '91%'}}>
          <Question
            key={item.id}
            question={item.question}
            onPress={() => setItemIndex(itemIndex + 1)}
            addPoints={(points) => setPoints(points)}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      {/* <Text style={[BOLD20, {padding: 20}]}>{props.route.params.header}</Text> */}
      <FlatList
        ListHeaderComponent={<Text style={[BOLD20, {padding: 20}]}>{props.route.params.header}</Text>}
        data={data}  //.slice(0, itemIndex + 1)} // pokd je itemindex víc než max index akorát se vrátí všechna data
        renderItem={renderItem
        //   ({item}) => {
        //   return (
        //     <Question
        //     id={item.id}
        //     question={item.question}
        //     //onPress={() => setItemIndex(itemIndex + 1)}
        //     //addPoints={(points) => setPoints(points)}
        //   />
        //   )
        // }
      }
        keyExtractor={(item) => item.id}
      />

      <BigButton
        name="hotovo"
        onPress={() =>
          props.navigation.navigate("ActivityFinished", { points: points })
        }
      />
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
    marginTop: 15
  },
  questionWrapper: {
    width: '100%',
    //backgroundColor: colors.primary,
    padding: 10,
    justifyContent: 'space-evenly'
  }
})