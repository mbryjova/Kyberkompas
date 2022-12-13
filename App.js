import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BOLD20, REGULAR12 } from "./components/atoms/typography";
import React from 'react';
import { UserContext } from "./components/context/context";

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
  Module,
  Quiz,
  ActivityFinished,
  InteractiveReading,
  YesOrNo,
  APIActivity
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
  tabBarLabelStyle: [REGULAR12, { marginBottom: 15 }],
  tabBarIconStyle: { marginTop: 15 },
  tabBarStyle: { height: 80, backgroundColor: colors.white },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.blackText
  
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
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

  const [user, setUser] = React.useState(null);

  if (!fontsLoaded) {
    return <Text style={{ textAlign: "center" }}>App loading</Text>;
  }
  

  return (
    <UserContext.Provider value={[user, setUser]}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { height: 96 },
          headerTitleStyle: BOLD20,
          headerTitleAlign: "center",
          contentStyle: {
            backgroundColor: colors.white,
          },
        }}
      >
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
          name="Module"
          component={Module}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          title: "Test"
        }}
        />
        <Stack.Screen
        name="InteractiveReading"
        component={InteractiveReading}
        options={{
          title: "Interaktivní čtení"
        }}
        />
        <Stack.Screen
        name="YesOrNo"
        component={YesOrNo}
        options={{
          title: "Ano nebo ne?"
        }}
        />
        <Stack.Screen
        name="APIActivity"
        component={APIActivity}
        options={{
          title: "Informační aktivita"
        }}
        />
        <Stack.Screen
        name="ActivityFinished"
        component={ActivityFinished}
        options={{
          title: "Aktivita dokončena"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
}
