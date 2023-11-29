import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PointHistory from "@screens/hotspot/pointTransaction/PointHistory";
import RedeemHistory from "@screens/hotspot/pointTransaction/RedeemHistory";
//import color
import Colors from "@styles/Colors";
const Tab = createMaterialTopTabNavigator();
const styles = StyleSheet.create({
  tabStyle: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    textTransform: "none",
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.theme_color,
  },
  indicatorStyle: {
    backgroundColor: Colors.theme_color,
  },
});

function PointNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: styles.indicatorStyle,
        tabBarStyle: { backgroundColor: "white" },
        tabBarLabelStyle: { textTransform: "none" },
      }}
    >
      <Tab.Screen name="Point History" component={PointHistory} />
      <Tab.Screen name="Redeem History" component={RedeemHistory} />
    </Tab.Navigator>
  );
}

export default PointNavigator;
