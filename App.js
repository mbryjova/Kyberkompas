import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
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
        inactiveTintColor: colors.blackText
        
      }}
    >
      <Tab.Screen name="Výzvy" component={Challenges} options={{
        tabBarIcon: (tabInfo) => <Image source={tabInfo.focused ? require('./assets/images/tabBarIcons/challenges_active.png') : 
        require('./assets/images/tabBarIcons/challenges_inactive.png')} />
      }}/>
      <Tab.Screen name="Znalosti" component={SkillTree} options={{
        tabBarIcon: (tabInfo) => <Image source={tabInfo.focused ? require('./assets/images/tabBarIcons/skilltree_active.png') : 
        require('./assets/images/tabBarIcons/skilltree_inactive.png')} />
      }}/>
      <Tab.Screen name="Žebříček" component={Leaderboard} options={{
        tabBarIcon: (tabInfo) => <Image source={tabInfo.focused ? require('./assets/images/tabBarIcons/leaderboard_active.png') : 
        require('./assets/images/tabBarIcons/leaderboard_inactive.png')} />
      }}/>
      <Tab.Screen name="Profil" component={Profile} options={{
        tabBarIcon: (tabInfo) => <Image source={tabInfo.focused ? require('./assets/images/tabBarIcons/profile_active.png') : 
        require('./assets/images/tabBarIcons/profile_inactive.png')} />
      }}/>
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
    backgroundColor: colors.white,
    fontSize: 12,
    //fontFamily: 'Mulish-Bold',
  }
});
