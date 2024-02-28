import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Component
import TicketCard from "@components/TicketCard";

//import apis
import { unsolvedApi } from "@apis/FiberApis";

import Fonts from "@styles/Fonts";
//import Localization
import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";

//import date Format
import Moment from "moment";
import axios from "axios";

class UnsolvedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unsolved: 0,
      data: [],
      refreshing: true,
      status: null,
      loading: true,
      siteId: "",
      locale: "",
      cust_info: null,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = async () => {
    await this.getCustomerInfo();
    // await
    this.setState({ loading: true });
    const siteCode = await AsyncStorage.getItem("siteCode");
    // alert(siteCode)
    this.setState({ siteCode: siteCode });
    initializeLocalization();
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
    this.props.navigation.navigate("FiberDashboard");
    return true;
  }

  getCustomerInfo = async () => {
    var self = this;
    const value = await AsyncStorage.getItem("access_token");
    const cus_id = await AsyncStorage.getItem("cusId");
    // console.log(value)
    let bodyParam = {
      cusId: cus_id,
      period: null,
      status: null,
      filterDate: "voucherDate",
    };
    axios
      .post(unsolvedApi, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + value,
        },
      })
      .then(function (response) {
        if (response.status == 200) {
          // console.log("Unsolve Ticket List",response.data[0]);
          var unsolvedCount = 0;
          var unsolvedArr = [];
          if (response.data.length > 0) {
            response.data.map((data, index) => {
              if (
                data.siteCode == self.state.siteCode &&
                data.solved == false
              ) {
                unsolvedCount = unsolvedCount + 1;
                self.setState({ unsolved: unsolvedCount });
                unsolvedArr.push(data);
              }
            });
          }
          // console.log('Hello',unsolvedArr[0]);
          self.setState({
            data: unsolvedArr,
            cust_info: response.data[0],
            refreshing: false,
            loading: false,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: false,
    });
    this.getCustomerInfo();
  };

  render() {
    const { t } = this.props;
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size="large"
          style={{
            flex: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      );
    }
    var i = 0;
    // console.log(this.state.data);
    return (
      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.list}>
          {t("total", this.state.locale)} -{this.state.unsolved}
        </Text>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        >
          {this.state.data.length > 0 ? (
            this.state.data.map((data, index) => {
              // console.log(data)
              if (data.siteCode == this.state.siteCode) {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("UnsolvedTicketDetail", {
                        data: data,
                        routeName: "UnsolvedList",
                      })
                    }
                    key={index}
                  >
                    <TicketCard
                      number={index + 1}
                      date={
                        data.cat
                          ? Moment(data.cat).format("DD-MM-Y hh:mm A")
                          : "-"
                      }
                      issue={data.issueType}
                      problem={data.description}
                      status="unsolve"
                    />
                  </TouchableOpacity>
                );
              }
            })
          ) : (
            <View></View>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() =>
            this.props.navigation.navigate("CreateTicket", {
              routeName: "NewTicket",
              site_code: this.state.siteCode,
            })
          }
        >
          <Image
            source={require("@images/plus.png")}
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default withTranslation()(UnsolvedList);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    margin: 10,
    fontSize: 16,
    fontFamily: Fonts.primary,
  },
  newBtn: {
    position: "absolute",
    right: 20,
    bottom: 15,
    backgroundColor: "#0079b3",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
