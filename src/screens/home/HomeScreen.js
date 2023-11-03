import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import style
import Styles from "@styles/Styles";
//import color
import Colors from "@styles/Colors";
//import font
import Fonts from "@styles/Fonts";
import appjson from "@appjson";
const HomeScreen = ({ navigation }) => {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");

  hotspotLogin = async () => {
    const tusername = await AsyncStorage.getItem("tusername");
    const tpassword = await AsyncStorage.getItem("tpassword");

    if (tusername != null && tpassword != null) {
      setUserName(tusername);
      setPassword(tpassword);
      navigation.navigate("Dashboard", {
        type: "topup",
      });
    } else {
      navigation.navigate("SignIn");
    }
  };
  handlePhoneCall = (phone) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView backgroundColor={Colors.theme_color} />
      <View
        style={{
          backgroundColor: Colors.theme_color,
          height: Dimensions.get("screen").width * 2,
          borderRadius: (Dimensions.get("screen").width * 2) / 2,
          width: Dimensions.get("screen").width * 2,
          position: "absolute",
          top: -(Dimensions.get("screen").width * 1.1),
          left: "-50%",
          elevation: 5,
          borderColor: "#F2F2F2",
          shadowOffset: { width: 0, height: 2 }, //IOS
          shadowOpacity: 0.5, //IOS
        }}
      />
      <View style={{ position: "absolute", top: "10%", bottom: "45%" }}>
        <Image
          source={require("@images/logo/mm-link_logo.png")}
          style={styles.logo_style}
        />
      </View>
      <View style={styles.type_container}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => hotspotLogin()}
        >
          <View style={styles.hotspot_container}>
            <Image
              source={require("@icons/home/hotspot_white.png")}
              style={styles.hotspot_style}
            ></Image>
          </View>

          <Text allowFontScaling={false} style={styles.text_style}>
            Hotspot User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => handleCheckLogin()}
        >
          <Image
            source={require("@icons/home/wifi.png")}
            style={styles.img}
          ></Image>
          <Text allowFontScaling={false} style={[styles.text_style]}>
            WiFi/Fiber User
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.check_container}>
        <TouchableOpacity
          style={styles.check_btn}
          onPress={() => navigation.navigate("Map")}
        >
          <Image
            style={styles.map_icon}
            source={require("@icons/home/map.png")}
          />
          <Text
            style={{ color: "white", marginLeft: 10 }}
            allowFontScaling={false}
          >
            CHECK INTERNET ACCESS
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer_container}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://mm-link.net/app-guide")}
          style={{ marginBottom: 10, marginTop: 5 }}
        >
          <Text allowFontScaling={false} style={{ color: "#0B93FB" }}>
            How to used App (Video)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePhoneCall("09789799799")}
          style={{ marginBottom: 10 }}
        >
          <Text allowFontScaling={false}>Call Center: 09 789 799 799</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("http://mm-link.net")}
          style={{ marginBottom: 10 }}
        >
          <Text allowFontScaling={false} style={{ color: "#FA0505" }}>
            Own by IT Spectrum Co., Ltd.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://mm-link.net/privacy-policy/")}
        >
          <Text
            allowFontScaling={false}
            style={{ textDecorationLine: "underline", marginBottom: 15 }}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <Text allowFontScaling={false}>V {appjson.expo.version}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    position: "relative",
  },
  type_container: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-around",
    width: "100%",
    top: Dimensions.get("screen").width - 20,
    width: Dimensions.get("screen").width,
  },
  logo_style: { width: 250, height: 250, resizeMode: "contain" },
  hotspot_style: { width: 30, height: 30 },
  hotspot_container: {
    backgroundColor: "#f24c48",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  text_style: {
    fontSize: Fonts.fontSizePrimary,
    fontSize: 14,
    marginTop: 5,
  },
  check_container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "absolute",
    top: "72%",
  },
  check_btn: {
    backgroundColor: Colors.theme_color,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  map_icon: { width: 20, height: 20, resizeMode: "contain" },
  footer_container: {
    width: Dimensions.get("screen").width,
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    marginTop: 10,
  },
});
export default HomeScreen;
