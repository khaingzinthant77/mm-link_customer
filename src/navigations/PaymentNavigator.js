import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PaidList from "@screens/fiber/payment/paid/PaidList";
import UnPaidList from "@screens/fiber/payment/unPaid/UnPaidList";
import NotiCount from "./components/NotiCount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const Tab = createMaterialTopTabNavigator();
const styles = StyleSheet.create({
  tabStyle: {
    // width: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    textTransform: "none",
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#337ab7",
  },
  indicatorStyle: {
    backgroundColor: "#337ab7",
  },
});

function PaymentNavigator() {
  const [count, setCount] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    // console.log("Hello");
    const unsubscribe = navigation.addListener("focus", async () => {
      setCount(await AsyncStorage.getItem("unpaid_count"));
      // Perform actions when arriving at the TopTabNavigator
    });

    return unsubscribe;
  }, [navigation]);

  const handleTabPress = async (e) => {
    // Get the current focused tab
    const focusedTab = e.target;
    // console.log('Tab pressed:', focusedTab);
    // Perform actions based on the pressed tab
    var tab = focusedTab.split("-");
    // console.log(tab)
    if (tab[0] === "UnPaid") {
      setCount(await AsyncStorage.getItem("unpaid_count"));
      // alert(count)
      // alert("UnPaid")
      // Actions for Screen A tab
    } else {
      // alert('hi')
      setCount(await AsyncStorage.getItem("unpaid_count"));
    }
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: styles.indicatorStyle,
        tabBarStyle: { backgroundColor: "white" },
        tabBarLabelStyle: { textTransform: "none" },
      }}
      screenListeners={({ navigation }) => ({
        tabPress: (e) => handleTabPress(e),
      })}
    >
      <Tab.Screen name="Paid" component={PaidList} />
      <Tab.Screen
        name="UnPaid"
        component={UnPaidList}
        options={{
          tabBarBadge: () => {
            return <NotiCount count={count} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default PaymentNavigator;
