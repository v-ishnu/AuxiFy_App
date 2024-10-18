import React from "react";
import {View, Text, Dimensions,TouchableOpacity, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import {ScreenH, ScreenW, BackIcon, MoreIcon, Dev, UserIcon, DevIcon, DevImage} from '../Component/Assets'



const LibraryScreen = () => {

    const navigation = useNavigation();


    return (
        <View style={{backgroundColor:'#1C1B1B', height:'100%'}}>
            {/* User Details */}
            <View style={{flexDirection:'column',height:ScreenH*0.38, backgroundColor: '#2C2B2B', borderBottomLeftRadius:66, borderBottomRightRadius:66}}>
                {/* App Bar */}
                <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal: 20,paddingVertical: 0,paddingTop: ScreenH *0.05, width: '100%',}}>
                    <Text style={{fontSize:17, color:'white'}}>Playlist</Text>
                    <Text style={{fontSize:17, color:'white'}}>Create</Text>                    
                </View>

                {/* User Profile */}
                <View style={{width:ScreenW, alignItems:'center', paddingVertical:ScreenH*0.02}}>
                    <Image source={DevImage} style={{width:62, height:62, borderRadius:35, alignItems:'center', justifyContent:'center'}}/>
                </View>

                {/* User Name */}
                <View style={{alignItems:'center'}}>
                    <Text style={{fontStyle:'italic', fontSize:ScreenW*0.03, marginBottom:5}}>vishnuprakash572@gmail.com</Text>
                    <Text style={{fontSize:ScreenW*0.05, fontWeight:'bold', color:'white'}}>Vishnu Prakash</Text>
                </View>

                {/* Follower */}
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', paddingVertical:45}}>
                    <View style={{flexDirection:'column', alignItems:'center'}}>
                        <Text style={{fontSize:ScreenW*0.055, }}>800</Text>
                        <Text style={{fontSize:ScreenW*0.035, color:'white',  fontWeight:'bold'}}>Views</Text>
                    </View>

                    <View style={{flexDirection:'column', alignItems:'center'}}>
                        <Text style={{fontSize:ScreenW*0.055, }}>800</Text>
                        <Text style={{fontSize:ScreenW*0.035, color:'white', fontWeight:'bold'}}>Followers</Text>
                    </View>
                </View>

            </View>

            {/* Setting */}
            <View style={{flexDirection:'column', paddingVertical: 40}}>
                {/* Setting List */}
                <View style={{width:'100%'}}>

                    {/* My Profile */}
                    <Pressable style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal: 30}} onPress={() => navigation.navigate('Dev')}>
                                
                        {/* Icon */}
                        <View style={{width: 50, height: 50, borderRadius:17 ,backgroundColor:'#E9E9FF', alignItems:'center', justifyContent:'center'}}>
                            <UserIcon color="black"/>
                        </View>
                        <Text style={{ color: 'white', fontSize: ScreenW*0.038, fontWeight:'500' ,position:'absolute', left:0, paddingHorizontal:ScreenW*0.22}}>My Profile</Text>
                        <BackIcon style={{color:'white', transform: [{ rotate: '180deg' }], }}/>
                    </Pressable>


                    {/* Developer */}
                    <Pressable style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between',paddingVertical: 20, paddingHorizontal: 30}} onPress={() => navigation.navigate('Dev')}>
                                
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
    )
}

export default LibraryScreen;