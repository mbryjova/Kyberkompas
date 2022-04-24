import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
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
  
  //console.log(itemIndex)


  const Question = (props) => {

    const [show, setShow] = React.useState(false);

    const [currentOptionSelected, setCurrentOptionSelected] = React.useState(null);

    const [correctOption, setCorrectOption] = React.useState(null);
    const [questionAnswered, setQuestionAnswered] = React.useState(false);

    return (
    <View>
        <TouchableOpacity onPress={() => setShow((show) => !show)} style={{flexDirection: 'row'}}>
            {
                show ? (
                    <Image source={require("../assets/images/testIcons/up.png")}/>
                ) : (<Image source={require("../assets/images/testIcons/down.png")}/>)
            }

            
      <Text>{props.question}</Text>

        </TouchableOpacity>

      {show ? 
      // nevím jak změnit state index a points
      (
        props.options.map((option) => 
        <TouchableOpacity
        key={option}
        onPress={() => {
          setCurrentOptionSelected(option);
          setCorrectOption(props.correct);
          correctOption == option ? props.addPoints(1) : null;
          //console.log(points);
          setQuestionAnswered(true);
          
         
          
        }}
        disabled={questionAnswered}
        
        >
          <Text>
          {option}
          </Text>
         { correctOption == option ? 
          <Image source={require("../assets/images/testIcons/check.png")} /> :
          (option == currentOptionSelected ? <Image source={require("../assets/images/testIcons/cross.png")} /> :null)}

        </TouchableOpacity>
          )
      )
      : <View></View>}


    </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        {/* <Text>{item.type}</Text> */}
        {item.type == "text" ? (

          <Text>{item.content}</Text>
        ) : (
          <View>
              <Question question={item.question} options={item.options} correct={item.correct}
              onPress={(index) => setItemIndex(index)} addPoints={(points) => setPoints(points)}
              >

              </Question>
            
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <Text>{props.route.params.header}</Text>
      <FlatList
        data={data.slice(0, itemIndex + 1)} // pokd je itemindex víc než max index akorát se vrátí všechna data
        renderItem={renderItem}
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

export default InteractiveReading;
