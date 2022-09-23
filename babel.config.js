/*
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
*/
/*
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
  ],
};
*/

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    env: {
      development: {
        plugins: ["react-native-reanimated/plugin"],
      },
      production: {
        plugins: ["react-native-reanimated/plugin", "react-native-paper/babel"],
      },
    },
  };
}; 