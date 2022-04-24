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
  Module,
  Quiz,
  ActivityFinished,
  InteractiveReading,
  YesOrNo
} from "./components";
import colors from "./assets/colors/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptions = {
  headerTitleStyle: BOLD20,
  headerStyle: {
    height: 96, // velikost horního navbaru
  },
  headerTitleAlign: "center",
  tabBarLabelStyle: [REGULAR12, { marginBottom: 15 }], // ten text by měl být tlustší, margin bottom aby to líp sedělo k ikonce
  tabBarIconStyle: { marginTop: 15 },
  tabBarStyle: { height: 80, backgroundColor: colors.white }, // velikost spodního navbaru
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.blackText,
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
        component={SkillTree} // nevím jestli dát do samostatnýho stacku? nevím
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
    return <Text style={{ textAlign: "center" }}>App loading</Text>;
  }
  const myTheme = {
    colors: {
      background: colors.white,
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { height: 96 }, // nevím jak udělat nefunguje
          headerTitleStyle: BOLD20,
          headerTitleAlign: "center",
          screenStyle: {
            backgroundColor: colors.white, // změní pozadí obrazovky?
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
          name="Challenge"
          component={Challenge}
          options={{
            title: "Výzva",
          }}
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
        name="ActivityFinished"
        component={ActivityFinished}
        options={{
          title: "Aktivita dokončena"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({ // můžu vymazat
  
});
