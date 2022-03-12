import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";


function Challenges(props) {
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text>Výzvy</Text>
      </ScrollView>
    </View>
  );
}

export default Challenges;

const styles = StyleSheet.create({
  container: {},
});
