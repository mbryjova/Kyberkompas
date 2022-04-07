import React from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";


function renderUserItem({item}) {
  return  (
  <View>
    <Text>
      {item.first_name}
    </Text>
  </View>
  )
}

function Leaderboard(props) {
  const data = require('../data/db.json');
  return (
    <View style={styles.container}>
      <FlatList
      data={data.users}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={renderUserItem}
      />
    </View>
  );
}

export default Leaderboard;

const styles = StyleSheet.create({
  container: {},
});
