/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path")
const { getDefaultConfig } = require('metro-config');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // resolver: {
  //   extraNodeModules: {
  //     path: path.resolve(__dirname, 'node_modules'),
  //     crypto: require.resolve('react-native-crypto'),
  //     stream: require.resolve('stream-browserify'),
  //     assert: require.resolve('assert'),
  //     randomBytes: require.resolve("react-native-randombytes"),
  //     buffer: require.resolve('buffer'),

  //   },
  // },
};




