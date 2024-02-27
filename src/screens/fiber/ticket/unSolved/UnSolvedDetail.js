import React from "react";
import { View, Text, StyleSheet, ScrollView, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FiberHeader from "@components/FiberHeader";
import axios from "axios";
//import date Format
import Moment from "moment";
import {
  unsolvedTicketDetailApi,
  customerInfoApi,
  solvedTicketDetail,
} from "@apis/FiberApis";

import Fonts from "@styles/Fonts";
//import Localization
import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";

class UnSolvedDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: "",
      data: [],
      siteCode: "",
      address: "",
      sitecodeData: [],
      title: "",
      description: "",
      issueType: "",
      issueProblem: "",
      ticketIssueId: "",
      ticketId: "",
      siteId: "",
      createdDate: "",

      isOpenSuccessModel: false,
      locale: "",
    };
    this.BackHandler = null;
  }
  componentDidMount = async () => {
    await this._getUnsolvedTicketDetail();
    await this._getSiteCode();
    initializeLocalization();
  };

  _getUnsolvedTicketDetail = async () => {
    var self = this;
    var siteId = self.props.route.params.data.ticketId;
    var access_token = await AsyncStorage.getItem("access_token");
    var randomNumber = await Math.round(Math.random() * 10);
    const url = unsolvedTicketDetailApi + siteId + "/" + randomNumber;
    // console.log(access_token);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        self.setState({
          data: response.data,
          siteCode: response.data.site.siteCode,
          address: response.data.site.siteId,
          title: response.data.title,
          description: response.data.description,
          issueType: response.data.ticketIssueType
            ? response.data.ticketIssueType.name
            : "",
          issueProblem: response.data.ticketProblem
            ? response.data.ticketProblem.name
            : "",
          ticketIssueId: response.data.ticketIssueId,
          ticketId: response.data.ticketId,
          siteId: response.data.siteId,
          createdDate: response.data.site.cat,
          //   refreshing: false,
        });
      })
      .catch((err) => {
        console.log("Error get purchased api ", err);
      });
  };

  _getSiteCode = async () => {
    var self = this;
    var cus_Id = await AsyncStorage.getItem("cusId");
    var access_token = await AsyncStorage.getItem("access_token");

    const url = customerInfoApi + cus_Id;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        // console.log(response.data.sites);
        // console.log("Response Data is", response.data.site.siteCode);
        self.setState({
          sitecodeData: response.data.sites,
        });
      })
      .catch((err) => {
        console.log("Error get purchased api ", err);
      });
  };
  _handleInternetPlan() {
    this.setState({ selectedData: this.state.address });
  }
  _handleOnPressDelete = async () => {
    var self = this;
    self.setState({ isOpenSuccessModel: false });
    var siteId = self.props.route.params.data.ticketId;
    var access_token = await AsyncStorage.getItem("access_token");
    const url = solvedTicketDetail + siteId;

    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        self.props.navigation.navigate("UnsolvedTicketList");
      })
      .catch((err) => {
        console.log("Error get purchased api ", err);
      });
  };

  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
    // this.props.navigation.navigate("UnsolvedTicketList");
  }
  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText={t("ticket_detail")}
          routeName="Dashboard"
          onPress={() => this.props.navigation.navigate("TicketNavigator")}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 6 }}>
            <View style={styles.card}>
              <Text style={styles.labelStyle}>
                {t("created_date", this.state.locale)}
              </Text>
              <Text
                style={[styles.textStyle, { fontWeight: "bold", marginTop: 5 }]}
              >
                {Moment(this.props.route.params.data.createDate).format(
                  "D/MM/Y hh:mm A"
                )}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.labelStyle}>
                {t("site_code", this.state.locale)}
              </Text>
              <Text
                style={[styles.textStyle, { fontWeight: "bold", marginTop: 5 }]}
              >
                {this.state.siteCode}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.labelStyle}>
                {t("issue", this.state.locale)}
              </Text>
              <Text
                style={[styles.textStyle, { fontWeight: "bold", marginTop: 5 }]}
              >
                {this.state.issueType}
              </Text>
            </View>
            {/* <View style={styles.card}>
              <Text style={styles.labelStyle}>
                {t("title", this.state.locale)}
              </Text>
              <Text
                style={[styles.textStyle, { fontWeight: "bold", marginTop: 5 }]}
              >
                {this.state.title}
              </Text>
            </View> */}
            <View style={styles.card}>
              <Text style={styles.labelStyle}>
                {t("description", this.state.locale)}
              </Text>
              <Text
                style={[styles.textStyle, { fontWeight: "bold", marginTop: 5 }]}
              >
                {this.state.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withTranslation()(UnSolvedDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 5,
    backgroundColor: "#F2F2F2",
    fontFamily: Fonts.primary,
  },
  labelStyle: {
    fontSize: 16,
    color: "#000000",
    fontFamily: Fonts.primary,
    fontWeight: "bold",
  },
  textStyle: {
    fontSize: 14,
    color: "#707070",
    fontFamily: Fonts.primary,
    fontWeight: "bold",
  },
  card: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#78797e",
    borderBottomWidth: 0.5,
    // marginTop: 1,
    // marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    // borderWidth: 2,
    // borderRadius: 5,
    // elevation: 2,
    // backgroundColor: "#F2F2F2",
    // borderColor: "#F2F2F2",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 }, //IOS
    // shadowOpacity: 0.3, //IOS
    // backgroundColor:"red"
  },
});
