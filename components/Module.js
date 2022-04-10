import React from "react";
import { Text, View, SectionList } from "react-native";
import {
  BOLD15,
  BOLD20,
  BOLD32,
  EXTRABOLD12,
  REGULAR16,
} from "./atoms/typography";
import colors from "../assets/colors/colors";

function Module({ route, navigation }) {
  const header = "aktivity";
  //const finished_data = route.params.finished;
  // const activities = route.params.activities;
  const data = require("../data/db.json");

  const renderActivityItem = ({ item }) => {
    return (
      <View
        style={[
          {
            height: 179,
            width: 341,
            borderRadius: 16,
            borderWidth: 0.5,
            borderColor: colors.blackText,
            alignSelf: "center",
            marginBottom: 14,
            backgroundColor:
              item.status === "dokončené" ? colors.correct : colors.white,
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
        <Text
          style={[
            BOLD15,
            {
              textTransform: "uppercase",
              color: colors.primary,
              textAlign: "center",
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          SPUSTIT
        </Text>
      </View>
    );
  };

  return (
    <View style={{ paddingBottom: 54 }}>
      <SectionList
        sections={data.activities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivityItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={[
              REGULAR16,
              { textTransform: "capitalize", marginBottom: 14, marginLeft: 14 },
            ]}
          >
            {title}
          </Text>
        )}
        ListHeaderComponent={
          <Text style={[BOLD32, { textTransform: "capitalize", padding: 14 }]}>
            {header}
          </Text>
        }
      />

      {/* <Text style={[REGULAR16, {textTransform: 'capitalize'}]}>
                {finished}
            </Text>

            <FlatList 
                data={data.finished_activities}
                keyExtractor={(item) => item.id}
                renderItem={renderActivityItem}
                //style={{alignContent: 'center', alignSelf: 'center'}}
            />


            
            <Text style={[REGULAR16, {textTransform: 'capitalize'}]}>
                {next}
            </Text>
            <FlatList
                data={data.activities}
                keyExtractor={(item) => item.id}
                renderItem={renderActivityItem}
            /> */}
    </View>
  );
}

export default Module;
