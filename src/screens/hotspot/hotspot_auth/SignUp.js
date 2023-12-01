import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Linking,
  BackHandler,
  ScrollView,
  SafeAreaView,
} from "react-native";
//import library
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import font
import Fonts from "@styles/Fonts";
//import component
import SvgIcon from "@images/SvgIcon";
import ErrorText from "@components/ErrorText";
//import service
import { SendOTP } from "@services/SendOTP";
//import vector icon
import Entypo from "react-native-vector-icons/Entypo";
//import api url
import { checkAccApi } from "@apis/TopupApis";
const SignUp = ({ navigation }) => {
  const [user_name, setUserName] = useState("");
  const [phone_no, setPhone] = useState("");
  const [ISERRORUSERNAME, setErrorUsrname] = useState(false);
  const [ISERRORPHONE, setErrorPhone] = useState(false);
  const [isLoading, setLoading] = useState(false);

  checkAccount = async () => {
    var self = this;

    let isError = false;
    if (!user_name) {
      setErrorUsrname(false);
      isError = true;
    }
    if (!phone_no) {
      setErrorPhone(true);
      isError = true;
      // return false;
    }

    if (!isError) {
      var topupEndPoint = await AsyncStorage.getItem("endpoint");

      var url = topupEndPoint + checkAccApi;
      var param = {
        name: user_name,
        phone: phone_no,
      };

      axios
        .post(url, param, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (response) => {
          if (response.data.status == 1) {
            Alert.alert("Success", response.data.message, [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => self.props.navigation.navigate("SignIn"),
              },
            ]);
          } else {
            self.setState({ isLoading: true });
            var otp = await SendOTP(phone_no);
            self.setState({ isLoading: false });
            self.props.navigation.navigate("HotspotOTP", {
              phone: phone_no,
              otp_code: otp.sixDigitNumber,
              from_route: "register",
              user_name: user_name,
              phone: phone_no,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  handlePhone = (value) => {
    setPhone(value);
    setErrorPhone(false);
  };
  handleUsrName = (value) => {
    setUserName(value);
    setErrorUsrname(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 2 : 0}
        style={styles.mainCon}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={{ marginTop: 10 }}
          >
            <Entypo name="chevron-left" size={30} />
          </TouchableOpacity>

          <View
            style={[styles.loginIcon, { marginTop: "5%", marginBottom: "10%" }]}
          >
            <SvgIcon icon={"signup"} width={150} height={150} />
          </View>
          <View style={styles.container}>
            <View style={[styles.loginLblCon, { marginTop: 30 }]}>
              <Text style={styles.loginLbl}>Sign up</Text>
            </View>
            <View style={styles.formCon}>
              <View style={[styles.textBoxCon, { marginTop: 1 }]}>
                <View style={styles.at}>
                  <SvgIcon icon={"user"} width={20} height={20} />
                </View>
                <View style={styles.textCon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={"Name"}
                    placeholderTextColor={"#aaa"}
                    value={user_name}
                    onChangeText={(name) => handleUsrName(name)}
                  />
                  <ErrorText
                    errMessage="Please enter your name*"
                    isShow={ISERRORUSERNAME}
                  />
                </View>
              </View>
              <View style={[styles.textBoxCon, { marginTop: 20 }]}>
                <View style={styles.at}>
                  <SvgIcon icon={"phone"} width={20} height={20} />
                </View>
                <View style={styles.textCon}>
                  <TextInput
                    value={phone_no}
                    style={styles.textInput}
                    placeholder={"Mobile"}
                    placeholderTextColor={"#aaa"}
                    onChangeText={(phone) => handlePhone(phone)}
                    keyboardType="phone-pad"
                  />
                  <ErrorText
                    errMessage="Please enter your phone number*"
                    isShow={ISERRORPHONE}
                  />
                </View>
              </View>
            </View>

            <View style={styles.loginCon}>
              <TouchableOpacity
                style={styles.LoginBtn}
                onPress={() => (!isLoading ? this.checkAccount() : null)}
              >
                <Text style={styles.loginBtnLbl}>
                  {isLoading ? "Loading.." : "Register"}{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.deviderCon}>
              <View style={styles.devider} />
              <Text style={styles.or}>OR</Text>
            </View>

            <View style={styles.registerCon}>
              <Text style={styles.registerNew}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={styles.registerLbl}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: "#fff",
    flex: 1,
  },
  loginIcon: {
    alignSelf: "center",
  },
  formCon: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  container: {
    paddingHorizontal: 20,
  },
  loginLblCon: {
    position: "relative",
    bottom: 20,
  },
  loginLbl: {
    color: "#000",
    fontSize: 25,
    fontFamily: Fonts.primary,
  },
  at: {
    alignSelf: "center",
    width: "10%",
  },
  show: {
    alignSelf: "center",
    width: "10%",
    position: "relative",
    right: 20,
    zIndex: 10,
  },
  textBoxCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textCon: {
    width: "90%",
  },
  passCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    borderBottomColor: "#aaa",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: "#000",
    fontSize: 16,
    fontFamily: Fonts.primary,
    height: 40,
  },
  forgotAction: {
    paddingVertical: 20,
  },
  registerCon: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
  registerLbl: { color: "#337ab7", fontFamily: Fonts.primary },
  registerNew: {
    color: "#aaa",
    fontFamily: Fonts.primary,
  },
  forgotLbl: {
    color: "#337ab7",
    // textAlign: 'right',
    fontFamily: Fonts.primary,
  },
  loginCon: {
    padding: 10,
  },
  LoginBtn: {
    backgroundColor: "#337ab7",
    borderRadius: 20,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtnLbl: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: Fonts.primary,
    color: "#fff",
    paddingVertical: 10,
  },
  devider: {
    borderBottomColor: "#aaa",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
  },
  or: {
    color: "#aaa",
    textAlign: "center",
    backgroundColor: "#fff",
    width: 60,
    alignSelf: "center",
    fontFamily: Fonts.primary,
    position: "relative",
    bottom: 13,
  },
  deviderCon: {
    paddingVertical: 10,
  },
  googleIconCon: {
    flexDirection: "row",
    backgroundColor: "#eee",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  googleLbl: {
    color: "#000",
    textAlign: "center",
    paddingHorizontal: 30,
    fontFamily: Fonts.primary,
  },
  termsCon: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    paddingVertical: 20,
  },
  termsBy: {
    fontSize: 12,
    color: "#aaa",
    fontFamily: Fonts.primary,
  },
  termLbl: {
    color: "#337ab7",
    fontFamily: Fonts.primary,
    fontSize: 12,
  },
});

export default SignUp;
