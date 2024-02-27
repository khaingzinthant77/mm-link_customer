import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
//import component
import PurchaseCard from "@components/PurchaseCard";
//import date Format
import Moment from "moment";

//import service
import { commaString } from "@services/CommaString";

import Fonts from "@styles/Fonts";

//import Localization
import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";

import { toPurchaseApi } from "@apis/FiberApis";

class UnPaidList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      refreshing: true,
      totalamount: 0,
      routeName: "",
      locale: "",
      site_code: "",
      date_arr: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = async () => {
    this.props.navigation.addListener("focus", async () => {
      // alert('hi')
      this._getAllToPurchase();
    });
    this._getAllToPurchase();

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

  _getAllToPurchase = async () => {
    var self = this;
    var cus_id = await AsyncStorage.getItem("cusId");
    var access_token = await AsyncStorage.getItem("access_token");
    let bodyParam = {
      Stype: null,
      ReceivedBy: null,
      CusId: cus_id,
      Period: null,
    };
    // console.log(toPurchaseApi);
    // console.log(access_token)
    axios
      .post(toPurchaseApi, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(async (response) => {
        var totalamount = 0;

        let arr = [];
        let date_array = [];
        if (response.data.length > 0) {
          response.data.map((data, index) => {
            // console.log(data);
            if (data.totalAmt != null) {
              totalamount = totalamount + data.totalAmt;
            }

            var invoice_arr = data.invoiceInfos;
            invoice_arr.map((inv_data, index) => {
              arr.push(inv_data);
              date_array.push(inv_data.invDate);
            });
          });
        }
        self.setState({ date_arr: date_array });
        // console.log(self.state.date_arr)
        // console.log(arr);
        try {
          await AsyncStorage.setItem("unpaid_count", arr.length.toString());
          // console.log("Async storage store successfully");
        } catch (error) {
          console.log("Async storage error");
        }

        self.setState({
          data: arr,
          totalamount: totalamount,
          site_code: response.data.length > 0 ? response.data[0].siteCode : "",
          refreshing: false,
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
    this._getAllToPurchase();
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
        <Text allowFontScaling={false} style={styles.textStyle}>
          {t("total", this.state.locale)} -{" "}
          {commaString(this.state.totalamount)} Ks
        </Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          {this.state.data != null ? (
            this.state.data.length > 0 ? (
              this.state.data.map((data, index) => {
                // console.log(data[0]);
                return (
                  <PurchaseCard
                    img={require("@icons/to-purchase.png")}
                    onPress={() =>
                      this.props.navigation.navigate("UnPaidDetail", {
                        serviceInvId: data.serviceInvId,
                        data: data,
                        date_arr: this.state.date_arr,
                      })
                    }
                    invoiceNo={data.invNo}
                    sitecode={this.state.site_code}
                    payment={commaString(data.total)}
                    paymentDate={Moment(data.invDate).format("D/MM/Y")}
                    key={index}
                  />
                );
              })
            ) : (
              <View></View>
            )
          ) : null}
        </ScrollView>
      </View>
    );
  }
}
export default withTranslation()(UnPaidList);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F2F2F2",
    marginTop: 10,
  },
  textStyle: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#171515",
    fontFamily: Fonts.primary,
  },
  loadingView: {
    marginHorizontal: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
