import React from "react";
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from "react-native";
import colors from "../assets/colors/colors";
import { BOLD16, REGULAR14, SEMIBOLD16 } from "./atoms/typography";

function Leaderboard(props) {
  /**
   * 1 - týden
   * 2 - měsíc
   * 3 - rok
   */
  const [currentState, setCurrentState] = React.useState(1);
  const data = require("../data/db.json").users;

  const renderPerson = ({ item }) => {
    return (
      <View
        style={{
          height: 56,
          width: "98%",
          backgroundColor: colors.primary,
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.wrong,
            width: "70%",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/person1.jpg")}
            style={{
              borderRadius: 12,
              height: "100%",
              width: 56,
              marginRight: 12,
            }}
          />
          <View>
            <Text style={SEMIBOLD16}>
              {item.first_name} {item.last_name}
            </Text>
            <Text style={[REGULAR14, { color: colors.grey }]}>
              Celkem: + {item.total_score}
            </Text>
          </View>
        </View>

        <Text style={[BOLD16, { alignSelf: "center" }]}>
          {currentState == 1 && item.weekly_score + " b"}
          {currentState == 2 && item.monthly_score + " b"}
          {currentState == 3 && item.anual_score + " b"}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.correct, alignItems: 'center' }}>
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
          setCurrentState(1)
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
          setCurrentState(2)
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
          setCurrentState(3)
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
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderPerson}
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: colors.blackText,
        }}
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
