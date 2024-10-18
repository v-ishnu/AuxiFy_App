import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';

const MusicPlayerProgressBar = () => {
  const [progress] = useState(new Animated.Value(0));
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const totalDuration = 75; 

  useEffect(() => {
    if (!isDragging) {
      Animated.timing(progress, {
        toValue: elapsedTime,
        duration: (totalDuration - elapsedTime) * 1000,
        useNativeDriver: false,
      }).start();
    }

    const interval = setInterval(() => {
      if (!isDragging && elapsedTime < totalDuration) {
        setElapsedTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isDragging, elapsedTime]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      setIsDragging(true);
      const touchX = evt.nativeEvent.locationX;
      const newTime = Math.round((touchX / barWidth) * totalDuration);
      setElapsedTime(newTime);
      progress.setValue(newTime); 
    },
    onPanResponderMove: (evt) => {
      const touchX = evt.nativeEvent.locationX;
      const newTime = Math.round((touchX / barWidth) * totalDuration);
      setElapsedTime(newTime);
      progress.setValue(newTime); 
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
    },
  });

  const widthInterpolation = progress.interpolate({
    inputRange: [0, totalDuration],
    outputRange: ['0%', '100%'],
  });

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.timeWrapper}>
        <Text style={styles.timeText}>{formatTime(elapsedTime)}</Text>
        <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
      </View>
      <View
        style={styles.container}
        {...panResponder.panHandlers}
        onLayout={(event) => {
          setBarWidth(event.nativeEvent.layout.width);
        }}
      >
        <Animated.View style={[styles.bar, { width: widthInterpolation }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '89%',
    marginVertical: 20,
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 14,
    color: '#333',
  },
  container: {
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: 5,
    backgroundColor: '#1DB954',
    borderRadius: 5,
  },
});

export default MusicPlayerProgressBar;
