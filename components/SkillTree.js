import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import colors from "../assets/colors/colors";
import { SEMIBOLD16 } from "./atoms/typography";
import { GET, URL_MODULES } from "../database/queries";

//const port = process.env.PORT || 4000;

function SkillTree(props) {
  const [modules, setModules] = React.useState([]);

  const modules_data = require("../data/db.json").modules;

  React.useEffect(() => {
    GET(setModules, URL_MODULES);
  }
  , [])

  const renderModuleItem = ({ item }) => {
    const sum_points_percent = (item.current_score / item.max_score) * 100;
    return (
      <View style={{width: '50%'}}>
        <View
          style={{
            //backgroundColor: colors.correct,
            //alignContent: "center",
            alignItems: "center",
            marginBottom: 20,
            //width: '100%'
            //paddingHorizontal: 30,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Module", {
                name: item.name,
                finished: item.finished_activities,
                activities: item.activities, // nevím jestli budu posílat, zatím nepoužívám
              })
            }
            disabled={item.available == 1 ? false : true}
          >
            <View
              style={[
                { marginBottom: 15, marginTop: 20 },
                { transform: [{ rotate: "270deg" }] },
              ]}
            >
              
              <AnimatedProgressWheel
                progress={sum_points_percent}
                backgroundColor={colors.white}
                color={sum_points_percent == 100 ? colors.correct : (sum_points_percent == 0 ? colors.white : colors.primary)}
                size={88}
                width={8}
              />
            </View>
            <Image
              source={{uri: item.image}}
              style={{
                position: "absolute",
                width: 60,
                height: 60,
                marginTop: 34,
                resizeMode: "cover",
                borderRadius: 50,
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
          <Text style={SEMIBOLD16}>{item.name}</Text>
        </View>
      </View>
    );
  };

  //fetchData();
  if (modules.length == 0) {
    return null;
  }
  return (
    <View
      //style={{ alignContent: "center", alignItems: "center", paddingTop: 17 }}
    >
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderModuleItem}
        numColumns={2}
        columnWrapperStyle={{
          //backgroundColor: colors.primary,
          justifyContent: 'space-around',
          //width: '100%'
        }}
        contentContainerStyle={{
          //alignItems: 'center', 
          //paddingHorizontal: 30,
          //justifyContent: 'space-around',
          //paddingTop: 17, 
          //backgroundColor: colors.correct_light
        }} // upravit
        //style={{alignContent: 'center', alignItems: 'center'}}
      />
    </View>
  );
}

export default SkillTree;
