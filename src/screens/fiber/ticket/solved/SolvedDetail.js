import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  ScrollView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FiberHeader from "@components/FiberHeader";
//import date Format
import Moment from "moment";
//import apis
import { solvedTicketDetail } from "@apis/FiberApis";
import axios from "axios";

import Fonts from "@styles/Fonts";
import { initializeLocalization } from "@services/i18n";
import { withTranslation } from "react-i18next";
class SolvedDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solved: 0,
      unsolveCount: 0,
      detail: [],
      refreshing: false,
      status: null,
      loading: true,
      access_token: null,
      locale: "",
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = async () => {
    initializeLocalization();
    await this._retrieveToken();
    await this.getCustomerInfo();
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

  _retrieveToken = async () => {
    try {
      if (value !== null) {
        this.setState({ access_token: value });
      }
    } catch (error) {}
  };

  getCustomerInfo = async () => {
    var self = this;
    var random = await Math.round(Math.random() * 10);
    const value = await AsyncStorage.getItem("access_token");
    const url =
      solvedTicketDetail + this.props.route.params.data.ticketId + "/" + random;
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + value,
    };
    axios
      .get(url, {
        headers,
      })
      .then(function (response) {
        // console.log(response.data);
        if (response.status == 200) {
          self.setState({ detail: response.data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { t } = this.props;
    let data = this.props.route.params.data;
    // console.log(data);
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText={t("ticket_detail")}
          routeName="Dashboard"
          onPress={() => this.props.navigation.navigate("TicketNavigator")}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 5, marginBottom: 20 }}>
            <View style={styles.card}>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("created_date", this.state.locale)}
              </Text>
              <Text
                allowFontScaling={false}
                style={[
                  styles.textStyle,
                  { fontWeight: "bold", marginTop: 10 },
                ]}
              >
                {Moment(this.props.route.params.data.cat).format(
                  "D/MM/Y hh:mm A"
                )}
              </Text>
            </View>
            <View style={styles.card}>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("site_code", this.state.locale)}
              </Text>
              <Text
                allowFontScaling={false}
                style={[
                  styles.textStyle,
                  { fontWeight: "bold", marginTop: 10 },
                ]}
              >
                {data.siteCode}
              </Text>
            </View>
            <View style={styles.card}>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("issue", this.state.locale)}
              </Text>
              <Text
                allowFontScaling={false}
                style={[
                  styles.textStyle,
                  { fontWeight: "bold", marginTop: 10 },
                ]}
              >
                {data.issueType}
              </Text>
            </View>
            {/* <View style={styles.card}>
              <Text allowFontScaling={false} style={styles.labelStyle}>{t("problem",this.state.locale)}</Text>
              <Text allowFontScaling={false} style={[styles.textStyle, { fontWeight: "bold", marginTop: 10 }]}>{data.problem}</Text>
            </View> */}
            <View style={styles.card}>
              <Text allowFontScaling={false} style={styles.labelStyle}>
                {t("description", this.state.locale)}
              </Text>
              <Text
                allowFontScaling={false}
                style={[
                  styles.textStyle,
                  { fontWeight: "bold", marginTop: 10 },
                ]}
              >
                {data.description}
              </Text>
            </View>
            {/* <View style={styles.card}>
              <Text allowFontScaling={false} style={styles.labelStyle}>{t("solved_date",this.state.locale)}</Text>
              <Text allowFontScaling={false} style={[styles.textStyle, { fontWeight: "bold", marginTop: 10 }]}>{Moment(data.solvedAt).format("D-MM-Y hh:mm A")}</Text>
            </View>
            <View style={styles.card}>
              <Text allowFontScaling={false} style={styles.labelStyle}>{t("assign_tech",this.state.locale)}</Text>
              <Text allowFontScaling={false} style={[styles.textStyle, { fontWeight: "bold", marginTop: 10 }]}>{data.assignUserName}</Text>
            </View>
            <View style={styles.card}>
              <Text allowFontScaling={false} style={styles.labelStyle}>{t("remark",this.state.locale)}</Text>
              <Text allowFontScaling={false} style={[styles.textStyle, { fontWeight: "bold", marginTop: 10 }]}>{data.remark}</Text>
            </View> */}
            <View style={styles.cardContainer}>
              <View style={styles.rowContainer}>
                <View style={styles.labelContainer}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.labelStyle, { color: "green" }]}
                  >
                    Solved
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  {/* <Text allowFontScaling={false} style={styles.textStyle}>
                      {Moment(data.solvedAt).format("D-MM-Y hh:mm A")}
                    </Text> */}
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.labelContainer}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    {t("solved_date", this.state.locale)}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text allowFontScaling={false} style={styles.textStyle}>
                    {Moment(data.solvedAt).format("D-MM-Y hh:mm A")}
                  </Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.labelContainer}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    {t("assign_tech", this.state.locale)}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text allowFontScaling={false} style={styles.textStyle}>
                    {data.assignUserName}
                  </Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.labelContainer}>
                  <Text allowFontScaling={false} style={styles.labelStyle}>
                    {t("remark", this.state.locale)}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text allowFontScaling={false} style={styles.textStyle}>
                    {data.remark}
                  </Text>
                </View>
              </View>
            </View>
            {this.state.detail.cSignature ? (
              <Text
                style={[
                  styles.labelStyle,
                  {
                    fontWeight: "bold",
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 20,
                  },
                ]}
              >
                {t("cust_sign", this.state.locale)}
              </Text>
            ) : null}
            {this.state.detail.cSignature ? (
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    justifyContent: "center",
                    flex: 1,
                    borderColor: "#0079b3",
                    borderWidth: 2,
                    padding: 15,
                    borderRadius: 5,
                    marginTop: 5,
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: this.state.detail.cSignature
                        ? this.state.detail.cSignature
                        : "@images/mmlink.png",
                    }}
                    style={{ height: 200, width: 200 }}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withTranslation()(SolvedDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 5,
    backgroundColor: "#F2F2F2",
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
  },
  card: {
    justifyContent: "center",
    // paddingHorizontal: 10,
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
  cardContainer: {
    flexDirection: "column",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 2,
    elevation: 2,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.3, //IOS
    alignItems: "center",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  labelContainer: {
    padding: 5,
    flex: 1,
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
});
