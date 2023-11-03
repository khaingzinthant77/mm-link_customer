module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@appjson": "./app.json",
            "@images": "./assets/images",
            "@icons": "./assets/icons",
            "@fonts": "./assets/fonts",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@navigators": "./src/navigations",
            "@styles": "./src/styles",
            "@services": "./src/services",
            "@apis": "./src/apis",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
