const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { assetExts, sourceExts } = require('metro-config/src/defaults/defaults'); // This helps access the default extensions

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // Use SVG transformer
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'), // Remove svg from assetExts
    sourceExts: [...sourceExts, 'svg'], // Add svg to sourceExts
  },
};

// Merge the default config with the SVG config
const config = mergeConfig(getDefaultConfig(__dirname), svgConfig);

module.exports = config;
