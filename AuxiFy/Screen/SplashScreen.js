import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Lottie from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 1200); 

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style={{backgroundColor:"transparent"}}/>
      <Lottie
        source={require('../assets/Splash/Animation-1727781523173.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',  
    height: '100%', 
  },
});
