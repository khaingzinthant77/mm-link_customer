import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
//import library
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
//import icon
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import SvgIcon from "@images/SvgIcon";
//import font
import Fonts from "@styles/Fonts";
//import api
import { isLocalApi, checkApi, store_token_api } from "@apis/TopupApis";
//import component
import ErrorText from "@components/ErrorText";

const SignIn = ({ navigation }) => {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isOnline, setOnline] = useState(false);
  const [locale, setLocale] = useState(null);
  const [is_show_hide, setShowHide] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [islocal, setLocal] = useState(false);
  const [isPhoneError, setPhoneError] = useState(false);
  const [isPwdError, setPwdError] = useState(false);

  useEffect(() => {
    get_setting();
    checkisLocal();
    NetInfo.addEventListener((state) => {
      setOnline(state.isConnected);
    });
  }, []);

  get_setting = () => {
    axios
      .get("https://news.mm-link.net/api/setting_url")
      .then((response) => {
        if (response.data.data.url !== null) {
          var myendpoint = response.data.data.url;
          var is_show_hide = response.data.data.is_show_register;
          var web_app = response.data.data.is_show_forgot;
          AsyncStorage.setItem("endpoint", myendpoint)
            .then(() => {
              setShowHide(is_show_hide.toString());
            })
            .catch((error) => {
              console.log("Error setting endpoint in AsyncStorage:", error);
              reject(error);
            });
        } else {
          resolve(null);
        }
      })
      .catch((err) => reject(err));
  };

  checkisLocal = async () => {
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    const localurl = topupEndPoint
      ? topupEndPoint + isLocalApi
      : "https://hsp-portal.mm-link.net/" + isLocalApi;
    console.log(localurl);
    axios
      .get(localurl)
      .then(function (response) {
        console.log("Check Local", response.data);
      })
      .catch(function (error) {
        console.log(error);
        // alert('Please connect to mm-link WiFi!');
        if (Platform.OS == "ios") {
          alert("Please connect to mm-link WiFi!");
        } else {
          ToastAndroid.show(
            "Please connect to mm-link WiFi!",
            ToastAndroid.SHORT
          );
        }
      });
  };

  storeExpoToken = async () => {
    let param = {
      name: user_name,
      phone: user_name,
      expo_token: await getToken(),
    };
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var url = topupEndPoint + store_token_api;

    axios
      .post(url, param, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  getToken = async () => {
    let token;
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync({
        allowSystemDialog: true,
      });
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })
    ).data;

    return token;
  };
  togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  handleUserName = (value) => {
    setUserName(value);
    setPhoneError(false);
  };

  handlePassword = (value) => {
    setPassword(value);
    setPwdError(false);
  };

  handelLogin = async () => {
    var isError = false;
    if (!user_name) {
      setPhoneError(true);
      isError = true;
    }

    if (!password) {
      setPwdError(true);
      isError = true;
    }

    if (!isError) {
      if (isOnline) {
        var topupEndPoint = await AsyncStorage.getItem("endpoint");
        var checkApiurl = topupEndPoint + checkApi;
        var url =
          checkApiurl + "?username=" + user_name + "&password=" + password;
        setLoading(true);
        axios
          .get(url)
          .then((response) => {
            setLoading(false);
            if (response.data.status == 1) {
              AsyncStorage.multiSet(
                [
                  ["tusername", user_name],
                  ["tpassword", password],
                ],
                (err) => {
                  if (err) {
                    // alert("Asynstorage Error");
                    console.log("asyncstorage error");
                  } else {
                    navigation.navigate("HotspotDashboard");
                  }
                }
              );
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.log("Hotspot Login API Error", error);
          });
      } else {
        if (Platform.OS == "ios") {
          alert("Please check your internet connection!");
        } else {
          ToastAndroid.show(
            "Please check your internet connection!",
            ToastAndroid.SHORT
          );
        }
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 2 : 0}
          enabled
          style={styles.mainCon}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={{ marginTop: 10 }}>
              <Entypo name="chevron-left" size={30} />
            </TouchableOpacity>
            <View style={styles.loginIcon}>
              <Image
                source={require("../../../../assets/splash.png")}
                style={styles.logo_style}
              />
            </View>
            <View style={styles.container}>
              <View style={styles.loginLblCon}>
                <Text style={styles.loginLbl}>Login</Text>
              </View>
              <View style={styles.formCon}>
                <View style={styles.textBoxCon}>
                  <View style={styles.at}>
                    <SvgIcon icon={"phone"} width={20} height={20} />
                  </View>
                  <View style={styles.textCon}>
                    <TextInput
                      style={styles.textInput}
                      placeholder={"Phone"}
                      placeholderTextColor={"#aaa"}
                      value={user_name}
                      onChangeText={(value) => handleUserName(value)}
                      keyboardType="phone-pad"
                    />
                    <ErrorText
                      isShow={isPhoneError}
                      errMessage="Enter Phone Number!"
                    />
                  </View>
                </View>
                <View style={[styles.textBoxCon, { marginTop: 30 }]}>
                  <View style={styles.at}>
                    <SvgIcon icon={"lock"} width={20} height={20} />
                  </View>
                  <View style={[styles.passCon]}>
                    <View style={styles.textCon}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={"Password"}
                        placeholderTextColor={"#aaa"}
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={(value) => handlePassword(value)}
                        keyboardType="number-pad"
                      />
                      <ErrorText
                        isShow={isPwdError}
                        errMessage="Enter Password!"
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.show}
                      onPress={() => togglePasswordVisibility()}
                    >
                      {isPasswordVisible ? (
                        <SvgIcon icon={"show"} width={20} height={20} />
                      ) : (
                        <Ionicons name="eye-off-outline" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.forgotAction}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("HotspotForgotPassword")}
                  >
                    <Text style={styles.forgotLbl}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.loginCon}>
                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => (isLoading ? null : handelLogin())}
                  >
                    <Text style={styles.loginBtnLbl}>
                      {isLoading ? "Loading..." : "Login"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.deviderCon}>
                    <View style={styles.devider} />
                    <Text style={styles.or}>OR</Text>
                  </View>
                  <View style={styles.registerCon}>
                    <Text style={styles.registerNew}>New User? </Text>
                    <Pressable
                      onPress={() => navigation.navigate("HotspotRegister")}
                    >
                      <Text style={styles.registerLbl}>Register</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    marginBottom: 10,
  },
  logo_style: {
    width: 280,
    height: 80,
    resizeMode: "contain",
    marginBottom: 50,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  loginCon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  loginLblCon: {
    position: "relative",
    bottom: 20,
    justifyContent: "center",
    fontFamily: Fonts.primary,
  },
  loginLbl: {
    color: "#000",
    fontSize: 25,
    fontFamily: Fonts.primary,
  },
  formCon: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  textBoxCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  at: {
    alignSelf: "center",
    width: "10%",
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
  passCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  show: {
    alignSelf: "center",
    width: "10%",
    position: "relative",
    right: 20,
    zIndex: 10,
  },
  forgotAction: {
    paddingVertical: 20,
  },
  forgotLbl: {
    color: "#337ab7",
    textAlign: "right",
    fontFamily: Fonts.primary,
  },
  loginBtn: {
    backgroundColor: "#337ab7",
    borderRadius: 20,
    width: "50%",
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
  deviderCon: {
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
});
export default SignIn;
