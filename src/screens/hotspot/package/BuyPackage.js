import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
//import api
import { getPackageApi, checkAccApi, hotspotPaymentApi } from "@apis/TopupApis";
import { PGW_END_POINT } from "@env";
//import style
import Styles from "@styles/Styles";
import Font from "@styles/Fonts";
import Colors from "@styles/Colors";
//import component
import BuyOption from "@components/BuyOption";
import SuccessModal from "@components/SuccessModal";
import ErrorText from "@components/ErrorText";
import AlertModel from "@components/AlertModel";
import PasswordModal from "@components/PasswordModal";
import TopupHeader from "@components/TopupHeader";

const BuyPackage = ({ navigation }) => {
  const route = new useRoute();
  var user_name = route.params.username;
  var password = route.params.password;

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [plan_name, setPlanName] = useState(null);
  const [plan_id, setPlanId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isOpenBuyOption, setBuyOption] = useState(false);
  const [isOpensucccessModal, setSuccessModal] = useState(false);
  const [phone, setPhone] = useState(user_name);
  const [isErrorPhone, setErrorPhone] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showPasswordCheck, setPasswordCheck] = useState(false);
  const [payment_type, setPaymentType] = useState("");
  const [showAYAModal, setAYAModal] = useState(false);

  useEffect(() => {
    fetchData();
    const backAction = () => {
      navigation.navigate("HotspotDashboard");
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  fetchData = async () => {
    var topupEndpoint = await AsyncStorage.getItem("endpoint");
    var url = topupEndpoint + getPackageApi;
    axios
      .get(url, {
        headers: {
          "Content-Type": "applicaction/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleClick = (index, plan_name, plan_id, amount) => {
    setSelectedButtonIndex(index);
    setPlanName(plan_name);
    setPlanId(plan_id);
    setAmount(amount);
  };

  change_phone = (value) => {
    setPhone(value);
    setErrorPhone(false);
  };

  handle_buy_package = () => {
    let isError = false;
    if (!phone) {
      setErrorPhone(true);
      isError = true;
    } else if (selectedButtonIndex == null) {
      alert("Please Select Package");
    } else {
      //check user exit
      check_user_exist();
    }
  };

  check_user_exist = async () => {
    let param = {
      phone: phone,
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
        if (response.data.status == 1) {
          setBuyOption(true);
        } else {
          setAlertText(response.data.message);
          setShowAlert(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Buy Package", error);
      });
  };

  openBuyKBZ = () => {
    setPaymentType("kbz");
    setBuyOption(false);
    setShowOTP(true);
  };
  openBuyAYA = () => {
    setPaymentType("aya");
    setBuyOption(false);
    setShowOTP(true);
  };
  openBuyCB = () => {
    setPaymentType("cb");
    setBuyOption(false);
    setShowOTP(true);
  };

  _checkPassword = (type_password) => {
    if (password != type_password) {
      setShowOTP(false);
      setPasswordCheck(true);
    } else {
      setShowOTP(false);
      if (payment_type == "kbz") {
        makePayment("kbzpay", null);
      } else if (payment_type == "aya") {
        setAYAModal(true);
      } else {
        makePayment("cbpay", null);
      }
    }
  };

  callAYAApi = (phone) => {
    setAYAModal(false);
    makePayment("ayapay", phone);
  };

  makePayment = (payment_type, aya_phone) => {
    var url = PGW_END_POINT + hotspotPaymentApi;
    let param = {
      phone: phone,
      plan_id: plan_id,
      amount: amount,
      payment_type: payment_type,
      aya_phone: aya_phone,
    };
    setLoading(true);
    axios
      .post(url, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoading(false);
        if (payment_type == "kbzpay") {
          Linking.openURL(response.data.referer_url);
        } else {
          Linking.openURL(response.data.deeplink);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor="#337ab7"
        headerText="Package List"
        onPressBack={() => navigation.navigate("HotspotDashboard")}
        showSetting={false}
      />
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ paddingHorizontal: 5, marginTop: 10 }}>
            <TextInput
              label="Topup Phone Number"
              placeholder="09XXXXXXXXX"
              left={
                <TextInput.Icon
                  icon="cellphone-text"
                  color={Colors.theme_color}
                />
              }
              value={phone}
              onChangeText={(value) => change_phone(value)}
              style={{
                width: "100%",
                backgroundColor: "white",
                color: "black",
                borderRadius: 5,
              }}
              selectionColor={Colors.theme_color}
              outlineColor={Colors.theme_color}
              activeOutlineColor={Colors.theme_color}
              activeUnderlineColor={Colors.theme_color}
              underlineColor={Colors.theme_color}
              borderBottomColor={Colors.theme_color}
              textColor="black"
              keyboardType="phone-pad"
              // autoFocus={true}
            />
            <ErrorText
              isShow={isErrorPhone}
              errMessage="Please enter topup phone number"
            />
          </View>
          {data.map((data, index) => {
            return (
              <TouchableOpacity
                style={[
                  Styles.box_shadow,
                  {
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderWidth: selectedButtonIndex == index ? 2 : 0,
                    borderColor:
                      selectedButtonIndex == index ? Colors.theme_color : null,
                    backgroundColor: "white",
                  },
                ]}
                onPress={() =>
                  handleClick(index, data.name, data.id, data.amount)
                }
                key={index}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 5,
                    height: 70,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Font.primary,
                      fontSize: 20,
                      color: Colors.theme_color,
                      width: 60,
                    }}
                  >
                    {data.name}
                  </Text>
                  <View
                    style={{
                      width: 1,
                      borderWidth: 0.5,
                      borderColor: "#b5b4b3",
                      height: "100%",
                      marginLeft: 20,
                    }}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontFamily: Font.primary, fontSize: 18 }}>
                      {data.amount} Ks
                    </Text>
                    <Text
                      style={{ fontFamily: Font.primary, color: "#eb8934" }}
                    >
                      {data.lifetime} Days
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#337ab7" }]}
              onPress={() => (!isLoading ? handle_buy_package() : null)}
            >
              <AntDesign name="shoppingcart" color="white" size={20} />
              <Text
                style={{
                  color: "white",
                  fontFamily: Font.primary,
                  marginLeft: 10,
                  fontSize: 18,
                }}
              >
                {isLoading ? "Loading..." : "Buy Now"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BuyOption
        isOpen={isOpenBuyOption}
        onClose={() => setBuyOption(false)}
        onPresKBZ={() => openBuyKBZ()}
        onPresAYA={() => openBuyAYA()}
        onPresCB={() => openBuyCB()}
      />
      <SuccessModal
        isOpen={isOpensucccessModal}
        text="Success"
        onClose={() => handleClose()}
      />
      <AlertModel
        isOpen={showAlert}
        btn_text="Ok"
        is_show_two={false}
        text={alertText}
        headerIcon={require("@icons/modal_icon/no-results.png")}
        onPressYes={() => setShowAlert(false)}
      />
      <AlertModel
        isOpen={showPasswordCheck}
        btn_text="Ok"
        is_show_two={false}
        text="OTP is incorrect"
        headerIcon={require("@icons/modal_icon/wrong-password.png")}
        onPressYes={() => setPasswordCheck(false)}
      />
      <PasswordModal
        isOpen={showOTP}
        showPlaceholder={true}
        header_text="Enter your password"
        btn_text="Confirm"
        err_msg="Password required!"
        onSubmit={(password) => _checkPassword(password)}
        onClose={() => setShowOTP(false)}
      />
      <PasswordModal
        isOpen={showAYAModal}
        showPlaceholder={false}
        header_text="Enter your AYA Mobile Number"
        btn_text="Confirm"
        err_msg="Password required!"
        onSubmit={(phone) => callAYAApi(phone)}
        onClose={() => setAYAModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
});
export default BuyPackage;
