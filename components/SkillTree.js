import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import colors from "../assets/colors/colors";
import { SEMIBOLD16 } from "./atoms/typography";
import axios from "axios";


function SkillTree(props) {
  const [modules, setModules] = React.useState([]);

  const modules_data = require("../data/db.json").modules;

  React.useEffect(() => {

    const fetchData = () => {
      console.log("here");
      axios.get('http://192.168.1.106:3000/modules')
      .then((response) => {
        console.log(response);
        setModules(response.data);
        console.log(modules);
      }).catch(error => console.log(error));
      
    }
    fetchData();
    //console.log(modules);
      /*const data = await fetch('http://localhost:3000/modules'); // získá data
      const json = await data.json(); // převede na json
      setModules(json); // nastaví state modules na data*/
  }
  , [])

  //fetchData().catch(error => console.log(error)); // zavolá fetchdata a případně catchne error

  /*fetch('http://localhost:3000/modules')
    .then(resp => {return resp.json();})
    .then(responseData => {
      console.log("ok");
      console.log(responseData);
      setModules(responseData);
    }).catch(error => console.log(error))
  */ //}, [])
  //{transform: [{rotate: '270deg'}]}

  const renderModuleItem = ({ item }) => {
    const sum_points_percent = (item.current_score / item.max_score) * 100;
    return (
      <View>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            marginBottom: 20,
            paddingHorizontal: 30,
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
              source={require("../assets/images/challenge2.png")}
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
  return (
    <View
      //style={{ alignContent: "center", alignItems: "center", paddingTop: 17 }}
    >
      <FlatList
        data={modules_data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderModuleItem}
        numColumns={2}
        contentContainerStyle={{alignItems: 'center', paddingTop: 17}} // upravit
        //style={{alignContent: 'center', alignItems: 'center'}}
      />
    </View>
  );
}

export default SkillTree;
