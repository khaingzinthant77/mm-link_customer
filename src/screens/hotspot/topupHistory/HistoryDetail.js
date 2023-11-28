import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
//import font
import Fonts from "@styles/Fonts";
//import color
import Colors from "@styles/Colors";
//import library
import Moment from "moment";

import { Divider } from "react-native-paper";
import TopupHeader from "@components/TopupHeader";
const HistoryDetail = ({ navigation }) => {
  const route = useRoute();
  const data = route.params.topup_data;
  const topup_type = route.params.topup_type;

  useEffect(() => {
    const backAction = () => {
      navigation.goBack(null);
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor={Colors.theme_color}
        headerText="Detail"
        onPressBack={() =>
          route.params.back_route
            ? navigation.navigate(route.params.back_route)
            : navigation.navigate("TopupHistoryList")
        }
        showSetting={false}
      />
      <ScrollView>
        {topup_type == "topup" ? (
          <View>
            <View style={{ alignItems: "center", marginTop: 30 }}>
              <Image
                source={require("@icons/hotspot/topup_history/success_icon.png")}
                style={{ width: 100, height: 100 }}
              />
            </View>
            <View style={{ marginTop: 40 }}>
              <View style={styles.view_container}>
                <Text style={styles.text_style}>Transaction Name</Text>
                <Text style={styles.text_style}>Data Topup</Text>
              </View>

              <View style={styles.view_container}>
                <Text style={styles.text_style}>Data</Text>
                <Text style={styles.text_style}>
                  {data ? data.plan_name : ""}
                </Text>
              </View>

              <View style={styles.view_container}>
                <Text style={styles.text_style}>Received Point</Text>
                <Text style={[styles.text_style, { color: "green" }]}>
                  + {data ? data.bonus_point : 0} Points
                </Text>
              </View>
              <View style={styles.view_container}>
                <Text style={styles.text_style}>Date</Text>
                <Text style={styles.text_style}>
                  {data
                    ? Moment(data.created_at).format("DD MMM Y hh:m:ss A")
                    : ""}
                </Text>
              </View>
              <View style={styles.view_container}>
                <Text style={styles.text_style}>Payment Type</Text>
                <Text style={styles.text_style}>
                  {data ? data.payment_type : ""}
                </Text>
              </View>
            </View>
          </View>
        ) : topup_type == "received" ? (
          <View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("@icons/hotspot/topup_history/award_data.png")}
                style={{ width: 120, height: 120 }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                paddingHorizontal: 10,
                backgroundColor: "#dededc",
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 5,
                marginBottom: 20,
              }}
            >
              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Transaction Name</Text>
                <Text style={styles.text_style}>Gift Topup</Text>
              </View>
              <Divider style={{ backgroundColor: "gray" }} />
              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Transaction Status</Text>
                <Text style={[styles.text_style, { color: "green" }]}>
                  Received
                </Text>
              </View>
              <Divider style={{ backgroundColor: "gray" }} />
              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Transfer From</Text>
                <Text style={styles.text_style}>{data ? data.c_ph : ""}</Text>
              </View>
              <Divider style={{ backgroundColor: "gray" }} />
              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Data</Text>
                <Text style={styles.text_style}>
                  {data ? data.plan_name : ""}
                </Text>
              </View>
              <Divider style={{ backgroundColor: "gray" }} />

              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Date</Text>
                <Text style={styles.text_style}>
                  {data
                    ? Moment(data.created_at).format("DD MMM Y hh:m:ss A")
                    : ""}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("@icons/hotspot/topup_history/transaction.png")}
                style={{ width: 120, height: 120 }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                paddingHorizontal: 10,
                backgroundColor: "#dededc",
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 5,
                marginBottom: 20,
              }}
            >
              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Transaction Name</Text>
                <Text style={styles.text_style}>Gift Topup</Text>
              </View>
              <Divider style={{ backgroundColor: "gray" }} />
              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Transaction Status</Text>
                <Text style={styles.text_style}>Done</Text>
              </View>
              <Divider style={{ backgroundColor: "gray" }} />
              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Receiver</Text>
                <Text style={styles.text_style}>{data ? data.g_ph : ""}</Text>
              </View>
              <Divider style={{ backgroundColor: "gray" }} />
              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Data</Text>
                <Text style={styles.text_style}>
                  {data ? data.plan_name : ""}
                </Text>
              </View>
              <Divider style={{ backgroundColor: "gray" }} />
              <View style={[styles.view_container, , { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Received Point</Text>
                <Text style={[styles.text_style, { color: "green" }]}>
                  + 10 Points
                </Text>
              </View>
              <Divider style={{ backgroundColor: "gray" }} />
              <View style={[styles.view_container, { paddingVertical: 15 }]}>
                <Text style={styles.text_style}>Date</Text>
                <Text style={styles.text_style}>
                  {data
                    ? Moment(data.created_at).format("DD MMM Y h:m:ss A")
                    : ""}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  view_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  text_style: { fontSize: 16, fontFamily: Fonts.primary },
});
export default HistoryDetail;
