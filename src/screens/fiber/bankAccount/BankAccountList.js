import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { online_payment, paymentContactApi } from "@apis/FiberApis";
import Fonts from "@styles/Fonts";
import axios from "axios";
//import component
import FiberHeader from "@components/FiberHeader";
export default class OnlinePayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      randomNum: null,
      banks: [],
      loading: true,
      billingContact: "",
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = async () => {
    await this.getToken();
    await this.getRandomValue();
    await this.getBanks();
    await this.getOnlinePaymentContact();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("access_token");
      // console.log(value);
      if (value !== null) {
        this.setState({ access_token: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  getRandomValue = async () => {
    try {
      const random_number = await Math.round(Math.random() * 10);
      // console.log(random);
      if (random !== null) {
        this.setState({ randomNum: random_number });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  getBanks = async () => {
    var self = this;
    const url = online_payment + this.state.randomNum;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        if (response.status == 200) {
          self.setState({
            banks: response.data,
            loading: false,
          });
        }
      })
      .catch(function (error) {
        if (Platform.OS == "ios") {
          console.log("Online Payment Error");
        } else {
          ToastAndroid.show("Error", ToastAndroid.SHORT);
        }
      });
  };

  getOnlinePaymentContact = async () => {
    var self = this;
    axios
      .get(paymentContactApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      })
      .then(function (response) {
        // console.log(response.data)
        if (response.status == 200) {
          if (response.data.status == 1) {
            self.setState({
              billingContact: response.data.data.contact_text,
              loading: false,
            });
          }
        }
      })
      .catch(function (error) {
        if (Platform.OS == "ios") {
          console.log("Online Payment Error");
        } else {
          ToastAndroid.show("Error", ToastAndroid.SHORT);
        }
      });
  };

  copyToClipboard(accno) {
    Clipboard.setStringAsync(accno);
    if (Platform.OS == "ios") {
      alert("Account Number Copied");
    } else {
      ToastAndroid.show("Account Number Copied", ToastAndroid.SHORT);
    }
  }

  render() {
    return this.state.loading ? (
      <View style={styles.container}>
        <SafeAreaView style={{ height: 10, backgroundColor: "#337ab7" }}>
          <StatusBar />
        </SafeAreaView>
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#1179C2" />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="Online Payment"
          routeName="Dashboard"
          onPress={() => this.props.navigation.goBack(null)}
        />
        <ScrollView style={styles.secondContainer}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              marginTop: 10,
              textAlign: "justify",
              marginVertical: 5,
              fontFamily: Fonts.primary,
            }}
          >
            အင်တာနက်အသုံးပြုခ ပေးဆောင်မှုကို အောက်ဖော်ပြပါ Bank account
            များမှတဆင့်ပေးသွင်းနိုင်ပါတယ်ခင်ဗျာ..
          </Text>
          {this.state.banks.map((data, index) => {
            return (
              <View style={styles.bankContainer} key={index}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "30%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: data.logo }}
                      style={styles.bankLogo}
                    ></Image>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      justifyContent: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text allowFontScaling={false} style={{ fontSize: 18 }}>
                      {data.bankName}
                    </Text>
                    <Text allowFontScaling={false} style={{ fontSize: 15 }}>
                      {data.accountNumber}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      marginRight: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.copyToClipboard(data.accountNumber)}
                    >
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={require("@icons/copy.png")}
                      ></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              marginTop: 10,
              textAlign: "justify",
              marginVertical: 5,
              fontFamily: Fonts.primary,
            }}
          >
            {this.state.billingContact}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingView: {
    marginHorizontal: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  header: {
    height: "15%",
    backgroundColor: "#B93792",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  secondContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  previousBtn: {
    width: 25,
    height: 25,
  },
  mmlinkText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5167D2",
  },
  bankLogo: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  bankName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bankContainer: {
    alignItems: "center",
    width: "100%",
    height: 100,
    borderWidth: 0.5,
    borderColor: "#DBD7D7",
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "white",
    elevation: 2,
  },
});
