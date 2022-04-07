import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BOLD20, REGULAR12 } from "./components/atoms/typography";

import {
  useFonts,
  Mulish_700Bold,
  Mulish_600SemiBold,
  Mulish_400Regular,
  Mulish_800ExtraBold,
} from "@expo-google-fonts/mulish";

import {
  Signup,
  Login,
  Challenges,
  SkillTree,
  Leaderboard,
  Profile,
  Challenge,
} from "./components";
import colors from "./assets/colors/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptions = {
  headerTitleStyle: BOLD20,
  headerStyle: {
    height: 96,
  },
  headerTitleAlign: "center",
  tabBarLabelStyle: [REGULAR12, { marginBottom: 15 }], // ten text by měl být tlustší
  tabBarIconStyle: { marginTop: 15 },
  tabBarStyle: { height: 80 },
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.blackText,
      }}
      screenOptions={headerOptions}
    >
      <Tab.Screen
        name="Výzvy"
        component={Challenges}
        options={{
          tabBarIcon: (tabInfo) => (
            <Image
              source={
                tabInfo.focused
                  ? require("./assets/images/tabBarIcons/challenges_active.png")
                  : require("./assets/images/tabBarIcons/challenges_inactive.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Znalosti"
        component={SkillTree}
        options={{
          tabBarIcon: (tabInfo) => (
            <Image
              source={
                tabInfo.focused
                  ? require("./assets/images/tabBarIcons/skilltree_active.png")
                  : require("./assets/images/tabBarIcons/skilltree_inactive.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Žebříček"
        component={Leaderboard}
        options={{
          tabBarIcon: (tabInfo) => (
            <Image
              source={
                tabInfo.focused
                  ? require("./assets/images/tabBarIcons/leaderboard_active.png")
                  : require("./assets/images/tabBarIcons/leaderboard_inactive.png")
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{
          tabBarIcon: (tabInfo) => (
            <Image
              source={
                tabInfo.focused
                  ? require("./assets/images/tabBarIcons/profile_active.png")
                  : require("./assets/images/tabBarIcons/profile_inactive.png")
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Mulish_700Bold,
    Mulish_600SemiBold,
    Mulish_400Regular,
    Mulish_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Text style={{selfAlign: 'center'}}>App loading</Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={
        headerStyle={height: 80} // nevím jak udělat nefunguje
        }>
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
        <Stack.Screen
          name="Challenge"
          component={Challenge}
          options={{
            title: "Výzva",
            headerShown: true,
            headerTitleStyle: BOLD20,
            headerTitleAlign: "center"
          }}
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
    backgroundColor: colors.white,
    fontSize: 12,
    fontFamily: "Mulish_700Bold",
  },
});
