module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      // ['module:react-native-dotenv', {
      //   moduleName: '@env',
      //   path: '.env',
      //   safe: false,
      //   allowUndefined: false,
      // }],
      'react-native-reanimated/plugin', // sempre por último
    ],
  };
};
