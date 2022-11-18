module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    env: {
      development: {
        plugins: [[
          "module:react-native-dotenv",
          {
            envName: "APP_ENV",
            moduleName: "@env",
            path: ".env",
          }
        ],"@babel/plugin-proposal-export-namespace-from", "react-native-reanimated/plugin"],
      },
      production: {
        plugins: ["react-native-paper/babel", "@babel/plugin-proposal-export-namespace-from", "react-native-reanimated/plugin"],
      },
    },
  };
}; 