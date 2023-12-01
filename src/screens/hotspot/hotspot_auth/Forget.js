import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  BackHandler,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import font
import Fonts from "@styles/Fonts";
import SvgIcon from "@images/SvgIcon";
//import component
import TopupHeader from "@components/TopupHeader";
//import service
import { SendOTP } from "@services/SendOTP";
//import component
import ErrorText from "@components/ErrorText";
//import api url
import { checkAccApi } from "@apis/TopupApis";

const Forget = ({ navigation }) => {
  const [phone_no, setPhone] = useState(null);
  const [ISERRORPHONE, setIsErrorPhone] = useState(false);
  const [isLoading, setLoading] = useState(false);
  handleGetOTP = async () => {
    var isError = false;
    if (!phone_no) {
      setIsErrorPhone(true);
      isError = true;
    }
    if (!isError) {
      let param = {
        phone: phone_no,
      };
      var topupEndPoint = await AsyncStorage.getItem("endpoint");
      var url = topupEndPoint + checkAccApi;

      axios
        .post(url, param, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (response) => {
          if (response.data.status == 0) {
            alert(response.data.message);
          } else {
            setLoading(true);
            var otp = await SendOTP(phone_no);
            setLoading(false);
            navigation.navigate("HotspotOTP", {
              from_route: "forget",
              otp_code: otp.sixDigitNumber,
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
    setIsErrorPhone(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 2 : 0}
        style={styles.mainCon}
      >
        <TouchableOpacity
          onPress={() => this._handelGoback()}
          style={{ paddingHorizontal: 5, height: 30, marginTop: 10 }}
        >
          <Entypo name="chevron-left" size={30} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ position: "relative", bottom: 30, marginTop: "10%" }}>
            <View style={styles.loginIcon}>
              <SvgIcon icon={"forgot"} width={200} height={200} />
            </View>
            <View style={[styles.container]}>
              <View style={styles.loginLblCon}>
                <Text style={styles.loginLbl}>Forgot Password?</Text>
              </View>
              <View style={styles.forgotDes}>
                <Text style={styles.forgotDesLbl}>
                  Please enter your Phone Number
                </Text>
              </View>
              <View style={styles.formCon}>
                <View style={styles.textBoxCon}>
                  <View style={styles.at}>
                    <SvgIcon icon={"phone"} width={20} height={20} />
                  </View>
                  <View style={styles.textCon}>
                    <TextInput
                      style={styles.textInput}
                      placeholder={"09XXXXXXXXX"}
                      placeholderTextColor={"#aaa"}
                      onChangeText={(value) => handlePhone(value)}
                      keyboardType="phone-pad"
                    />
                    <ErrorText
                      isShow={ISERRORPHONE}
                      errMessage="Please Enter Phone Number"
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.LoginBtn, { marginTop: 40 }]}
                onPress={() => (isLoading ? null : this.handleGetOTP())}
              >
                <Text style={styles.loginBtnLbl}>
                  {isLoading ? "Loading..." : "Get OTP"}
                </Text>
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
    fontFamily: Fonts.primary,
  },
  loginLbl: {
    color: "#000",
    fontSize: 20,
    fontFamily: Fonts.primary,
  },
  at: {
    alignSelf: "center",
    width: "10%",
  },

  textBoxCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textCon: {
    width: "90%",
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

  forgotDes: {
    position: "relative",
    bottom: 10,
  },
  forgotDesLbl: {
    color: "#000",
    fontFamily: Fonts.primary,
  },
});
export default Forget;
