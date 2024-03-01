import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as RootNavigation from "./RootNavigation.js";
import { navigationRef, isReadyRef } from "./RootNavigation";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
//import screen
import RootNavigator from "@navigators/RootNavigator";
//import color
import Colors from "@styles/Colors";
//import font
import * as Font from "expo-font";
import { initializeLocalization } from "./src/services/i18n";
import * as Notifications from "expo-notifications";

const config = {
  screens: {
    KBZReturn: {
      path: "kbz",
      parse: {
        invoiceId: (id) => `${id}`,
      },
    },
  },
};

const linking = {
  prefixes: [Linking.createURL("/")],
  config,
};

const App = ({}) => {
  const [font_loaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadCustomFonts();
    initializeLocalization();
  }, []);

  useEffect(() => {
    const handleNotification = (notification) => {
      // Handle the notification, navigate to a specific screen
      // For example, navigate to SpecificScreen
      // console.log(notification.request.content.data);
      // Handle the notification response here
      const notificationData = notification.request.content.data;
      const status = notificationData.status;
      console.log(status);
      if (status == "topup") {
        RootNavigation.navigate("HomeScreen");
      } else {
        const noti_id = notificationData.noti_id;
        const title = notificationData.title;
        const body = notificationData.body;
        if (status == 1) {
          //payment warning , expired
          RootNavigation.navigate("PaymentNotiDetail", { title, body });
        } else if (status == 2) {
          //send news or event
          RootNavigation.navigate("NewsNotiDetail", { noti_id });
        } else {
          RootNavigation.navigate("PaySuccess");
        }
      }
    };

    const subscription =
      Notifications.addNotificationReceivedListener(handleNotification);

    return () => {
      subscription.remove();
    };
  }, []); // Add navigation to dependency array

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
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
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
