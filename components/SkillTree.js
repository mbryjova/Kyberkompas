import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import colors from "../assets/colors/colors";
import { SEMIBOLD16 } from "./atoms/typography";
import { get_from_url, MODULES_URL } from "../database/queries";


function SkillTree(props) {
  const [modules, setModules] = React.useState([]);

  //const modules_data = require("../data/db.json").modules;

  React.useEffect(() => {
    //GET(setModules, URL_MODULES);
    const unsubscribe = props.navigation.addListener('focus', () => 
    get_from_url(setModules, MODULES_URL)
    )

    return unsubscribe
  }
  , [props.navigation])

  const renderModuleItem = ({ item }) => {
    //const sum_points_percent = (item.current_score / item.max_score) * 100;
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
                name: item.title,
                module_id: item.id // abych si pak mohla fechnout konkrétní data
                
                //finished: item.finished_activities,
                //activities: item.activities, // nevím jestli budu posílat, zatím nepoužívám
              })
            }
            disabled={!item.available}
          >
            <View
              style={[
                { marginBottom: 15, marginTop: 20},
                { transform: [{ rotate: "270deg" }] },
              ]}
            >
              
              <AnimatedProgressWheel
                progress={item.progress * 100}
                backgroundColor={colors.white}
                color={item.progress * 100 == 100 ? colors.correct : (item.progress == 0 ? colors.white : colors.primary)}
                size={88}
                width={8}
              />
            </View>
            <Image
              source={item.available ? {uri: item.image} : require("../assets/images/lock.png")}
              style={item.available ? {
                position: "absolute",
                width: 60,
                height: 60,
                marginTop: 34,
                resizeMode: "cover",
                borderRadius: 50,
                alignSelf: "center",
              } : {width: 25, height: 25, position: "absolute", alignSelf: 'center', marginTop: 50}}
              />
          </TouchableOpacity>
          {/* {
            !item.available &&
            (
            <Image style={{width:20, height: 20}} source={require("../assets/images/lock.png")}>

            </Image>)
          } */}
          <Text style={SEMIBOLD16}>{item.title}</Text>
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
      style={{paddingLeft: 5, paddingRight: 5}}
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
        ListEmptyComponent={
          () => <Text style={{textAlign: 'center'}}>App Loading</Text>
        }
        //style={{alignContent: 'center', alignItems: 'center'}}
      />
    </View>
  );
}

export default SkillTree;
