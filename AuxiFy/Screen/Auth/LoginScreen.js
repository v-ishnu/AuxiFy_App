import {Text, View, Image, Pressable, TextInput, TouchableOpacity, Alert}from 'react-native';
import {react, logo, ScreenW, ScreenH, useState,GoogleIcon, SpotifyIcon, AppleIcon, DevIcon} from '../Component/Assets'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen =()=> {

    const navigation =useNavigation();

    //  UserData Schema Set
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin (){
        console.log(email, password);

        const userData={
            email:email,
            password,
        }

        axios
        .post("https://auxify-app.onrender.com/login", userData)
        .then(res => {
            console.log(res.data);
            if (res.data.status === 'ok') {
                Alert.alert("Logged in Successfully");
                AsyncStorage.setItem("token", res.data.data)
                AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true))
                navigation.navigate('AuxiFy');
            } else {
                Alert.alert("Login failed. Please try again.");
            }
        })
        .catch(error => {
            console.error("There was an error!", error);
            Alert.alert("Login error", error.message);
        }
    )};

    return (
        <View style={{backgroundColor:'#1C1B1B', flex:1, paddingVertical:50}}>
            <View style={{alignItems:'center', flexDirection:'column'}}>
                {/* Logo */}
                <Image source={logo} style={{width:ScreenW*0.37, resizeMode:'contain'}}/>

                {/* Register */}
                <Text style={{fontSize:ScreenW*0.05, fontWeight:'500', color:'white'}}>Sign In</Text>
                <View style={{flexDirection:"row", marginTop: 10, alignItems:'center'}}>
                    <Text style={{fontSize:14, color:'white'}}>If you need any support</Text>
                    <Pressable onPress={{}}>
                        <Text style={{fontSize:14, marginLeft:7, color:'#38B432'}}>Click Here</Text>
                    </Pressable>
                </View>



                {/* Text Input */}
                <View style={{paddingTop:ScreenH*0.05}}>
                    {/* email */}
                    <View style={{height: 70,width: ScreenW * 0.87,borderColor: 'grey', borderWidth: 1, borderRadius: 19, marginBottom: 30, paddingHorizontal: 20,flexDirection: 'row', alignItems: 'center',}}>
                        <TextInput style={{ flex: 1, paddingHorizontal: 10, color: 'white' }} placeholder="Email" value={email} onChangeText={setEmail}/>
                    </View>


                    {/* Password */}
                    <View style={{height: 70,width: ScreenW * 0.87,borderColor: 'grey',borderWidth: 1,borderRadius: 19,marginBottom: 30,paddingHorizontal: 20,flexDirection: 'row',alignItems: 'center',}}>
                        <TextInput style={{ flex: 1, paddingHorizontal: 10, color: 'white' }} placeholder="Password" placeholderTextColor="white" value={password}onChangeText={setPassword}secureTextEntry />
                        <DevIcon color="grey"/>
                    </View>


                </View>



                {/* Recovery Password */}
                <View style={{ width:ScreenW*0.87, justifyContent:'center', alignSelf: 'flex-start', marginBottom:30, paddingHorizontal:30 }}>
                    <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={{ fontSize: 14, marginLeft: 7, color: '#38B432', fontWeight:'500' }}>Recover Password</Text>
                    </Pressable>
                </View>




                {/* Button  */}
                <View style={{width:ScreenW*0.87, backgroundColor:'#1DB954', height:ScreenH*0.072, borderRadius:23}}>
                    <TouchableOpacity style={{alignItems:'center', height:"100%", width:'100%', justifyContent:'center'}} onPress={handleLogin}>
                        <Text style={{ color: '#fff', fontSize: ScreenW*0.047, fontWeight: 'bold', textAlign: 'center' }}>Sign In</Text>
                    </TouchableOpacity>
                </View>




                {/* Or Section */}
                <View style={{flexDirection:'row',width:ScreenW*0.87 ,paddingVertical:ScreenH*0.05, justifyContent:'center', alignItems:'center'}}>
                    <LinearGradient colors={['#5B5B5B', '#252525']} style={{height:1, width:ScreenW*0.37, marginRight:10}} start={{ x: 0, y: 0 }}  end={{ x: 1, y: 0 }}   />
                    <Text>
                        Or
                    </Text>
                    <LinearGradient colors={['#5B5B5B', '#252525']} style={{height:1, width:ScreenW*0.37,marginLeft:10}} start={{ x: 1, y: 0 }}  end={{ x: 0, y: 0 }}   />
                </View>




                {/* Google, Spotify, Iphone */}
                <View style={{flexDirection: 'row', alignItems: 'center', width:ScreenW*0.6, justifyContent: 'space-around'}}>
                    <SpotifyIcon width="50" height="50" />
                    <GoogleIcon width="50" height="50" />
                    <AppleIcon width="55" height="55" style={{marginBottom:8}} />
                </View>




                {/* Login Form */}
                <View style={{flexDirection:"row", marginTop: ScreenH*0.05, alignItems:'center'}}>
                    <Text style={{fontSize:14, color:'white'}}>Don't have a account ?</Text>
                    <Pressable onPress={() => navigation.navigate('LoginScreen')}> 
                        <Text style={{fontSize:14, marginLeft:5, color:'#38B432'}}>Register now</Text>
                    </Pressable>
                </View>

            </View>
        </View>
    )
}
export default LoginScreen;