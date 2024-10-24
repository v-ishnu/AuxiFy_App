import React, { useState, useEffect } from 'react';
import BackIcon from '../../assets/Icon/back.svg';
import { View, StyleSheet, Dimensions, Image, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrected import
import { authorize } from 'react-native-app-auth';

// Import Icons
import GoogleIcon from '../../assets/Icon/google.svg';
import FacebookIcon from '../../assets/Icon/fb.svg';
import PhoneIcon from '../../assets/Icon/phone.svg';
import SignUp from './SignUp';

const logo = require('../../assets/AppImage/logo4.png');

const SignupScreen = () => {
    const navigation = useNavigation();

    // Spotify Registration
    useEffect(() => {
        const checkTokenValidity = async () => {
          const accessToken = await AsyncStorage.getItem('token');
          const expirationDate = await AsyncStorage.getItem('expirationDate');
          console.log('Access Token:', accessToken);
          console.log('Expiration Date:', expirationDate);
    
          if (accessToken && expirationDate) {
            const currentTime = Date.now();
            if (currentTime < parseInt(expirationDate)) {
              navigation.replace('AuxiFy'); // Token is still valid
            } else {
              // Token is expired, clear it
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('expirationDate');
            }
          }
        };
        checkTokenValidity();
      }, []);
      
      async function authenticate() {
        const config = {
          issuer: 'https://accounts.spotify.com',
          clientId: '49acc7ca57a44bcca2d74638978e1b71',
          redirectUrl: 'com.auxify://callback',
          scopes: [
            'user-read-email',
            'user-library-read',
            'user-read-recently-played',
            'user-top-read',
            'playlist-read-private',
            'playlist-read-collaborative',
            'playlist-modify-public', // or "playlist-modify-private"
          ],
        };
      
        try {
          const result = await authorize(config);
          console.log('Spotify Auth Result:', result);  // Log the result for debugging
      
          if (result.accessToken) {
            const expirationDate = result.accessTokenExpirationDate 
              ? new Date(result.accessTokenExpirationDate).getTime()
              : Date.now() + 3600 * 1000;
      
            if (expirationDate) {
              await AsyncStorage.setItem('token', result.accessToken);
              await AsyncStorage.setItem('expirationDate', expirationDate.toString());
            } else {
              console.warn('No expiration date in the response');
              await AsyncStorage.setItem('token', result.accessToken);
            }
      
            navigation.navigate('AuxiFy');
          }
        } catch (error) {
          console.error('Authentication Error:', error);
        }
      }


    //   Phone Auth


    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {/* Logo */}
                <Image source={logo} style={styles.logo} />

                {/* Text */}
                <View>
                    <Text style={styles.text}>Millions of Songs.</Text>
                    <Text style={styles.text}>Free on AuxiFy.</Text>
                </View>

                {/* Login Option */}
                <View style={styles.logOption}>
                    {/* Spotify */}
                    <Pressable onPress={authenticate} style={[styles.button, { backgroundColor: '#42C83C' }]}>
                        <Text style={styles.buttonText}>Continue with Spotify</Text>
                    </Pressable>

                    {/* Phone No. */}
                    <Pressable style={[styles.button, { backgroundColor: 'transparent', borderColor: '#908C8C', borderWidth: 1, flexDirection: 'row' }]}>
                        <PhoneIcon height='24' width='24' />
                        <Text style={styles.buttonText}>Continue with phone number</Text>
                    </Pressable>

                    {/* Google */}
                    <Pressable style={[styles.button, { backgroundColor: 'transparent', borderColor: '#908C8C', borderWidth: 1, flexDirection: 'row' }]}>
                        <GoogleIcon height='25' width='25' />
                        <Text style={styles.buttonText}>Continue with Google</Text>
                    </Pressable>

                    {/* Facebook */}
                    <Pressable style={[styles.button, { backgroundColor: 'transparent', borderColor: '#908C8C', borderWidth: 1, flexDirection: 'row' }]}>
                        <FacebookIcon height='24' width='24' />
                        <Text style={styles.buttonText}>Continue with Facebook</Text>
                    </Pressable>

                    {/* Sign Up */}
                    <Pressable onPress={() => navigation.navigate('SignupForm')} style={{ paddingVertical:20 , paddingHorizontal:38}}>
                        <Text style={[styles.signUpText,{textAlign:'justify', fontWeight:'500'}]}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default SignupScreen;

const { width: ScreenW, height: ScreenH } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1B1B',
        flex: 1,
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: ScreenH * 0.2,
        flex: 1, 
    },
    logo: {
        width: ScreenW * 0.4,
        resizeMode: 'contain',
    },
    text: {
        textAlign: 'center',
        fontSize: ScreenW * 0.068,
        fontWeight: 'bold',
        color: 'white',
    },
    logOption: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: ScreenH * 0.14,
    },
    button: {
        width: ScreenW * 0.89,
        padding: 14,
        marginBottom: 20,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: 10, 
    },
    signUpText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});
