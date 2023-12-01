import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Platform,
  ToastAndroid,
} from "react-native";
//import component
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
//import component
import TopupHeader from "@components/TopupHeader";
import ErrorText from "@components/ErrorText";
//import font
import Fonts from "@styles/Fonts";
//import color
import Colors from "@styles/Colors";

const ChangePassword = ({ navigation }) => {
  const [current_password, setCurrentPwd] = useState("");
  const [new_password, setNewPwd] = useState("");
  const [confirm_password, setConfirmPwd] = useState("");
  const [ISCURPWDERROR, setIsCurPwdError] = useState(false);
  const [ISNEWPWDERROR, setIsNewPwdError] = useState(false);
  const route = new useRoute();
  _handlePressCancel = () => {
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
    navigation.navigate("HotspotSetting");
  };
  _handleCurrentPassword = (value) => {
    setCurrentPwd(value);
    setIsCurPwdError(false);
  };
  _handleNewPassword = (value) => {
    setNewPwd(value);
    setIsNewPwdError(false);
  };
  _handleSave = async () => {
    var isError = false;
    if (!current_password) {
      setIsCurPwdError(true);
      isError = true;
    }

    if (!new_password) {
      setIsNewPwdError(true);
      isError = true;
    }
    if (!isError) {
      var topupEndPoint = await AsyncStorage.getItem("endpoint");
      if (route.params.password == new_password) {
        var url =
          topupEndPoint +
          "/api/password?username=" +
          route.params.username +
          "&password=" +
          new_password +
          "&newpassword=" +
          confirm_password;
        axios
          .get(url)
          .then(async (response) => {
            // AsyncStorage.clear();
            await AsyncStorage.removeItem("tusername");
            await AsyncStorage.removeItem("tpassword");

            navigation.navigate("HotspotLogin");
          })
          .catch(function (error) {
            console.log("Here", error);
          });
      } else {
        if (Platform.OS == "ios") {
          alert("Wrong Current Password");
        } else {
          ToastAndroid.show("Wrong Current Password", ToastAndroid.SHORT);
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor={Colors.theme_color}
        headerText="Change Password"
        onPressBack={() => navigation.navigate("HotspotDashboard")}
        showSetting={false}
      />
      <View style={{ margin: 10 }}>
        <Text allowFontScaling={false} style={styles.text}>
          User Name
        </Text>
        <TextInput
          allowFontScaling={false}
          style={styles.textInput}
          value={route.params.username}
        />
        <Text allowFontScaling={false} style={styles.text}>
          Current Password
        </Text>
        <TextInput
          allowFontScaling={false}
          style={styles.textInput}
          value={current_password}
          onChangeText={(value) => _handleCurrentPassword(value)}
          secureTextEntry={true}
        />
        <ErrorText isShow={ISCURPWDERROR} errMessage="Enter Current Password" />
        <Text allowFontScaling={false} style={styles.text}>
          New Password
        </Text>
        <TextInput
          allowFontScaling={false}
          style={styles.textInput}
          value={new_password}
          onChangeText={(value) => _handleNewPassword(value)}
          secureTextEntry={true}
        />
        <ErrorText isShow={ISNEWPWDERROR} errMessage="Enter New Password" />
        <View style={styles.secondContainer}>
          <TouchableOpacity
            style={[
              styles.touchBtn,
              { backgroundColor: "#b33327", borderColor: "#b33327" },
            ]}
            activeOpacity={0.8}
            onPress={() => _handlePressCancel()}
          >
            <Text allowFontScaling={false} style={styles.touchText}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchBtn}
            activeOpacity={0.8}
            onPress={() => _handleSave()}
          >
            <Text allowFontScaling={false} style={styles.touchText}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 10,
    color: "#414040",
    fontFamily: Fonts.primary,
    fontSize: Fonts.fontSizePrimary,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "rgba(0,0,0, 1)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS,
    borderColor: "#D1CCCC",
    marginTop: 8,
    paddingHorizontal: 10,
    fontFamily: Fonts.primary,
    fontSize: Fonts.fontSizePrimary,
  },
  secondContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touchBtn: {
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.theme_color,
    backgroundColor: Colors.theme_color,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
    paddingTop: 9,
    paddingBottom: 9,
    elevation: 10,
    shadowColor: "rgba(0,0,0, 1)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS,
  },
  touchText: {
    color: "white",
    fontFamily: Fonts.primary,
    fontSize: Fonts.fontSizePrimary,
  },
});
export default ChangePassword;
