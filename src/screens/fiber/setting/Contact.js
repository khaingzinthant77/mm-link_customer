import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Linking,
  BackHandler,
} from "react-native";

export default class Contact extends React.Component {
  _handlePhoneCall(number) {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ height: 10, backgroundColor: "#337ab7" }}>
          <StatusBar />
        </SafeAreaView>
        {/* <ScrollView> */}
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Image
              source={require("@icons/previous.png")}
              style={styles.backImg}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Contact</Text>
          <View></View>
        </View>
        <View>
          <View style={styles.headerLogo}>
            <Image
              source={require("@images/splash.png")}
              style={styles.headerLogoStyle}
            />
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: "15%" }}>
            <View style={styles.rowContainer}>
              <Image
                source={require("@icons/mail.png")}
                style={{ marginRight: 20 }}
              />
              <TouchableOpacity
                onPress={() => Linking.openURL("mailto:info@mm-link.net")}
                style={styles.underline}
              >
                <Text style={styles.labelStyle}>info@mmlink.net</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <Image
                source={require("@icons/globle.png")}
                style={{ marginRight: 20 }}
              />
              <TouchableOpacity
                onPress={() => Linking.openURL("http://mm-link.net/")}
                style={styles.underline}
              >
                <Text style={styles.labelStyle}>mm-link.net</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <Image
                source={require("@icons/facebook.png")}
                style={{ marginRight: 20 }}
              />
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://www.facebook.com/mmlinkisp/")
                }
                style={styles.underline}
              >
                <Text style={styles.labelStyle}>
                  https://www.facebook.com/mmlinkisp/
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <Image
                source={require("@icons/phone.png")}
                style={{ marginRight: 20 }}
              />
              <TouchableOpacity
                onPress={() => this._handlePhoneCall("09789799799")}
                style={styles.underline}
              >
                <Text style={styles.labelStyle}>09 789 799 799</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    height: 50,
    backgroundColor: "#1179C2",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
  backImg: {
    width: 25,
    height: 25,
  },
  headerLogo: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    marginTop: 20,
    paddingHorizontal: 50,
  },
  headerLogoStyle: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#337ab7",
  },
  underline: {
    borderBottomColor: "#337ab7",
    borderBottomWidth: 1,
  },
});
