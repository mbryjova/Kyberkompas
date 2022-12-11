import React from "react";
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from "react-native";
import colors from "../assets/colors/colors";
import { get_from_url } from "../database/queries";
import { BOLD16, REGULAR14, SEMIBOLD16 } from "./atoms/typography";


/**
 * 
 * @param {*} props 
 * @returns component that renders the leaderboard screen
 */
function Leaderboard(props) {
  /**
   * 1 - week
   * 2 - month
   * 3 - year
   */
  const [currentState, setCurrentState] = React.useState(1);
  const [weekly, setWeekly] = React.useState([]);
  const [monthly, setMonthly] = React.useState([]);
  const [annual, setAnnual] = React.useState([]);

  /* map for  getting correct data*/
  const data = {
    1: weekly.sort((a, b) => b.weekly_score - a.weekly_score),
    2: monthly.sort((a, b) => b.monthly_score - a.monthly_score),
    3: annual.sort((a, b) => b.annual_score - a.annual_score)
  }


  // udělat nějak async
  React.useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus',
      () => 
      {
      get_from_url(setWeekly, 'leadership-board/weekly');
      get_from_url(setMonthly, 'leadership-board/monthly');
      get_from_url(setAnnual, 'leadership-board/annual');
      }
    )
    //console.log("here");
    //console.log(data);
    return unsubscribe
  }, [props.navigation]
  )

  const renderPerson = ({ item }) => {
    return (
      <View
        style={{
          height: 56,
          width: "98%",
          //backgroundColor: colors.primary,
          flexDirection: "row",
          justifyContent: "space-around", // toto je asi špatně
          marginVertical: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            //backgroundColor: colors.wrong,
            width: "70%",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.avatar }}
            style={{
              borderRadius: 12,
              height: "100%",
              width: 56,
              marginRight: 12,
              borderColor: colors.blackText,
              borderWidth: 0.5
            }}
          />
          <View>
            <Text style={SEMIBOLD16}>
              {item.username}
            </Text>
            <Text style={[REGULAR14, { color: colors.grey }]}>
              Celkem: {Math.round(item.total_score)}
            </Text>
          </View>
        </View>

        <Text style={[BOLD16, { alignSelf: "center" }]}>
          {currentState == 1 && Math.round(item.weekly_score) + " b"}
          {currentState == 2 && Math.round(item.monthly_score) + " b"}
          {currentState == 3 && Math.round(item.annual_score) + " b"}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, 
      //backgroundColor: colors.white,
    //backgroundColor: colors.correct, 
    alignItems: 'center' }}>
      <View
        style={{
          width: "95%",
          height: 32,
          borderRadius: 10,
          borderColor: colors.blackText,
          borderWidth: 0.5,
          flexDirection: "row",
          backgroundColor: colors.white,
          marginBottom: 20,
          marginTop: 16
        }}
      >
        <TouchableOpacity
        onPress={() => 
          {setCurrentState(1)
          }
        }
        style={
          [{backgroundColor: currentState == 1 ? colors.primary : colors.white,
            borderColor: currentState == 1 ? colors.blackText : colors.white,
            borderWidth: currentState == 1 ? 0.5 : 0,
          }, styles.topNavigator]
        }
        >
        <Text
          style={[
            REGULAR14, {textTransform: 'uppercase'}
          ]}
        >
          týden
        </Text>

        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => 
          { {setCurrentState(2);
          }
          }
        }
        style={
          [{backgroundColor: currentState == 2 ? colors.primary : colors.white, 
            borderColor: currentState == 2 ? colors.blackText : colors.white,
            borderWidth: currentState == 2 ? 0.5 : 0,
          }, styles.topNavigator]
        }
        >
        <Text
          style={[
            REGULAR14, {textTransform: 'uppercase'}
          ]}
        >
          měsíc
        </Text>

        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => 
          {setCurrentState(3);
          }
        }
        style={
          [{backgroundColor: currentState == 3 ? colors.primary : colors.white, 
            borderColor: currentState == 3 ? colors.blackText : colors.white,
            borderWidth: currentState == 3 ? 0.5 : 0,
          }, styles.topNavigator]
        }
        >
        <Text
          style={[
            REGULAR14, {textTransform: 'uppercase'}
          ]}
        >
          rok
        </Text>

        </TouchableOpacity>
      </View>
      <FlatList
        data={data[currentState]}
        keyExtractor={(item, index) => index}
        renderItem={renderPerson}
        contentContainerStyle={{
          alignItems: "center",
          //backgroundColor: colors.blackText,
        }}
        ListEmptyComponent={() => 
        // <Text style={[BOLD20, {paddingTop: 100, textAlign: 'center'}]}>
        // žádní uživatelé
        // </Text>
        <Text style={{textAlign: 'center'}}>
          App Loading...
        </Text>
        }
      />
    </View>
  );
}

export default Leaderboard;

const styles = StyleSheet.create({
  topNavigator: {
      width: "33.3%",
      height: "100%",
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },
});
