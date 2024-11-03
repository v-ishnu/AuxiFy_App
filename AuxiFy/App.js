import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, RecentlyPlayed, SignupScreen, ProfileEdit, OnboardingScreen, NavBar, PlayScreen, LoginScreen, Profile, Dev, LibraryScreen, SettingScreen, HomeScreen, SignUp, AboutScreen, SignUpInScreen, PreLoader, ArtistProfile,} from './Screen/Component/Assets.js';
import PlayerProvider from './PlayerContext.js';
import axios from 'axios';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AuxiFy = ({props}) => {
  
  
  const [userData, setUserData] = useState('');
  const [loginType, setLoginType] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [isLoggedIn, setIsLogged] = useState(false);


  // Retrieve login status
  const retrieveLoginStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('keepLoggedIn');
      setIsLogged(data ? true : false);
    } catch (error) {
      console.error('Error retrieving login status:', error);
    }
  };

  // Fetching User Data through mongodb
  useEffect(() => {
     retrieveLoginStatus();
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem('token');
        // console.log(token);
        axios
        .post('https://auxify-app.onrender.com/userdata', { token: token })
        .then((res) => {
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
        setUserData(data);
        setLoginType("Spotify");
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
  }
  useEffect(()=>{
    getProfile()
  },[])


  // Recent Played Song
  const getRecentlyPlayedSongs = async () =>{
    const accessToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/player/recently-played?limit=10',
        headers: {
          Authorization: `Bearer ${accessToken}`, 
      },
      })
      const tracks = response.data.items
      setRecentlyPlayed(tracks);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=>{
    getRecentlyPlayedSongs();
  },[])

  // console.log('Received recentlyPlayed data in AppJS:', recentlyPlayed);

  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props} initialParams= {{recentlyPlayed, userData, loginType, }} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} initialParams= {{recentlyPlayed, userData, loginType, }} />
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
    <PlayerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown:false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="AuxiFy" component={AuxiFy} />
          <Stack.Screen name="SignUpInScreen" component={SignUpInScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="SignupForm" component={SignUp} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
          <Stack.Screen name="PlayScreen" component={PlayScreen}  />
          <Stack.Screen name="Dev" component={Dev} />
          <Stack.Screen name="SettingScreen" component={SettingScreen} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
          <Stack.Screen name="RecentlyPlayed" component={RecentlyPlayed} />
          <Stack.Screen name="ArtistProfile" component={ArtistProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}