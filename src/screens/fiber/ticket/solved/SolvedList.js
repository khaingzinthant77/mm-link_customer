import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
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

class SolvedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solved: 0,
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
    // alert(this.props.route.params.site_code)
    // console.log(this.props.navigation.getParam("data"))
    await this.getCustomerInfo();

    this.setState({ loading: true });
    const siteCode = await AsyncStorage.getItem("siteCode");
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
      status: "adminSolve",
      filterDate: "solveDate",
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
          self.setState({
            data: response.data,
            refreshing: false,
            cust_info: response.data[0],
            loading: false,
          });

          var solvedCount = 0;
          if (response.data.length > 0) {
            response.data.map((data, index) => {
              if (data.siteCode == self.state.siteCode) {
                solvedCount = solvedCount + 1;
                self.setState({ solved: solvedCount });
              }
            });
          }
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
    return (
      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.list}>
          {t("total", this.state.locale)} -{this.state.solved}
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
              // console.log(data.siteId)
              if (data.siteCode == this.state.siteCode) {
                // console.log(data);
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("SolvedTicketDetail", {
                        data: data,
                      })
                    }
                    key={index}
                  >
                    <TicketCard
                      number={i}
                      date={Moment(data.solvedAt).format("D-MM-Y hh:mm A")}
                      issue={data.issueType}
                      problem={data.description}
                      status="solve"
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
export default withTranslation()(SolvedList);
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
