import {Text, View, Image, Pressable, TextInput, TouchableOpacity, Alert}from 'react-native';
import {react, logo, ScreenW, ScreenH, useState,GoogleIcon, SpotifyIcon, AppleIcon} from '../Component/Assets'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const SignUp =() =>{
    const navigation =useNavigation();

    //  UserData Schema Set
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        const userData={
            name:name,
            email:email,
            mobile:mobile,
            password:password,
        };

        if (name === '' || email === '' || password === '' || confirmPassword === '') {
          Alert.alert('Error', 'Please fill all the fields');
        } else if (password !== confirmPassword) {
          Alert.alert('Error', 'Passwords do not match');
        } else {
          // Handle registration logic here
          Alert.alert('Success', 'User registered successfully');
          navigation.navigate('LoginScreen')
        }

        axios.post("https://auxify-app.onrender.com/register",userData)
        .then(res=> console.log(res.data))
        .catch(e => console.log(e));      
        
      };


    return (
        <View style={{backgroundColor:'#1C1B1B', flex:1, paddingVertical:50}}>
            <View style={{alignItems:'center', flexDirection:'column'}}>
                {/* Logo */}
                <Image source={logo} style={{width:ScreenW*0.37, resizeMode:'contain'}}/>

                {/* Register */}
                <Text style={{fontSize:ScreenW*0.05, fontWeight:'500', color:'white'}}>Register</Text>
                <View style={{flexDirection:"row", marginTop: 10, alignItems:'center'}}>
                    <Text style={{fontSize:14, color:'white'}}>If you need any support</Text>
                    <Pressable onPress={{}}>
                        <Text style={{fontSize:14, marginLeft:7, color:'#38B432'}}>Click Here</Text>
                    </Pressable>
                </View>

                {/* Text Input */}
                <View style={{paddingTop:ScreenH*0.05}}>
                    {/* Name */}
                    <TextInput style={{ height: 50, width:ScreenW*0.87,borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, borderRadius:19, borderColor:'grey', paddingHorizontal:20 }} placeholder="Full Name" value={name} onChangeText={setName}/>


                    {/* email */}
                    <TextInput keyboardType='email' style={{ height: 50, width:ScreenW*0.87,borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, borderRadius:19, borderColor:'grey', paddingHorizontal:20 }} placeholder="Email" value={email} onChangeText={setEmail}/>



                    {/* Mobile */}
                    <TextInput keyboardType='numeric' style={{ height: 50, width:ScreenW*0.87,borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, borderRadius:19, borderColor:'grey', paddingHorizontal:20 }} placeholder="Mobile No." value={mobile} onChangeText={setMobile}/>



                    {/* Password */}
                    <TextInput style={{ height: 50, width:ScreenW*0.87,borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, borderRadius:19, borderColor:'grey', paddingHorizontal:20 }} placeholder="Create Your Password" value={password} onChangeText={setPassword}/>



                    {/* Re-Type Password */}
                    <TextInput style={{ height: 50, width:ScreenW*0.87,borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, borderRadius:19, borderColor:'grey', paddingHorizontal:20 }} placeholder="Re-Type Password" value={confirmPassword} onChangeText={setConfirmPassword}/>
                </View>

                {/* Button  */}
                <View style={{width:ScreenW*0.87, backgroundColor:'#1DB954', height:ScreenH*0.067, borderRadius:30}}>
                    <TouchableOpacity style={{alignItems:'center', height:"100%", width:'100%', justifyContent:'center'}} onPress={() => handleRegister()}>
                        <Text style={{ color: '#fff', fontSize: ScreenW*0.047, fontWeight: 'bold', textAlign: 'center' }}>Create Account</Text>
                    </TouchableOpacity>
                </View>

                {/* Or Section */}
                <View style={{flexDirection:'row',width:ScreenW*0.87 ,paddingVertical:ScreenH*0.05, justifyContent:'center', alignItems:'center'}}>
                    {/* <View style={{width:ScreenW*0.3, height:1, borderColor:'white', borderWidth:1}}/> */}
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
                    <Text style={{fontSize:14, color:'white'}}>Do you have an account? </Text>
                    <Pressable onPress={() => navigation.navigate('LoginScreen')}> 
                        <Text style={{fontSize:14, marginLeft:7, color:'#38B432'}}>Sign in</Text>
                    </Pressable>
                </View>

            </View>
        </View>
    )

}


export default SignUp;