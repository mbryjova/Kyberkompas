import React from "react";
import { Text, View, SectionList, StyleSheet, Image, FlatList } from "react-native";
import {
  BOLD15,
  BOLD20,
  BOLD32,
  EXTRABOLD12,
  REGULAR16,
} from "./atoms/typography";
import colors from "../assets/colors/colors";
import { GET_ACTIVITIES } from "../database/queries";

function Module({ route, navigation }) {
  const header = "aktivity";
  //const data = require("../data/db.json");
  const [data, setData] = React.useState([]);
  const [activityFinished, setActivityFinished] = React.useState(false);

  React.useEffect(() => {
    GET_ACTIVITIES(setData);
    console.log(data);
  }, [activityFinished]

  )

  const renderActivityItem = ({ item, section }) => {
    const activityType = {
      "test": "Quiz",
      "ano nebo ne": "YesOrNo",
      "interaktivní čtení": "InteractiveReading",
      "informační aktivita": "APIActivity"
    }

    return (
      <View
        style={[
          {
            height: 179,
            width: "91%",
            flex: 1,
            borderRadius: 16,
            borderWidth: 0.5,
            borderColor: colors.blackText,
            alignSelf: "center",
            marginBottom: "4%",
            backgroundColor:
            section.title === "dokončené:" ? colors.correct_light : colors.white,
          },
        ]}
      >
        <View style={{ padding: 10 }}>
          <Text style={[EXTRABOLD12, { textTransform: "uppercase" }]}>
            {item.type}
          </Text>
          <Text style={[BOLD20]}>{item.name}</Text>
          <Text style={REGULAR16}>{item.description}</Text>
        </View>
        {
          section.title == "následující:" ? (
        <Text
          style={[
            BOLD15,
            {
              textTransform: "uppercase",
              color: colors.primary,
              textAlign: "center",

            },
          ]}
          onPress={() => navigation.navigate(activityType[item.type], {header: item.name, moduleName: route.params.name, 
            setActivityFinished: setActivityFinished, activity: item, data: data})}
        >
          SPUSTIT
        </Text>

          ) : (
            /** onPress = {() => spustit znovu? pokud ano -> dát na aktivitu} */
            <View style={{flex:1, alignItems: "flex-end", backgroundColor: colors.primary, flexDirection: "row",
            justifyContent: "center"
            }}>

            <Text style={[
              BOLD15,
              {
                textTransform: "uppercase",
                color: colors.grey,
                textAlign: "center",
                marginBottom: "5%"
                //flex: 1
              },
            ]}
            
            >
              dokončena
            </Text>

            <Image
              style={{marginBottom: "4.5%", marginLeft: "4%"}}
              source={require("../assets/images/testIcons/check.png")}
            />
            </View>
          )
        }
      </View>
    );
  };

  if (data.length == 0) {
    return null;
  }

  return (
    <View style={{ backgroundColor: colors.correct, flex: 1 }}>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={renderActivityItem}
        renderSectionHeader={({ section }) => (
          <View>
          <Text
            style={[
              REGULAR16,
              { textTransform: "capitalize",
              marginBottom: "4%",
              marginLeft: "4%"
            },
            ]}
          >
            {section.title}
          </Text>
          </View>
        )}
        ListHeaderComponent={
          <Text style={[BOLD32, { textTransform: "capitalize",
         marginLeft: "4%",
         marginTop: "4%"

          }]}>
            {header}
          </Text>
        }
      />

      
    </View>
  );
}

export default Module;

const styles = StyleSheet.create({
  
  
})