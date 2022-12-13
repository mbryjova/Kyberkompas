import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import colors from "../assets/colors/colors";
import { SEMIBOLD16 } from "./atoms/typography";
import { get_from_url, MODULES_URL } from "../database/queries";

/**
 *
 * @param {*} props
 * @returns screen with modules
 */
function SkillTree(props) {
  const [modules, setModules] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () =>
      get_from_url(setModules, MODULES_URL)
    );

    return unsubscribe;
  }, [props.navigation]);

  /**
   *
   *
   * @returns function rendering one module item
   */
  const renderModuleItem = ({ item }) => {
    return (
      <View style={{ width: "50%" }}>
        <View
          style={{
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Module", {
                name: item.title,
                module_id: item.id,
              })
            }
            disabled={!item.available}
          >
            <View
              style={[
                { marginBottom: 15, marginTop: 20 },
                { transform: [{ rotate: "270deg" }] },
              ]}
            >
              <AnimatedProgressWheel
                progress={item.progress * 100}
                backgroundColor={colors.white}
                color={
                  item.progress * 100 == 100
                    ? colors.correct
                    : item.progress == 0
                    ? colors.white
                    : colors.primary
                }
                size={88}
                width={8}
              />
            </View>
            <Image
              source={
                item.available
                  ? { uri: item.image }
                  : require("../assets/images/lock.png")
              }
              style={
                item.available
                  ? {
                      position: "absolute",
                      width: 60,
                      height: 60,
                      marginTop: 34,
                      resizeMode: "cover",
                      borderRadius: 50,
                      alignSelf: "center",
                    }
                  : {
                      width: 25,
                      height: 25,
                      position: "absolute",
                      alignSelf: "center",
                      marginTop: 50,
                    }
              }
            />
          </TouchableOpacity>

          <Text style={SEMIBOLD16}>{item.title}</Text>
        </View>
      </View>
    );
  };

  if (modules.length == 0) {
    return null;
  }
  return (
    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderModuleItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-around",
        }}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>App Loading</Text>
        )}
      />
    </View>
  );
}

export default SkillTree;
