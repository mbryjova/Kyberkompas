import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";


function Leaderboard(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text>Žebříček</Text>
      </ScrollView>
    </View>
  );
}

export default Leaderboard;

const styles = StyleSheet.create({
  container: {},
});
