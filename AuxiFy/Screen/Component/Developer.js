import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions,Linking } from 'react-native';
import {DevImage, Stack} from '../Component/Assets'
import Lottie from 'lottie-react-native';
import DeviceInfo from 'react-native-device-info';



const Dev = () => {

    const LinkedIn = () => {
        
        const linkedInUrl = 'https://www.linkedin.com/in/vishnupraksh'; 
        Linking.openURL(linkedInUrl).catch((err) => console.error('Error opening link:', err));
    };


    return(
        <ScrollView contentContainerStyle={{height: '100%'}}>
            <View style={{ backgroundColor: '#1C1B1B', height: ScreenH, flex:1}}>
                <View style={{flex:1, flexDirection: 'column', paddingVertical: ScreenH*0.07, paddingHorizontal: 20}}>

                    {/* Header */}
                    <Text style={{fontSize: ScreenW*0.048, color:'#42C83C'}}>
                        About
                    </Text>
                    <Text style={{fontSize: ScreenW*0.07, fontWeight:'bold', color:'#42C83C'}}>
                        Developer
                    </Text>


                    {/* Profile */}
                    <TouchableOpacity style={{paddingVertical:30}} onPress={LinkedIn}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={DevImage} style={{width:52, height:52, borderRadius: 25}} />
                            <View style={{flexDirection:'column', paddingHorizontal: 15}}>
                                <Text style={{fontSize:22,fontWeight:'600'}}>Vishnu Prakash</Text>
                                <Text style={{fontSize:14}}>Connect me on LinkedIn</Text>
                            </View>
                        </View>
                    </TouchableOpacity>


                    {/* Version  */}
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={styles.versionText}>v{DeviceInfo.getVersion()}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop:ScreenH*0.69}}>
                        <Lottie
                            source={Stack}
                            autoPlay
                            loop={true}
                            style={styles.animation}/>
                            <Text style={{fontSize:14, fontWeight:'500',color:'white'}}>NexGen Lab</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}


export default Dev;

const { width: ScreenW, height: ScreenH } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1B1B', 
    },
    textContainer: {
        width: ScreenW,
        position: 'absolute',
        top: ScreenH * 0.2, 
        left:ScreenW*0.36, 
        transform: [{rotate:'-90deg'}],
    },
    versionText: {
        fontSize: 145,
        opacity: 0.05,
        color:'#42C83C',
        textAlign: 'right',
        fontFamily:'MuseoModerno-ExtraBold'
    },
    animation:{
        width:50,
        height:50,
    }
  });
