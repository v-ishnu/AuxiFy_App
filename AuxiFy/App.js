import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, SignupScreen, ProfileEdit, OnboardingScreen, NavBar, PlayScreen, LoginScreen, Profile, Dev, LibraryScreen, SettingScreen, HomeScreen, SignUp, AboutScreen, SignUpInScreen, PreLoader} from './Screen/Component/Assets.js';
import axios from 'axios';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AuxiFy = ({props}) => {
  
  
  const [userData, setUserData] = useState('');
  const [loginType, setLoginType] = useState('');
  const [playlists, setPlaylists] = useState([]);


  const [isLoggedIn, setIsLogged] = useState(false);
  const _retriveData = async() => {
    try{
      const data= await AsyncStorage.getItem('keepLoggedIn');
      setIsLogged(data);
    } catch (error) {

    }
  }

  // Fetching User Data through mongodb
  useEffect(() => {
    _retriveData();
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        axios
        .post('https://auxify-app.onrender.com/userdata', { token: token })
        .then((res) => {
          console.log(res.data);
          setUserData(res.data.data);
          setLoginType("MongoDB")
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
      } catch (error) {
        console.error("Error fetching token", error);
      }
    }
    fetchToken(); 
  }, []); 

  // Spotify Config User
  const getProfile = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("token"); 
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`, 
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        console.log(data);
        setUserData(data);
        setLoginType("Spotify");
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
  }
  useEffect(()=>{
    getProfile()
  },[])

  


  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} initialParams= {{userData, loginType,playlists}} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLogged] =useState(false);
  const checkLoginStatus = async () =>{
    const token = await AsyncStorage.getItem('token');
    if (token){
      setIsLogged(true);
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} screenOptions={{headerShown:false}}/>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AuxiFy" component={AuxiFy} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpInScreen" component={SignUpInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupForm" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} option={{headerShown:false}}/>
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} option={{headerShown:false}}/>
        <Stack.Screen name="PlayScreen" component={PlayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dev" component={Dev} options={{ headerShown: false }} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
