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
import {get_from_url, MODULES_URL} from '../database/queries';


function Module({ route, navigation }) {
  const header = "aktivity";
  const [data, setData] = React.useState([]);
  //const [activityFinished, setActivityFinished] = React.useState(false);
  let data_formatted = [];

  React.useEffect(() => {
    console.log(MODULES_URL.concat("/").concat(route.params.module_id))

    /** takhle by se měly správně stahovat ty data i guess */
    async function fetchData() {
      await get_from_url(setData, MODULES_URL.concat("/").concat(route.params.module_id))
    }
    const unsubscribe = navigation.addListener('focus', () => fetchData())
    //fetchData();
    console.log(data);

    return unsubscribe
  }, [navigation]

  )

  if (data.length != 0) {

    const interactive_readings = data.interactive_readings.map(item => {item.type = "interaktivní čtení"; return item});
    const tinder_swipes = data.tinder_swipes.map(item => {item.type = "ano nebo ne"; return item});
    const tests = data.tests.map(item => {item.type = "test"; return item});
    const interactive_activities = data.interactive_activities.map(item => {item.type = "informační aktivita"; return item});

    console.log(interactive_readings)
    const allactivities = interactive_readings.concat(tinder_swipes, tests, interactive_activities).sort((a, b) => a.module_order > b.module_order ? 1 : -1);
    const finished = allactivities.filter(item => item.user_activity.length != 0 && item.user_activity[0].done);
    const not_finished = allactivities.filter(item => item.user_activity.length == 0 || (item.user_activity.length != 0 && !item.user_activity[0].done));
    
    //console.log(allactivities)
    data_formatted = [
      {
        "id": 1,
        "title": "následující:",
        "data": not_finished
      },
      {
        "id": 2,
        "title": "dokončené:",
        "data": finished
      }
  ]

  console.log(data_formatted[1]);
  //setData(data_formatted)
  }

  const renderNoActivities = ({section}) => {
    if (section.data.length != 0) {
      return null;
    }
    return (
    <View
        style={[
          {
            height: 179,
            width: "91%",
            flex: 1,
            alignSelf: "center",
            //marginBottom: "4%",
            alignItems: 'center',
            //justifyContent: 'center',
            //backgroundColor: colors.white,

          },
        ]}
      >
        <Text style={[BOLD20, {paddingTop: '10%'}]}>
          žádné aktivity
        </Text>
      </View>

    )
  }

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
            //flex: 1,
            borderRadius: 16,
            borderWidth: 0.5,
            borderColor: colors.blackText,
            alignSelf: "center",
            //marginBottom: "4%",
            marginBottom: 15,
            backgroundColor:
            section.title === "dokončené:" ? colors.correct_light : colors.white,
          },
        ]}
      >
        <View style={{ padding: 10 }}>
          <Text style={[EXTRABOLD12, { textTransform: "uppercase" }]}>
            {item.type}
          </Text>
          <Text style={[BOLD20]}>{item.title}</Text>
          <Text style={REGULAR16}>{item.description}</Text>
        </View>
        {
          section.title == "následující:" ? (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text
          style={[
            BOLD15,
            {
              textTransform: "uppercase",
              color: colors.primary,
              textAlign: "center",
              marginBottom: 30
            },
          ]}
          onPress={() => navigation.navigate(activityType[item.type],
            {
            header: item.title,
            module_name: route.params.name,
            //setActivityFinished: setActivityFinished,
            activity: item,
            from_challenge: false
            //data: data
          })}
        >
          SPUSTIT
        </Text>

            </View>

          ) : (
            /** onPress = {() => spustit znovu? pokud ano -> dát na aktivitu} */
            <View style={{flex:1, alignItems: "flex-end", 
            //backgroundColor: colors.primary, 
            flexDirection: "row",
            justifyContent: "center"
            }}>

            <Text style={[
              BOLD15,
              {
                textTransform: "uppercase",
                color: colors.grey,
                textAlign: "center",
                //marginBottom: "5%"
                marginBottom: 30
                //flex: 1
              },
            ]} 
            >
              dokončena
            </Text>
            {/* <Image
              style={{marginBottom: 30, marginLeft: 30}} // upravit na čísla
              source={require("../assets/images/testIcons/check.png")}
            /> */}
            </View>
          )
        }
      </View>
    );
  };

  if (data_formatted.length == 0) {
    return null;
  }

  return (
    <View style={{ 
      //backgroundColor: colors.correct, 
    flex: 1 }}>
      <SectionList
        sections={data_formatted}
        keyExtractor={(item, index) => index}
        renderItem={renderActivityItem}
        renderSectionFooter={renderNoActivities}
        renderSectionHeader={({ section }) => (
          <View>
          <Text
            style={[
              REGULAR16,
              { 
              textTransform: "capitalize",
              // marginBottom: "4%",
              // marginLeft: "4%"
              marginBottom: 15,
              marginLeft: 20
            },
            ]}
          >
            {section.title}
          </Text>
          </View>
        )}
        ListHeaderComponent={
          <Text style={[BOLD32, { textTransform: "capitalize",
        //  marginLeft: "4%",
        //  marginTop: "4%"
         marginLeft: 20,
         marginTop: 20,
         marginBottom: 10

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