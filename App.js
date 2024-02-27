import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
//import screen
import RootNavigator from "@navigators/RootNavigator";
//import color
import Colors from "@styles/Colors";
//import font
import * as Font from "expo-font";
import { initializeLocalization } from "./src/services/i18n";
const App = () => {
  const [font_loaded, setFontLoaded] = useState(false);
  useEffect(() => {
    loadCustomFonts();
    initializeLocalization();
  }, []);

  const loadCustomFonts = async () => {
    try {
      let primaryFont = require("@fonts/myanmar-sagar.ttf");
      let primaryFontBold = require("@fonts/myanmar-sagar.ttf");

      await Font.loadAsync({
        "Primary-Font": primaryFont,
        "Primary-Font-Bold": primaryFontBold,
      });
      setFontLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <NavigationContainer>
      {font_loaded ? (
        <RootNavigator />
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size={"large"} color={Colors.theme_color} />
        </View>
      )}
      <StatusBar backgroundColor={Colors.theme_color} />
    </NavigationContainer>
  );
};

export default App;
