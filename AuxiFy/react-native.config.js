module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./assets/fonts/'],

    // Leave the auto-linking enabled by removing the platforms block for react-native-device-info
    dependencies: {
      'react-native-device-info': {
        platforms: {
          ios: {},  
          android: {}, 
        },
      },
    },
  };