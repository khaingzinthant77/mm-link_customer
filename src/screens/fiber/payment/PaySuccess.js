import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FiberHeader from "@components/FiberHeader";
import Fonts from "@styles/Fonts";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default class PaySuccess extends React.Component {
  constructor(props) {
    super(props);
    this.BackHandler = null;
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <FiberHeader
          // backgroundColor="#337ab7"
          headerText="Pay Success"
          routeName="Home"
          onPress={() =>
            this.props.navigation.navigate("PaymentNavigator", {
              type: "fiber",
            })
          }
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 100,
          }}
        >
          <Image
            source={require("@images/payment_success.png")}
            style={{ width: 130, height: 130 }}
          />
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: Fonts.primary,
                color: "#409304",
              }}
            >
              Thank You!
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 17 }}>Payment Done Successfully</Text>
          </View>

          <View style={styles.btn_container}>
            <TouchableOpacity
              style={{
                backgroundColor: "#409304",
                width: 100,
                height: 40,
                position: "absolute",
                bottom: 20,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
              onPress={() => this.props.navigation.navigate("PaymentNavigator")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontFamily: Fonts.primary,
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn_container: {
    // flex: 1,
    height: 100,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});
