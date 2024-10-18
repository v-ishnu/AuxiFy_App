import React, { useState, useEffect } from 'react';
import { Dimensions, ImageBackground, StatusBar, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BgImage = require('../assets/AppImage/BGImage.jpg');
// const logo = require('../assets/AppImage/SpotifyLogo.png');
const logo = require('../assets/AppImage/logo4.png');

const OnboardingScreen = ({ navigation }) => {
    // const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    // useEffect(() => {
    //     // Check if the user has visited onboarding before
    //     const checkOnboardingStatus = async () => {
    //         try {
    //             const hasVisited = await AsyncStorage.getItem('hasVisitedOnboarding');
    //             if (hasVisited === null) {
    //                 setIsFirstLaunch(true);
    //             } else {
    //                 navigation.replace('AuxiFy'); 
    //             }
    //         } catch (error) {
    //             console.log('Error checking onboarding status:', error);
    //         }
    //     };

    //     checkOnboardingStatus();
    // }, []);

    // const handleGetStarted = async () => {
    //     try {
    //         await AsyncStorage.setItem('hasVisitedOnboarding', 'true');
    //         navigation.replace('AuxiFy'); 
    //     } catch (error) {
    //         console.log('Error saving onboarding status:', error);
    //     }
    // };

    // if (isFirstLaunch === null) {
        
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <Text style={styles.loadingText}>Loading...</Text>
    //         </View>
    //     );
    // }

    return (
        <ImageBackground
            source={BgImage}
            style={styles.backgroundImage}>

            {/* Status Bar */}
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

            {/* Body */}
            <View style={styles.container}>
                <View style={styles.logocontainer}>
                    <Image style={styles.logo} source={logo} />
                </View>

                <Text style={styles.title}>Enjoy listening to music</Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis enim purus sed phasellus.
                    Cursus ornare id scelerisque aliquam.
                </Text>

                {/* Button */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpInScreen')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start', 
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    logocontainer: {
        alignItems: 'center',
        marginTop:height*0.05
    },
    logo: {
        width: width * 0.40,
        resizeMode: 'contain',
        marginBottom:height*0.4,
    },
    title: {
        fontSize: width * 0.08,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: height * 0.04,
        paddingTop:height*0.05
    },
    description: {
        width: width * 0.8,
        fontSize: width * 0.035,
        color: 'white',
        textAlign: 'center',
        marginBottom: height * 0.04,
    },
    button: {
        backgroundColor: '#1DB954',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen;
