import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
  Linking,
  Image,
} from "react-native";
import VersionCheck from "react-native-version-check-expo";
//import url
import AsyncStorage from "@react-native-async-storage/async-storage";
import SvgIcon from "@images/SvgIcon";
import appjson from "@appjson";
//import url
import { APPSTORE_URL, PLAYSTORE_URL } from "@env";
//import component
import TopupHeader from "@components/TopupHeader";
import AlertModel from "@components/AlertModel";
//import styles
import Fonts from "@styles/Fonts";
import Colors from "@styles/Colors";
const HotspotSetting = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [usr_name, setUserName] = useState(null);
  const [pwd, setPassword] = useState(null);
  const [showConfirm, setConfirm] = useState(false);
  useEffect(() => {
    getAsyncData();
  }, []);
  const getAsyncData = async () => {
    setUserName(await AsyncStorage.getItem("tusername"));
    setPassword(await AsyncStorage.getItem("tpassword"));
  };
  _handleLogout = () => {
    setConfirm(true);
  };

  redirctLogout = async () => {
    setConfirm(false);
    try {
      await AsyncStorage.removeItem("tusername");
      await AsyncStorage.removeItem("tpassword");
    } catch (e) {
      // remove error
      console.log(e);
    }

    navigation.navigate("HomeScreen");
  };

  checkUpdateNeeded = async () => {
    if (Platform.OS == "ios") {
      let checkupdate = await VersionCheck.needUpdate();
      if (checkupdate.isNeeded) {
        Alert.alert(
          "Update available!",
          "Version " + checkupdate.latestVersion + " is now available.",
          [
            {
              text: "Cancel",
              style: "default",
            },
            {
              text: "Update",
              onPress: () => Linking.openURL(appstoreUrl),
              style: "destructive",
            }, // open store if update is needed.
          ],
          { cancelable: false }
        );
      } else {
        Linking.openURL(appstoreUrl);
      }
    } else {
      Linking.openURL(playstoreUrl);
    }
  };

  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor={Colors.theme_color}
        headerText="Setting"
        onPressBack={() => navigation.navigate("HotspotDashboard")}
        showSetting={false}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.btn}
        activeOpacity={0.8}
      >
        <View style={styles.imgContainer}>
          <SvgIcon icon={"profile"} width={18} height={18} />
        </View>

        <Text allowFontScaling={false} style={styles.bodyText}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://mm-link.net/about-us")}
        style={styles.btn}
        activeOpacity={0.8}
      >
        <View style={styles.imgContainer}>
          <SvgIcon icon="infocircle" width={20} height={20} />
        </View>

        <Text allowFontScaling={false} style={styles.bodyText}>
          About Us
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("HotspotContact")}
        style={styles.btn}
        activeOpacity={0.8}
      >
        <View style={styles.imgContainer}>
          <SvgIcon icon="contact" width={20} height={20} />
        </View>

        <Text allowFontScaling={false} style={styles.bodyText}>
          Contact Us
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.handleGetLocale(this.state.locale)}
        style={styles.btn}
      >
        <View style={styles.imgContainer}>
          <SvgIcon icon="language" width={20} height={20} />
        </View>

        <Text allowFontScaling={false} style={styles.bodyText}>
          Choose Language
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChangePassword", {
            username: usr_name,
            password: pwd,
          })
        }
        style={styles.btn}
        activeOpacity={0.8}
      >
        <View style={styles.imgContainer}>
          <SvgIcon icon="lock" width={20} height={20} />
        </View>

        <Text allowFontScaling={false} style={styles.bodyText}>
          Change Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.checkUpdateNeeded()}
        activeOpacity={0.8}
        style={styles.btn}
      >
        <View style={styles.imgContainer}>
          <SvgIcon icon="version" width={20} height={20} />
        </View>

        <Text allowFontScaling={false} style={styles.bodyText}>
          Version
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this._handleLogout()}
        style={styles.btn}
        activeOpacity={0.8}
      >
        <View style={styles.imgContainer}>
          <SvgIcon icon="logout" width={20} height={20} />
        </View>

        <Text allowFontScaling={false} style={styles.bodyText}>
          Logout
        </Text>
      </TouchableOpacity>
      <AlertModel
        isOpen={showConfirm}
        headerIcon={require("@icons/modal_icon/question.png")}
        text="Are you sure you want to logout?"
        is_show_two={true}
        onClose={() => setConfirm(false)}
        onPressYes={() => redirctLogout()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  secondContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    margin: 5,
  },
  secondheader: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  img: {
    width: 25,
    height: 25,
  },
  text: {
    marginLeft: 10,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    color: "#1B1F21",
    fontFamily: Fonts.primary,
  },
  border: {
    borderBottomWidth: 0.5,
    elevation: 1,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#1B1F21",
  },
  footertext: {
    borderTopWidth: 0.5,
    textAlign: "center",
    borderStyle: "solid",
    marginTop: 10,
    paddingTop: 10,
    fontSize: 15,
    color: "#1B1F21",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  footerText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    color: "#1B1F21",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    marginRight: 10,
    flex: 1,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    borderBottomColor: "#D7DADB",
    borderBottomWidth: 1,
  },
  bodyImg: {
    width: 40,
    height: 50,
    marginLeft: 10,
  },
  bodyText: {
    fontSize: 16,
    marginLeft: 20,
    fontFamily: Fonts.primary,
  },
  imgContainer: {
    backgroundColor: "#C0C0C0",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 18,
    marginBottom: 5,
    marginLeft: 5,
  },
});
export default HotspotSetting;
