import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import FiberHeader from "@components/FiberHeader";
import Fonts from "@styles/Fonts";
export default class PaymentNotiDetail extends React.Component {
  render() {
    var title = this.props.route.params.title;
    var body = this.props.route.params.body;

    return (
      <View style={{ flex: 1 }}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="Noti Detail"
          onPress={() => this.props.navigation.navigate("FiberDashboard")}
        />
        <View style={styles.container}>
          <Image
            style={styles.bell_icon}
            source={require("@icons/noti_bell.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              fontWeight: "900",
              fontFamily: Fonts.primary,
              lineHeight: 25,
              fontSize: 18,
            }}
          >
            Expire Date Warning
          </Text>
          <Text
            style={{
              fontFamily: Fonts.primary,
              lineHeight: 25,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Dear Demo User, your internet subscription will expire within 7
            days.
          </Text>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              this.props.navigation.navigate("PaymentNavigator", {
                screen: "UnPaid",
              })
            }
          >
            <View style={[styles.btnStyle]}>
              <Text
                style={[
                  styles.btnText,
                  { color: "#ffffff", fontSize: 16, fontWeight: "700" },
                ]}
              >
                Make Payment
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal:10
    fontSize: Fonts.fontSizePrimary,
    fontFamily: Fonts.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    // marginTop: 100,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  bell_icon: {
    width: 100,
    height: 100,
    // marginBottom:100
  },
  btnStyle: {
    borderColor: "#1179C2",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#0079b3",

    // width: 125,
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  btnText: {
    fontSize: 14,
    fontFamily: Fonts.primary,
  },
});
