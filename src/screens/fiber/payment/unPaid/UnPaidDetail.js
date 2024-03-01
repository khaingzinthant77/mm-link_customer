import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  Linking,
  BackHandler,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import compnonent
import PurchasedDetailCard from "@components/PurchasedDetailCard";
import FiberHeader from "@components/FiberHeader";
import PaymentModal from "@components/PaymentModal";
import AYAModal from "@components/AYAModal";
//import date Format
import Moment from "moment";
//import service
import { commaString } from "@services/CommaString";
import { payShowHideApi, exp_intervalApi } from "@apis/PaymentApi";
import { purchasedetailApi } from "@apis/FiberApis";
import GetUUID from "@services/GetUUID";
import axios from "axios";
import { APP_ID, SECURITY_KEY } from "@env";
import * as Notifications from "expo-notifications";
import Fonts from "@styles/Fonts";
import { PGW_END_POINT } from "@env";
import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";

class UnPaidDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAlertModel: false,
      siteCode: "",
      data: [],
      servicePlan: "",
      actualBandWidth: "",
      paymentData: [],
      inv_date: "",
      inv_timestamp: 0,
      current_timestamp: Date.now(),
      serviceCharge: 0,
      discount: 0,
      tax: 0,
      subTotal: 0,
      total: 0,
      payment: 0,
      balance: 0,
      total: 0,
      refreshing: true,
      imagePath: null,
      base64Image: "",
      isPanding: false,
      img: "",
      locale: "",
      siteId: null,
      site_cby: null,
      site_uby: null,
      site_cat: "",
      site_uat: "",
      is_pay: false,
      inv_no: "",
      inv_date: null,
      show_kbz: 0,
      show_cb: 0,
      show_aya: 0,
      isOpenAYAModel: false,
      show_status: 0,
      show_loading: false,
      remark: "",
      expoPushToken: null,
      lower_date: null,
      response_invDate: null,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = async () => {
    initializeLocalization();
    var expo_token = await AsyncStorage.getItem("token");
    this.setState({ expoPushToken: expo_token });

    await this.getSiteCode();
    await this.payShowHideStatus();
    await this.getOverdueStatus();
    // var overdue_status = await AsyncStorage.getItem("overdue_status");
    // alert(overdue_status);
    // this.setState({ show_status: overdue_status });

    const dateArray = this.props.route.params.date_arr;

    // Parse the date strings into Date objects
    const dateObjects = dateArray.map((dateStr) => new Date(dateStr));

    // Find the lowest date using Array.reduce function
    const lowestDate = dateObjects.reduce((minDate, currentDate) => {
      return currentDate < minDate ? currentDate : minDate;
    }, dateObjects[0]);

    // You can now format the lowestDate back into a string if needed
    const formattedLowestDate = lowestDate.toISOString();

    this.setState({
      lower_date: Moment(formattedLowestDate).format("Y-MM-DD"),
    });

    Notifications.addNotificationResponseReceivedListener(
      this.handleNotificationResponse
    );
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

  getOverdueStatus = async () => {
    var self = this;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // console.log(currentTimestamp);
    let param = {
      timeStamp: currentTimestamp,
      security_key: SECURITY_KEY,
    };

    axios
      .post(exp_intervalApi, param, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + (await AsyncStorage.getItem("access_token")),
        },
      })
      .then(function (response) {
        self.setState({ show_status: response.data.data.payment_overdue });
      })
      .catch(function (error) {
        console.log("Expire Date Interval Error", error);
      });
  };

  handleNotificationResponse = (response) => {
    this.props.navigation.navigate("PaySuccess");
  };

  // registerForPushNotificationsAsync = async () => {
  //   let token;

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   const { status: existingStatus } =
  //     await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== "granted") {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== "granted") {
  //     alert("Failed to get push token for push notification!");
  //     return;
  //   }
  //   token = await Notifications.getExpoPushTokenAsync({
  //     projectId: Constants.expoConfig.extra.eas.projectId,
  //   });

  //   return token.data;
  // };

  _handleOpen() {
    if (this.state.response_invDate != this.state.lower_date) {
      alert("Please pay previous invoice");
    } else {
      this.setState({ isOpenAlertModel: true });
    }
  }
  getSiteCode = async () => {
    var self = this;
    var serviceInvId = await this.props.route.params.serviceInvId;
    var access_token = await AsyncStorage.getItem("access_token");
    var exp_day_interval = await AsyncStorage.getItem("interval");
    // console.log("Here",exp_day_interval);
    try {
      await AsyncStorage.setItem("srv_id", serviceInvId);
    } catch (error) {
      console.log("Service Invoice Id Store Unpaid Detail Error");
    }
    const url = purchasedetailApi + serviceInvId + "/" + GetUUID.uuid();
    // console.log(url);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        var month_year = Moment(response.data.invDate).format("MMMY");
        // console.log(month_year);
        var remark =
          response.data.site.siteCode +
          "-" +
          month_year +
          "-" +
          response.data.serviceInvoiceDetails[0].qty;
        this.setState({ remark });

        const invoiceDate = new Date(
          Moment(response.data.invDate).format("Y-MM-DD")
        );
        const futureDate = new Date(invoiceDate);

        futureDate.setDate(invoiceDate.getDate() + 7);

        const formattedFutureDate = `${futureDate.getFullYear()}-${String(
          futureDate.getMonth() + 1
        ).padStart(2, "0")}-${String(futureDate.getDate()).padStart(2, "0")}`;

        self.setState({
          siteCode: response.data.site.siteCode,
          data: response.data,
          servicePlan: response.data.serviceInvoiceDetails[0].servicePlan.name,
          actualBandWidth: response.data.serviceInvoiceDetails[0].actualSite,
          paymentData: response.data.serviceInvoiceDetails,
          serviceCharge: response.data.serviceCharges,
          discount: response.data.discount,
          tax: response.data.tax,
          subTotal: response.data.subTotal,
          total: response.data.total,
          payment: response.data.payment,
          balance: response.data.balance,
          refreshing: false,
          isPanding: response.data.bankTransfer,
          img: response.data.slip,
          inv_date: response.data.invDate,
          inv_timestamp: new Date(formattedFutureDate),
          response_invDate: Moment(response.data.invDate).format("Y-MM-DD"),
        });
      })
      .catch((err) => {
        alert("get site code ", err);
        console.log("Error get Sitecode api ", err);
        self.setState({ refreshing: false });
      });
  };

  _handleOnClose() {
    this.setState({ isOpenAlertModel: false });
  }
  payShowHideStatus() {
    // console.log(payShowHideApi);
    var self = this;
    let param = {
      app_id: APP_ID,
      merchant: "mm-link",
      security_key: SECURITY_KEY,
    };
    // console.log(param)
    axios
      .post(payShowHideApi, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.data != null) {
          self.setState({
            show_kbz: response.data.data.kbzpay,
            show_cb: response.data.data.cbpay,
            show_aya: response.data.data.ayapay,
          });
        }
      })
      .catch((err) => {
        console.log("Payment Show Hide api ", err);
        self.setState({ refreshing: false });
      });
  }
  click_KBZ() {
    this.setState({ isOpenAlertModel: false });
    this.go_pay_app("KBZPay", null);
  }
  click_CB() {
    this.setState({ isOpenAlertModel: false });
    this.go_pay_app("CBPay", null);
  }
  click_AYA() {
    this.setState({ isOpenAlertModel: false, isOpenAYAModel: true });
  }
  _handleOnChooseImage(image) {
    let imageUri = image ? `data:image/jpg;base64,${image.base64}` : null;
    this.setState({ base64Image: imageUri });
  }
  _handleOnSave = async () => {
    if (this.state.base64Image != "") {
      let bodyParam = this.state.data;

      bodyParam["slip"] = this.state.base64Image;
      bodyParam["uat"] = new Date().toISOString();
      bodyParam["bankTransfer"] = true;

      var serviceInvId = await this.props.route.params.serviceInvId;
      const url = purchasedetailApi + serviceInvId;
      const access_token = await AsyncStorage.getItem("access_token");
      axios
        .put(url, bodyParam, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          this.setState({
            isPanding: response.data.bankTransfer,
            img: response.data.slip,
          });
          alert("Success. mm-link will contact you soon.");
        })
        .catch((err) => {
          console.log("Error get purchased api ", err);
          this.setState({ refreshing: false });
        });
    } else {
      alert("Please choose payment slip!!");
    }
  };

  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: true,
    });
    this.getSiteCode();
  };
  _handlePhoneCall(number) {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  }

  _handleAYAClose() {
    this.setState({ isOpenAYAModel: false });
  }
  async go_AYA(phone) {
    this.setState({ show_loading: true });
    this.go_pay_app("AYAPay", phone);
  }

  go_pay_app = async (payment_type, phone) => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Please allow notification permission!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    var url = PGW_END_POINT + "/api/makePayment";
    // console.log(url);
    var param = {
      username: await AsyncStorage.getItem("user_id"),
      password: await AsyncStorage.getItem("password"),
      invoice_id: this.props.route.params.serviceInvId,
      payment_type: payment_type,
      merchant: "mm-link",
      expo_token: token,
      // expo_token:"ExponentPushToken[wRg3DZDlooeQjIW0Jz-FFt]",
      ayapay_phone: phone,
    };

    axios
      .post(url, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // alert('hi');
        // console.log(response.data);
        this.setState({ isOpenAYAModel: false, show_loading: false });
        if (payment_type == "KBZPay") {
          Linking.openURL(response.data.referer_url);
        } else {
          Linking.openURL(response.data.deeplink);
        }
      })
      .catch((err) => {
        alert("Something went wrong!");
        console.log("Pay  api ", err);
      });
  };

  render() {
    const { t } = this.props;
    // if (this.state.refreshing) {
    //   return (
    //     <View style={styles.container}>
    //       <FiberHeader
    //         backgroundColor="#337ab7"
    //         headerText="Payment Detail"
    //         routeName="Dashboard"
    //         onPress={() => this.props.navigation.navigate("PaymentNavigator")}
    //       />
    //       <View style={styles.loadingView}>
    //         <ActivityIndicator size="large" color="#1179C2" />
    //       </View>
    //     </View>
    //   );
    // }
    // if (this.state.show_loading) {
    //   return (
    //     <View style={styles.container}>
    //       <FiberHeader
    //         backgroundColor="#337ab7"
    //         headerText="Payment Detail"
    //         routeName="Dashboard"
    //         onPress={() => this.props.navigation.navigate("PaymentNavigator")}
    //       />
    //       <View style={styles.loadingView}>
    //         <ActivityIndicator size="large" color="#1179C2" />
    //       </View>
    //     </View>
    //   );
    // }
    return (
      <View style={styles.container}>
        {this.state.show_status == 1 &&
        Date.now() > this.state.inv_timestamp ? (
          <View style={{ flex: 1 }}>
            <FiberHeader
              backgroundColor="#337ab7"
              headerText="payment_overdue"
              routeName="Dashboard"
              onPress={() => this.props.navigation.navigate("PaymentNavigator")}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Image
                source={require("@images/warning.png")}
                style={{ width: 130, height: 130 }}
              />
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: Fonts.primary,
                    color: "#FFCB01",
                  }}
                >
                  Payment Overdue!
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 17 }}>Your invoice is overdue.</Text>
              </View>
              <View>
                <Text style={{ fontSize: 17 }}>
                  Please contact mm-link call center 09-789-799-799
                </Text>
              </View>
              <View style={styles.btn_container}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#337ab7",
                    width: 100,
                    height: 40,
                    position: "absolute",
                    bottom: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                  }}
                  onPress={() => this._handlePhoneCall("09789799799")}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 17,
                      fontFamily: Fonts.primary,
                    }}
                  >
                    Call
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FiberHeader
              backgroundColor="#337ab7"
              headerText="Payment Detail"
              routeName="Dashboard"
              onPress={() => this.props.navigation.navigate("PaymentNavigator")}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
              style={{ marginBottom: 10 }}
            >
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("invNo", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>{this.state.data.invNo}</Text>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("site_code", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>{this.state.siteCode}</Text>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("service_plan", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>{this.state.servicePlan}</Text>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("invDate", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>
                  {Moment(this.state.inv_date).format("D/MM/Y")}
                </Text>
              </View>
              {this.state.paymentData.map((data, index) => {
                return (
                  <View key={index}>
                    <View>
                      <PurchasedDetailCard
                        bandwidth={this.state.actualBandWidth}
                        purchaseType={
                          data.payType === "m" ? "Monthly" : "Daily"
                        }
                        formDate={Moment(data.fromDate).format("D/MMM/Y")}
                        toDate={Moment(data.toDate).format("D/MMM/Y")}
                        qty={data.qty}
                        price={commaString(data.price)}
                        amount={commaString(data.amount)}
                      />
                    </View>
                  </View>
                );
              })}

              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("service_charge", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>
                  {commaString(this.state.serviceCharge)}Ks
                </Text>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("discount", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>
                  {commaString(this.state.discount)}Ks
                </Text>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("tax", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>
                  {commaString(this.state.tax)}Ks
                </Text>
              </View>

              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("sub_total", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>
                  {commaString(this.state.subTotal)}Ks
                </Text>
              </View>

              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("total", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>
                  {commaString(this.state.total)}Ks
                </Text>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#E4E4E4",
                  },
                ]}
              >
                <Text style={styles.labelStyle}>
                  {t("balance", this.state.locale)}
                </Text>
                <Text style={styles.labelStyle}>
                  {commaString(this.state.balance)}Ks
                </Text>
              </View>
              {this.state.show_kbz == 1 ||
              this.state.show_cb == 1 ||
              this.state.show_aya == 1 ? (
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={() => this._handleOpen()}
                >
                  <View
                    style={[styles.btnStyle, { backgroundColor: "#FFFFFF" }]}
                  >
                    <Text
                      style={[
                        styles.btnText,
                        { color: "#0079b3", fontSize: 16, fontWeight: "700" },
                      ]}
                    >
                      {t("make_payment", this.state.locale)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              <PaymentModal
                isOpen={this.state.isOpenAlertModel}
                onClose={() => this._handleOnClose()}
                _handle_KBZ={() => this.click_KBZ()}
                _handle_CB={() => this.click_CB()}
                _handle_AYA={() => this.click_AYA()}
                kbz_show={this.state.show_kbz}
                cb_show={this.state.show_cb}
                aya_show={this.state.show_aya}
              />
              <AYAModal
                isOpen={this.state.isOpenAYAModel}
                onClose={() => this._handleAYAClose()}
                onSubmit={(phone) =>
                  this.go_AYA(phone, this.state.expoPushToken)
                }
                header_text="Enter your AYAPay Phone No."
                btn_text="Open AYAPay"
              />
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}
export default withTranslation()(UnPaidDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    // paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  labelStyle: {
    fontSize: 14,
    color: "#707070",
    fontFamily: Fonts.primary,
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  btnStyle: {
    borderColor: "#1179C2",
    borderWidth: 1,
    borderStyle: "solid",
    // backgroundColor: "#0079b3",

    // width: 125,
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 14,
    fontFamily: Fonts.primary,
  },
  loadingView: {
    marginHorizontal: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  btn_container: {
    // flex: 1,
    height: 100,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});
