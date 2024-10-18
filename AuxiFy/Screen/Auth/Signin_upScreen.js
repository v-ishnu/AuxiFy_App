import React, { useState } from 'react';
import BackIcon from '../../assets/Icon/back.svg';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const logo = require('../../assets/AppImage/logo4.png');

const SignUpInScreen = () => {
    const navigation = useNavigation();
    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const [isSignUpHovered, setIsSignUpHovered] = useState(false);

    return (
        <View style={styles.container}>
            {/* Background Images */}
            <ImageBackground
                source={require('../../assets/AppImage/billie.png')}
                style={styles.bg}
                resizeMode="cover" >
            </ImageBackground>

            <ImageBackground
                source={require('../../assets/AppImage/Union2.png')}
                style={styles.bgUnionBt}
                resizeMode="cover" >
            </ImageBackground>

            <ImageBackground
                source={require('../../assets/AppImage/Union.png')}
                style={styles.bgUnionUp}
                resizeMode="cover">
            </ImageBackground>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Logo */}
                <View style={styles.logocontainer}>
                    <Image style={styles.logo} source={logo} />
                </View>

                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Enjoy listening to music</Text>
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Spotify is a proprietary Swedish audio streaming and media services provider</Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    {/* Login button */}
                    <TouchableOpacity 
                        style={[styles.loginbtn, isLoginHovered && styles.loginbtnHovered]} 
                        onPress={() => navigation.navigate('LoginScreen')} 
                        // onPress={() => navigation.navigate('AuxiFy')} 
                        onPressIn={() => setIsLoginHovered(true)} 
                        onPressOut={() => setIsLoginHovered(false)}
                        activeOpacity={1}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    {/* Sign Up button */}
                    <TouchableOpacity 
                        style={[styles.signbtn, isSignUpHovered && styles.signbtnHovered]} 
                        onPress={() => navigation.navigate('SignupScreen')}
                        onPressIn={() => setIsSignUpHovered(true)} 
                        onPressOut={() => setIsSignUpHovered(false)}
                        activeOpacity={1}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SignUpInScreen;

const { width: ScreenW, height: ScreenH } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1B1B',
    },
    bg: {
        position: 'absolute',
        bottom: 0,
        height: ScreenH * 0.5,
        width: ScreenW,
    },
    bgUnionBt: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: ScreenH * 0.24,
        width: ScreenW * 0.5,
    },
    bgUnionUp: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: ScreenH * 0.18,
        width: ScreenW * 0.35,
    },
    appBar: {
        position: 'absolute',
        top: ScreenH * 0.065,
        left: 25,
        zIndex: 1,
    },
    backButn: {
        width: ScreenW * 0.07,
        height: ScreenW * 0.07,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logocontainer: {
        marginTop: ScreenH * 0.1,
        alignItems: 'center',
    },
    logo: {
        paddingBottom: ScreenH * 0.2,
        width: ScreenW * 0.42,
        resizeMode: 'contain',
    },
    headerContainer: {
        marginBottom: ScreenH * 0.02,
    },
    header: {
        fontSize: ScreenW * 0.08,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        width: ScreenW * 0.82,
        fontSize: ScreenW * 0.035,
        color: 'white',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ScreenH * 0.1,
        width: ScreenW * 0.78,
        marginBottom: ScreenW,
    },
    loginbtn: {
        backgroundColor: '#42C83C',
        paddingVertical: ScreenH * 0.02,
        paddingHorizontal: ScreenW * 0.13,
        borderRadius: 30,
    },
    loginbtnHovered: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: '#42C83C',
    },
    signbtn: {
        paddingVertical: ScreenH * 0.02,
        paddingHorizontal: ScreenW * 0.12,
        backgroundColor: 'transparent',
        borderRadius: 30,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: '#42C83C',
        
    },
    signbtnHovered: {
        backgroundColor: '#42C83C',
        borderStyle: 'solid',
    },
    buttonText: {
        color: 'white',
        fontSize: ScreenW * 0.034,
        fontWeight: 'bold',
    },
});
