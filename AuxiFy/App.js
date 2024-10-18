import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import HomeScreen from './Screen/HomeScreen/Home.js';
// import SearchScreen from './Screen/Search/Search.js';
// import LibraryScreen from './Screen/Library/Library.js';
// import ProfileScreen from './Screen/Profile/Profile.js';

// import SplashScreen from './Screen/SplashScreen.js';
// import OnboardingScreen from './Screen/OnboardingScreen.js';
// import NavBar from './Screen/Component/NavBar.js';
// import PlayScreen from './Screen/PlayScreen/PlayScreen.js';
// import LoginScreen from './Screen/Auth/LoginScreen.js';
// import SignupScreen from './Screen/Auth/SignupScreen.js';
// import Profile from './Screen/Profile/Profile.js';


import { SplashScreen, SignupScreen, OnboardingScreen, NavBar, PlayScreen, LoginScreen, Profile, Dev, LibraryScreen, SettingScreen, HomeScreen, SignUp, AboutScreen, SignUpInScreen,} from './Screen/Component/Assets.js';
import axios from 'axios';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuxiFy = () => {

  // useEffect(() => {
  //   const fetchData = async () => {


  //     const res = await fetch('http://localhost:3001')
  //     const data = res.json()
  //     console.log(data)

  //   }
  // }, [])

  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        axios
        .post('http://192.168.1.207:38345/userdata',{token:token})
        .then(res=>console.log(res.data));
      } catch (error) {
        console.error("Error fetching token", error);
      }
    }
  
    fetchToken(); 
  
  }, []);  
  


  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AuxiFy" component={AuxiFy} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpInScreen" component={SignUpInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupForm" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} option={{headerShown:false}}/>
        <Stack.Screen name="PlayScreen" component={PlayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dev" component={Dev} options={{ headerShown: false }} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
