import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fonts from "@styles/Fonts";
import Colors from "@styles/Colors";
import { Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
//import url
import { loginApi, otpLoginApi } from "@apis/FiberApis";

const OTP = ({ navigation }) => {
  const route = useRoute();
  const [pwd, setPwd] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);

  handelLogin = () => {
    let param = {
      userId: route.params.phone,
      pwd: pwd,
    };
    setNextLoading(true);
    axios
      .post(loginApi, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setNextLoading(false);
        console.log(response.data.result.cusId);
        AsyncStorage.multiSet(
          [
            ["access_token", response.data.result.access_token],
            ["token_type", response.data.result.token_type],
            ["user_id", response.data.result.user_id],
            ["user_name", response.data.result.user_name],
            ["user_level", response.data.result.user_level],
            ["cusId", response.data.result.cusId],
            ["cust_name", route.params.phone],
            ["password", pwd],
            ["township_name", response.data.result.township.tS_Name],
          ],
          (err) => {
            if (err) {
              alert("Asynstorage Error");
            } else {
              navigation.navigate("FiberDashboard");
            }
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _handleResend = () => {
    var param = {
      userId: route.params.phone,
    };
    setLoading(true);
    // console.log(otpLoginApi,param);
    axios
      .post(otpLoginApi, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setLoading(false);
        if (response.data.responseCode == 1) {
          if (Platform.OS == "android") {
            ToastAndroid.show(
              "OTP have been successfully send",
              ToastAndroid.SHORT
            );
          } else {
            alert("OTP have been successfully send");
          }
        } else {
          setLoading(false);
          alert(response.data.responseMessage);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : ""}
      keyboardVerticalOffset={Platform.OS === "ios" ? 2 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <View style={styles.header_container}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Dashboard", { type: "fiber" })
              }
              style={styles.header_logo}
            >
              <Image
                source={require("@icons/fiber/auth/back.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            {/* <Text style={{ marginLeft: 10 }}>Back</Text> */}
            <View style={{ width: "100%" }}>
              <Text style={styles.header_text}>Wifi/Fiber User</Text>
            </View>
          </View>

          <View style={styles.header_logo_container}>
            <Image
              source={require("@images/auth/visual.png")}
              style={{ width: 300, height: 150, resizeMode: "contain" }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.header_style}>
                Enter 6 digit numbers send to {route.params.phone}
              </Text>
            </View>

            <View style={{ width: "100%", marginTop: 30 }}>
              <Text style={styles.label}>OTP</Text>
              <TextInput
                style={styles.input_style}
                value={pwd}
                onChangeText={(value) => setPwd(value)}
                keyboardType="number-pad"
                placeholder="xxxxxx"
                autoFocus={true}
              />
            </View>

            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <Text style={{ fontFamily: Fonts.primary }}>
                If you have any OTP Code!{" "}
              </Text>
              <TouchableOpacity
                onPress={() => (!isLoading ? _handleResend() : null)}
              >
                <Text
                  style={{
                    color: Colors.theme_color,
                    fontFamily: Fonts.primaryBold,
                    fontSize: 16,
                    textDecorationLine: "underline",
                  }}
                >
                  {isLoading ? "Loading..." : "Resend"}
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              mode="contained"
              onPress={() => (!nextLoading ? handelLogin() : null)}
              style={styles.btn_style}
              textColor="white"
              textSize={20}
            >
              <Text style={{ fontSize: 20 }}>
                {nextLoading ? "Loading..." : "Next"}
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => Linking.openURL("http://mm-link.net/privacy-policy/")}
        >
          <Text>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("http://mm-link.net/terms-of-use/")}
        >
          <Text>Terms</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4faff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  header_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  header_logo: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "white",
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    borderRadius: 15,
    flexDirection: "row",
  },
  header_text: {
    textAlign: "center",
    marginRight: "20%",
    // fontFamily: Fonts.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  header_logo_container: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  header_style: {
    fontSize: 16,
    fontFamily: Fonts.primary,
    color: "#a3a3a3",
  },
  label: {
    fontFamily: Fonts.primary,
    fontSize: 17,
    color: "#a3a3a3",
  },
  input_style: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: 45,
    borderRadius: 10,
    shadowColor: "#c6dcee",
    shadowOffset: { width: 6, height: 14 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    paddingHorizontal: 10,
  },
  btn_style: {
    backgroundColor: "#377eb9",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#c6dcee",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
});
export default OTP;
