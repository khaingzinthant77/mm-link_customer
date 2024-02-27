import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import ViewShot from "react-native-view-shot";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import FiberHeader from "@components/FiberHeader";
import GetUUID from "@services/GetUUID";
import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";
import { purchasedetailApi } from "@apis/FiberApis";
import Moment from "moment";
import Fonts from "@styles/Fonts";
import { Divider } from "react-native-paper";

//import service
import { commaString } from "@services/CommaString";
import * as MediaLibrary from "expo-media-library";
class PaySlip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      locale: "",
      data: [],
      paymentData: [],
      total: 0,
      img_show: false,
      payment_date: null,
      cust_name: "",
    };
  }
  componentDidMount = async () => {
    this._getPaymentDetail();
    this.setState({
      cust_name: await AsyncStorage.getItem("user_name"),
    });
    initializeLocalization();
  };
  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: true,
    });
    this._getPaymentDetail();
  };

  capture_view = async () => {
    if (Platform.OS !== "web") {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      this.setState({ img_show: true });
      if (status === "granted") {
        this.refs.viewShot.capture().then(async (uri) => {
          await MediaLibrary.saveToLibraryAsync(uri);
          alert("Image saved successfully!");
        });
      } else {
        alert("Permission to access media library denied.");
      }
    }
  };

  _getPaymentDetail = async () => {
    var self = this;
    var serviceInvId = await this.props.route.params.serviceInvId;
    var access_token = await AsyncStorage.getItem("access_token");
    // console.log(access_token)
    const url = purchasedetailApi + serviceInvId + "/" + GetUUID.uuid();
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        // console.log(response.data);
        self.setState({
          siteCode: response.data.site.siteCode,
          data: response.data,
          servicePlan: response.data.serviceInvoiceDetails[0].servicePlan.name,
          actualBandWidth: response.data.serviceInvoiceDetails[0].actualSite,
          paymentDate: response.data.paymentDate,
          paymentData: response.data.serviceInvoiceDetails,
          serviceCharge: response.data.serviceCharges,
          discount: response.data.discount,
          tax: response.data.tax,
          subTotal: response.data.subTotal,
          total: response.data.total,
          payment: response.data.payment,
          balance: response.data.balance,
          img: response.data.slip,
          refreshing: false,
          banktranser: response.data.bankTransfer,
          remark: response.data.remark,
        });
      })
      .catch((err) => {
        console.log("Error get purchased api ", err);
        self.setState({ refreshing: false });
      });
  };
  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
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
        >
          <ViewShot
            ref="viewShot"
            options={{ format: "jpg", quality: 0.9 }}
            style={{ paddingHorizontal: 15, backgroundColor: "#f8f8f8" }}
          >
            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#edf2f0",
                // elevation: 1,
                marginTop: 10,
                // shadowOffset: { width: 0, height: 2 }, //IOS
                // shadowOpacity: 0.3,
              }}
            >
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    // borderBottomWidth: 1,
                    marginTop: 10,
                    // borderBottomColor: "#9e9e9e",
                  },
                ]}
              >
                <Image
                  source={require("@images/splash.png")}
                  style={{ width: "100%", height: 60, resizeMode: "contain" }}
                ></Image>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#9e9e9e",
                  },
                ]}
              >
                <View style={{ width: "30%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    {t("invNo", this.state.locale)}
                  </Text>
                </View>
                <View style={{ width: "70%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    : {this.state.data.invNo}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#9e9e9e",
                  },
                ]}
              >
                <View style={{ width: "30%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    {t("name", this.state.locale)}
                  </Text>
                </View>
                <View style={{ width: "70%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    : {this.state.cust_name}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#9e9e9e",
                  },
                ]}
              >
                <View style={{ width: "30%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    {t("site_code", this.state.locale)}
                  </Text>
                </View>
                <View style={{ width: "70%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    : {this.state.siteCode}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#9e9e9e",
                  },
                ]}
              >
                <View style={{ width: "30%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    {t("service_plan", this.state.locale)}
                  </Text>
                </View>
                <View style={{ width: "70%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    : {this.state.servicePlan}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#9e9e9e",
                  },
                ]}
              >
                <View style={{ width: "30%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    Payment Date
                  </Text>
                </View>
                <View style={{ width: "70%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    : {Moment(this.state.paymentDate).format("D/MMM/Y")}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  {
                    paddingBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#9e9e9e",
                  },
                ]}
              >
                <View style={{ width: "30%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    Expire Date
                  </Text>
                </View>
                <View style={{ width: "70%" }}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    :{" "}
                    {this.state.paymentData[0]
                      ? Moment(this.state.paymentData[0].toDate).format(
                          "D/MMM/Y"
                        )
                      : ""}
                  </Text>
                </View>
              </View>

              <View style={[styles.tableContainer, { marginTop: 10 }]}>
                <View
                  style={{
                    width: "70%",
                    borderWidth: 0.7,
                    padding: 6,
                    backgroundColor: "#337ab7",
                    borderRightColor: "white",
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "center",
                      fontFamily: Fonts.primary,
                      color: "white",
                    }}
                  >
                    {t("description", this.state.locale)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderWidth: 0.7,
                    padding: 6,
                    backgroundColor: "#337ab7",
                    borderleftColor: "white",
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "center",
                      fontFamily: Fonts.primary,
                      color: "white",
                    }}
                  >
                    {t("amt", this.state.locale)}
                  </Text>
                </View>
              </View>

              {this.state.paymentData.map((data, index) => {
                return (
                  <View style={styles.tableContainer} key={index}>
                    <View
                      style={{
                        // flex: 2,
                        borderLeftWidth: 0.3,
                        borderBottomWidth: 0.7,
                        borderRightWidth: 0.3,
                        padding: 4,
                        width: "70%",
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 14,
                          fontFamily: Fonts.primary,
                          color: "#707070",
                        }}
                      >
                        {/* {this.state.servicePlan}{" "} */}
                        {data.payType === "m" ? " Monthly" : " Daily"} charge
                        for
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 14,
                          fontFamily: Fonts.primary,
                          color: "#707070",
                        }}
                      >
                        {" "}
                        ({Moment(data.fromDate).format("D/MMM/Y")}~
                        {Moment(data.toDate).format("D/MMM/Y")})
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        borderLeftWidth: 0.5,
                        borderBottomWidth: 0.7,
                        borderRightWidth: 0.5,
                        padding: 4,
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 14,
                          textAlign: "right",
                          fontFamily: Fonts.primary,
                          color: "#707070",
                        }}
                      >
                        {data.payType === "m"
                          ? commaString(data.price)
                          : commaString(data.amount)}
                      </Text>
                    </View>
                  </View>
                );
              })}
              <View style={styles.tableContainer}>
                <View
                  style={{
                    // flex: 2,
                    borderLeftWidth: 0.3,
                    borderBottomWidth: 0.7,
                    borderRightWidth: 0.3,
                    padding: 4,
                    width: "70%",
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 14,
                      textAlign: "right",
                      fontFamily: Fonts.primary,
                      color: "#707070",
                    }}
                  >
                    Total
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderLeftWidth: 0.5,
                    borderBottomWidth: 0.7,
                    borderRightWidth: 0.5,
                    padding: 4,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 14,
                      textAlign: "right",
                      fontFamily: Fonts.primary,
                      color: "#707070",
                    }}
                  >
                    {commaString(this.state.total)}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "center", marginTop: -40 }}>
                <Image
                  source={require("@images/paid_logo.png")}
                  style={{ width: 120, height: 120 }}
                />
              </View>
            </View>
            <View
            // style={{
            //   elevation: 1,
            //   shadowOffset: { width: 0, height: 2 }, //IOS
            //   shadowOpacity: 0.3,
            // }}
            >
              <Image
                source={require("@images/saw.png")}
                style={{ width: "100%" }}
              />
            </View>
          </ViewShot>
        </ScrollView>
        <TouchableOpacity
          style={[styles.btn_container, { marginBottom: 30 }]}
          onPress={() => this.capture_view()}
        >
          <View
            style={[
              styles.downloadStyle,
              {
                backgroundColor: "#FFFFFF",
                flexDirection: "row",
                paddingHorizontal: 10,
              },
            ]}
          >
            <Image
              style={styles.cloud_icon}
              source={require("@images/compute_cloud.png")}
            ></Image>

            <Text
              allowFontScaling={false}
              style={[
                styles.downloadText,
                { color: "#0079b3", fontSize: 16, fontWeight: "700" },
              ]}
            >
              {t("download_img", this.state.locale)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn_container,
            {
              marginBottom: 40,
              // marginTop: 10,
            },
          ]}
          onPress={() =>
            this.props.navigation.navigate("PaidDetail", {
              serviceInvId: this.props.route.params.serviceInvId,
            })
          }
        >
          <Entypo name="info-with-circle" size={23} color="#0079b3" />
          <Text
            style={{
              color: "#337ab7",
              fontFamily: Fonts.primary,
              fontWeight: "bold",
              fontSize: 15,
              textDecorationLine: "underline",
            }}
          >
            View Payment Detail
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default withTranslation()(PaySlip);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  tableContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  labelStyle: {
    fontSize: 14,
    color: "#707070",
    fontFamily: Fonts.primary,
  },
  btn_container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnStyle: {
    borderColor: "#1179C2",
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: "#FFFFFF",
    width: 100,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadStyle: {
    borderColor: "#1179C2",
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: "#FFFFFF",
    // width: 100,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadText: {
    fontSize: 14,
    color: "#1179C2",
    fontFamily: Fonts.primary,
    // paddingHorizontal:20
  },
  btnText: {
    fontSize: 14,
    color: "#1179C2",
    fontFamily: Fonts.primary,
  },
  loadingView: {
    marginHorizontal: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  cloud_icon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
});
