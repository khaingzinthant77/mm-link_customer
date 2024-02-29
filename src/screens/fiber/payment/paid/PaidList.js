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

//import service
import { purchasedListApi } from "@apis/FiberApis";
import { commaString } from "@services/CommaString";
//import date Format
import Moment from "moment";

import Fonts from "@styles/Fonts";

//import Localization
import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";

class PaidList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseListData: [],
      cus_id: "",
      access_token: "",
      refreshing: true,
      totalamount: 0,
      routeName: "",
      locale: "",
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = async () => {
    await this._getPurchasedList();

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
    this.props.navigation.navigate("FiberDashboard");
    return true;
  }

  _getPurchasedList = async () => {
    var self = this;
    var cus_id = await AsyncStorage.getItem("cusId");
    var access_token = await AsyncStorage.getItem("access_token");
    let bodyParam = {
      Stype: null,
      ReceivedBy: null,
      CusId: cus_id,
      Period: null,
    };

    axios
      .post(purchasedListApi, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        // console.log(response.data);

        var totalamount = 0;
        if (response.data.length > 0) {
          response.data.map((data, index) => {
            if (data.invoiceInfo.total != null) {
              totalamount = totalamount + data.invoiceInfo.total;
            }
          });
        }
        var dataArr = response.data;
        let sortedData = dataArr.sort((a, b) =>
          b.paymentDate
            .split("/")
            .reverse()
            .join()
            .localeCompare(a.paymentDate.split("/").reverse().join())
        );

        self.setState({
          purchaseListData: sortedData,
          totalamount: totalamount,
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
    this._getPurchasedList();
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
          {t("total", this.state.locale)} -{commaString(this.state.totalamount)}
          Ks
        </Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {this.state.purchaseListData.length > 0 ? (
            this.state.purchaseListData.map((data, index) => {
              // console.log(data);
              return (
                <PurchaseCard
                  img={require("@icons/purchased-bag.png")}
                  onPress={() =>
                    this.props.navigation.navigate("PaySlip", {
                      serviceInvId: data.invoiceInfo.serviceInvId,
                    })
                  }
                  key={index}
                  invoiceNo={data.invoiceInfo.invNo}
                  sitecode={data.siteCode}
                  payment={commaString(data.invoiceInfo.total)}
                  paymentDate={Moment(data.paymentDate).format("D/MM/Y")}
                />
              );
            })
          ) : (
            <View></View>
          )}
        </ScrollView>
      </View>
    );
  }
}
export default withTranslation()(PaidList);
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
