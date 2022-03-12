import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Signup from "./components/Signup";
import Login from "./components/Login";
import Challenges from "./components/Challenges";
import SkillTree from "./components/SkillTree";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import colors from "./assets/colors/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.grey,
      }}
    >
      <Tab.Screen name="Výzvy" component={Challenges} />
      <Tab.Screen name="Znalosti" component={SkillTree} />
      <Tab.Screen name="Žebříček" component={Leaderboard} />
      <Tab.Screen name="Profil" component={Profile} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    width: 375,
    height: 80,
    flex: 1,
    backgroundColor: colors.white
  }
});
