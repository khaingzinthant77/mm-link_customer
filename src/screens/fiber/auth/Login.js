import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import Fonts from "@styles/Fonts";
import { Button } from "react-native-paper";
//import api
import axios from "axios";
//import url
import { otpLoginApi } from "@apis/FiberApis";
import NetInfo from "@react-native-community/netinfo";
//import style
import Styles from "@styles/Styles";

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isConnected, setisConnected] = useState(false);

  componentDidMount = async () => {
    NetInfo.addEventListener((state) => {
      setisConnected(state.isConnected);
    });

    const res = await getLang();
    this.setState({ locale: res });

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  };

  componentWillUnmount = () => {
    this.backHandler.remove();
  };

  handleBackPress = () => {
    navigation.navigate("HomeScreen");
    return true; // Prevent default behavior (exit the app)
  };

  handelLogin = () => {
    var param = {
      userId: phone,
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
          navigation.navigate("OTP", { phone });
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
              onPress={() => navigation.navigate("Home")}
              style={[styles.back_btn, Styles.box_shadow]}
            >
              <Image
                source={require("@icons/fiber/auth/back.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <View style={{ width: "100%" }}>
              <Text style={styles.header_text}>Wifi/Fiber User</Text>
            </View>
          </View>

          <View style={styles.header_logo}>
            <Image
              source={require("@images/auth/visual.png")}
              style={{ width: 300, height: 150, resizeMode: "contain" }}
            />
          </View>
          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.text_style}>
                Please enter your mobile number
              </Text>
            </View>

            <View style={styles.phone_container}>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}></Text>
              <View style={{ width: "70%" }}>
                <TextInput
                  value={phone}
                  style={{ fontSize: 25, fontWeight: "bold" }}
                  placeholder="09 xxx xxx xxx"
                  onChangeText={(value) => setPhone(value)}
                  keyboardType="phone-pad"
                  autoFocus={true}
                />
              </View>
            </View>
            <Button
              mode="contained"
              onPress={() => (isLoading ? null : handelLogin())}
              style={styles.login_btn}
              textColor="white"
              textSize={20}
            >
              <Text style={{ fontSize: 20 }}>
                {isLoading ? "Loading..." : "Next"}
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 30,
  },
  header_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  back_btn: {
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
  header_logo: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text_style: {
    fontSize: 16,
    fontFamily: Fonts.primary,
    color: "#a3a3a3",
  },
  phone_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  login_btn: {
    backgroundColor: "#377eb9",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#c6dcee",
    shadowOffset: { width: 4, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
});

export default Login;
