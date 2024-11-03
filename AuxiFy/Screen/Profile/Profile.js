import React from 'react';
import { View, Pressable, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Dev, Profile_edit} from '../Component/Assets';
import { useNavigation } from '@react-navigation/native'; 

import {DevImage, BackIcon, UserIcon, DevIcon ,SettingIcon} from '../Component/Assets'


const { width: ScreenW, height: ScreenH } = Dimensions.get('window');



const Profile = ({route}) => {
    const {userData} = route.params;
    const {loginType} = route.params;
    const {playlists} = route.params;
    const navigation = useNavigation();

    
    return (
        <View style={{backgroundColor:'#1C1B1B', height:'100%'}}>

            
            {/* User Details */}
            <View style={{flexDirection:'column',height:ScreenH*0.38, backgroundColor: '#2C2B2B', borderBottomLeftRadius:66, borderBottomRightRadius:66}}>
                {/* App Bar */}
                <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal: 20,paddingVertical: 0,paddingTop: ScreenH *0.05, width: '100%',}}>
                    <Text style={{fontSize:17, color:'white'}}>Profile</Text> 
                    <Text style={{fontSize:17, color:'white'}}>Edit Profile</Text>                
                </View>

                {/* User Profile */}
                <View style={{width:ScreenW, alignItems:'center', paddingVertical:ScreenH*0.02}}>
                    {userData?.images && userData.images.length > 0 && userData.images[0]?.url ? (
                        <Image source={{ uri: userData.images[0].url }} style={{ width: 62, height: 62, borderRadius: 35, alignItems: 'center', justifyContent: 'center' }} />
                    ) : (
                        <Image source={DevImage} style={{ width: 62, height: 62, borderRadius: 35, alignItems: 'center', justifyContent: 'center' }}/>
                    )}
                </View>

                {/* User Name */}
                <View style={{alignItems:'center', marginBottom:40}}>
                    <Text style={{fontStyle:'italic', fontSize:ScreenW*0.03, marginBottom:5}}>{loginType == 'MongoDB' ? userData?.email : userData.email}</Text>
                    <Text style={{fontSize:ScreenW*0.05, fontWeight:'bold', color:'white'}}>{loginType == 'Spotify' ? userData?.display_name : name}</Text>
                </View>

                {/* Follower */}
                {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', paddingVertical:45}}>
                    <View style={{flexDirection:'column', alignItems:'center'}}>
                        <Text style={{fontSize:ScreenW*0.055, }}>800</Text>
                        <Text style={{fontSize:ScreenW*0.035, color:'white',  fontWeight:'bold'}}>Views</Text>
                    </View>

                    <View style={{flexDirection:'column', alignItems:'center'}}>
                        <Text style={{fontSize:ScreenW*0.055, }}>800</Text>
                        <Text style={{fontSize:ScreenW*0.035, color:'white', fontWeight:'bold'}}>Followers</Text>
                    </View>
                </View> */}

                {/* LogOut */}
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={{backgroundColor: '#1DB954', paddingVertical: ScreenH * 0.01, paddingHorizontal: ScreenW* 0.05, borderRadius: 30, alignItems:'center'}} onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold',}}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Setting */}
            <View style={{flexDirection:'column', paddingVertical: 40}}>
                {/* Setting List */}
                <View style={{width:'100%'}}>

                    {/* My Profile */}
                    <Pressable style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal: 30}} onPress={() => {
                        navigation.navigate('ProfileEdit', { userData });
                    }}>
                        
                                
                        {/* Icon */}
                        <View style={{width: 50, height: 50, borderRadius:17 ,backgroundColor:'#E9E9FF', alignItems:'center', justifyContent:'center'}}>
                            <UserIcon color="black"/>
                        </View>
                        <Text style={{ color: 'white', fontSize: ScreenW*0.038, fontWeight:'500' ,position:'absolute', left:0, paddingHorizontal:ScreenW*0.22}}>My Profile</Text>
                        <BackIcon style={{color:'white', transform: [{ rotate: '180deg' }], }}/>
                    </Pressable>


                    {/* Setting */}
                    <Pressable style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between',paddingVertical: 20, paddingHorizontal: 30}} onPress={() => navigation.navigate('SettingScreen')}>
                                
                        {/* Icon */}
                        <View style={{width: 50, height: 50, borderRadius:17 ,backgroundColor:'#E9E9FF', alignItems:'center', justifyContent:'center'}}>
                            <SettingIcon color="black"/>
                        </View>
                        <Text style={{ color: 'white', fontSize: ScreenW*0.038, fontWeight:'500' ,position:'absolute', left:0, paddingHorizontal:ScreenW*0.22}}>Setting</Text>
                        <BackIcon style={{color:'white', transform: [{ rotate: '180deg' }], }}/>
                    </Pressable>


                    {/* Developer */}
                    <Pressable style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal: 30}} onPress={() => navigation.navigate('Dev')}>
                                
                        {/* Icon */}
                        <View style={{width: 50, height: 50, borderRadius:17 ,backgroundColor:'#E9E9FF', alignItems:'center', justifyContent:'center'}}>
                            <DevIcon color="black"/>
                        </View>
                        <Text style={{ color: 'white', fontSize: ScreenW*0.038, fontWeight:'500' ,position:'absolute', left:0, paddingHorizontal:ScreenW*0.22}}>Developer</Text>
                        <BackIcon style={{color:'white', transform: [{ rotate: '180deg' }], }}/>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default Profile;
