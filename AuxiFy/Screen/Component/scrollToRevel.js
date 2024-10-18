import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const SimpleScrollScreen = () => {
  const [showNextScreen, setShowNextScreen] = useState(false);

  // This function checks if the user scrolled to the bottom
  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height) {
      setShowNextScreen(true);  // Show the next screen when scrolled to bottom
    }
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      <View style={styles.screen}>
        <Text style={styles.text}>Main Screen Content</Text>
      </View>
      {showNextScreen && (
        <View style={styles.nextScreen}>
          <Text style={styles.text}>Next Screen Content</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: 600, // Make the screen scrollable
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  nextScreen: {
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
  },
  text: {
    fontSize: 20,
  },
});

export default SimpleScrollScreen;
