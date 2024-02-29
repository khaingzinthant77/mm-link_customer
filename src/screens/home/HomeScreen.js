import React, { useState, useEffect } from "react";
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
//import library
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appjson from "@appjson";
//import color
import Colors from "@styles/Colors";
//import font
import Fonts from "@styles/Fonts";
//import Services
import CustomerInfoModal from "@components/CustomerInfoModal";
const HomeScreen = ({ navigation }) => {
  const [locale, setLocale] = useState(null);
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [isOpenAlertModel, setOpenAlertModal] = useState(false);

  useEffect(() => {
    getEndPoint();
  }, []);

  getEndPoint = async () => {
    axios
      .get("https://news.mm-link.net/api/setting_url")
      .then((response) => {
        if (response.data.data.url !== null) {
          var myendpoint = response.data.data.url;
          var is_show_hide = response.data.data.is_show_register;

          AsyncStorage.multiSet(
            [
              ["endpoint", myendpoint],
              ["show_hide", is_show_hide.toString()],
            ],
            (err) => {
              if (err) {
                alert("Asynstorage Error");
              }
            }
          );
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // const res = await getLang();
    // setLocale(res);
  };

  hotspotLogin = async () => {
    const tusername = await AsyncStorage.getItem("tusername");
    const tpassword = await AsyncStorage.getItem("tpassword");

    if (tusername != null && tpassword != null) {
      setUserName(tusername);
      setPassword(tpassword);
      navigation.navigate("HotspotDashboard");
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
  _handleCheckLogin = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token != null) {
      navigation.navigate("FiberDashboard");
    } else {
      navigation.navigate("Login");
    }
  };

  go_chat = (name, phone_no) => {
    // alert(name);
    setOpenAlertModal(false);
    navigation.navigate("ExternalChat", { name, phone: phone_no });
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
          onPress={() => _handleCheckLogin()}
        >
          <Image
            source={require("@icons/home/wifi.png")}
            style={styles.img}
          ></Image>
          <Text allowFontScaling={false} style={[styles.text_style]}>
            Wifi/Fiber User
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.check_container}>
        <TouchableOpacity
          style={styles.check_btn}
          onPress={() => navigation.navigate("CheckNetwork")}
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
            How to use (Video)
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
            IT Spectrum Co., Ltd.
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

      <View style={styles.chat_style}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#2196F3",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setOpenAlertModal(true)}
        >
          <Image
            source={require("@images/chat.png")}
            style={{ width: 20, height: 20, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
      <CustomerInfoModal
        isOpen={isOpenAlertModel}
        onClose={() => setOpenAlertModal(false)}
        onSubmit={(name, phone) => this.go_chat(name, phone)}
      />
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
  chat_style: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 70,
    height: 70,
  },
});
export default HomeScreen;
