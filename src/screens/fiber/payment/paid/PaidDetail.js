import ViewShot from "react-native-view-shot";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//import compnonent
import PurchasedDetailCard from "@components/PurchasedDetailCard";
import FiberHeader from "@components/FiberHeader";
//import date Format
import Moment from "moment";
//import service
import { commaString } from "@services/CommaString";
import { purchasedetailApi } from "@apis/FiberApis";
import GetUUID from "@services/GetUUID";
import * as MediaLibrary from "expo-media-library";
import Fonts from "@styles/Fonts";

import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";

class PaidDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteCode: "",
      data: [],
      servicePlan: "",
      actualBandWidth: "",
      paymentData: [],
      paymentDate: "",
      serviceCharge: 0,
      discount: 0,
      tax: 0,
      subTotal: 0,
      total: 0,
      payment: 0,
      balance: 0,
      total: 0,
      refreshing: true,
      img: "",
      locale: "",
      banktranser: false,
      url: "",
      img_show: false,
      remark: "",
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = async () => {
    await this._getPaymentDetail();

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    initializeLocalization();
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

  render() {
    const { t } = this.props;
    if (this.state.refreshing) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#1179C2" />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="Payment Detail"
          routeName="Dashboard"
          onPress={() => this.props.navigation.goBack(null)}
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
            style={{ paddingHorizontal: 5, backgroundColor: "white" }}
          >
            <View
              style={[
                styles.rowContainer,
                {
                  paddingBottom: 5,
                  borderBottomWidth: 1,
                  marginTop: 10,
                  borderBottomColor: "#E4E4E4",
                },
              ]}
            >
              <Image
                source={require("@images/splash.png")}
                style={{ width: "100%", height: 100, resizeMode: "contain" }}
              ></Image>
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("invNo", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {this.state.data.invNo}
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("site_code", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {this.state.siteCode}
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("service_plan", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {this.state.servicePlan}
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("payment_date", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {Moment(this.state.paymentDate).format("D/MMM/Y")}
              </Text>
            </View>
            {this.state.paymentData.map((data, index) => {
              return (
                <View key={index}>
                  <View ref="viewRef">
                    <PurchasedDetailCard
                      purchaseType={data.payType === "m" ? "Monthly" : "Daily"}
                      formDate={Moment(data.fromDate).format("D/MMM/Y")}
                      toDate={Moment(data.toDate).format("D/MMM/Y")}
                      qty={data.qty}
                      price={commaString(data.price)}
                      amount={commaString(data.amount)}
                      bandwidth={this.state.actualBandWidth}
                      status="payment"
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("service_charge", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("discount", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("tax", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("sub_total", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("total", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {commaString(this.state.total)}Ks
              </Text>
            </View>
            <View
              style={[
                styles.rowContainer,
                {
                  // paddingBottom: 30,
                  borderBottomWidth: 1,
                  borderBottomColor: "#E4E4E4",
                },
              ]}
            >
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("balance", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {commaString(this.state.balance)}Ks
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
              <Text allowFontScaling={false} style={styles.labelStyle}>
                Remark
              </Text>
              <Text
                allowFontScaling={false}
                style={styles.labelStyle}
                numberOfLines={1}
              >
                {this.state.remark.length < 10
                  ? `${this.state.remark}`
                  : `${this.state.remark.substring(0, 10)}...`}
              </Text>
            </View>
          </ViewShot>

          {/* <TouchableOpacity
            style={[styles.btn_container, { marginBottom: 10, marginTop: 20 }]}
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
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    );
  }
}
export default withTranslation()(PaidDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    // paddingHorizontal: 10,
    // alignItems:"center"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  labelStyle: {
    fontSize: 14,
    color: "#707070",
    fontFamily: Fonts.primary,
  },
  btnContainer: {
    alignItems: "center",
    // justifyContent: "center",
    marginVertical: 20,
  },
  btn_container: {
    alignItems: "center",
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
