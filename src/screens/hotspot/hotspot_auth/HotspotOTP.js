import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
//import font
import Fonts from "@styles/Fonts";
//import color
import Colors from "@styles/Colors";

const HotspotOTP = ({ navigation }) => {
  const [code, setCode] = useState(null);
  const [otp_code, setOTPCode] = useState(null);
  const route = new useRoute();

  resendOTP = async () => {
    var otp = await SendOTP(route.params.phone);
    setOTPCode(otp.sixDigitNumber);
  };
  register = async () => {
    if (code != otp_code) {
      alert("OTP is incorrect!");
    } else {
      if (!code) {
        alert("Please enter correct OTP");
      } else {
        if (route.params.from_route == "forget") {
          navigation.navigate("ResetPassword", {
            name: route.params.from_route,
            phone: route.params.phone,
          });
        } else {
          navigation.navigate("ResetPassword", {
            name: route.params.from_route,
            usr_name: route.params.user_name,
            phone: route.params.phone,
          });
        }
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 2 : 0}
        style={styles.mainCon}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Entypo name="chevron-left" size={30} />
          </TouchableOpacity>
          <View style={{ position: "relative", bottom: 30, marginTop: "5%" }}>
            <View style={styles.loginIcon}>
              <SvgIcon icon={"enterOtp"} width={180} height={180} />
            </View>
            <View style={styles.container}>
              <View style={styles.forgotDes}>
                <Text style={styles.forgotDesLbl}>
                  An 6 digit code has been sent to
                </Text>
                <Text style={styles.forgotDesLbl}>{route.params.phone}</Text>
              </View>
              <View style={styles.formCon}>
                <TextInput
                  mode="outlined"
                  label="Enter OTP"
                  value={this.state.username}
                  onChangeText={(value) => setCode(value)}
                  style={{
                    width: "95%",
                    backgroundColor: "white",
                    color: "black",
                    marginBottom: 10,
                    marginHorizontal: 10,
                  }}
                  outlineColor={Colors.theme_color}
                  activeOutlineColor={Colors.theme_color}
                  textColor="black"
                  theme={{ roundness: 30 }}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.resendAction}>
                <TouchableOpacity onPress={() => this.resendOTP()}>
                  <Text style={styles.resentLbl}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.loginCon}
                onPress={() => this.register()}
              >
                <Text style={styles.loginBtnLbl}>Submit</Text>
              </TouchableOpacity>
              <View style={styles.deviderCon}>
                <View style={styles.devider} />
                <Text style={styles.or}>OR</Text>
              </View>
              <View style={styles.registerCon}>
                <Text style={styles.registerNew}>
                  {" "}
                  Already have an account? ?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("HotspotSignIn")}
                >
                  <Text style={styles.registerLbl}>Login</Text>
                </TouchableOpacity>
              </View>
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
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: "relative",
    bottom: 35,
  },
  loginLbl: {
    color: "#000",
    fontSize: 25,
    fontFamily: Fonts.primary,
  },
  forgotDes: {
    position: "relative",
    bottom: 10,
  },
  forgotDesLbl: {
    color: "#000",
    fontFamily: Fonts.primary,
  },
  registerLbl: { color: "#0057ff", fontFamily: Fonts.primary },
  loginCon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 30,
    backgroundColor: Colors.theme_color,
    borderRadius: 30,
    marginBottom: 10,
    marginTop: 10,
    color: "#fff",
  },
  loginLblCon: {
    position: "relative",
    bottom: 20,
    justifyContent: "center",
  },
  loginLbl: {
    color: "#000",
    fontSize: 25,
    fontFamily: Fonts.primary,
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
  registerCon: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
  registerLbl: { color: Colors.theme_color, fontFamily: Fonts.primary },
  registerNew: {
    color: "#aaa",
    fontFamily: Fonts.primary,
  },
  resendAction: {
    paddingVertical: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  resentLbl: {
    color: Colors.theme_color,
    textDecorationLine: "underline",
  },
  loginBtnLbl: {
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
});
export default HotspotOTP;
