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

class UnsolvedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unsolved: 0,
      data: [],
      refreshing: false,
      status: null,
      loading: false,
      siteId: "",
      locale: "",
      cust_info: null,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = async () => {
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

  onRefresh = () => {
    this.setState({
      data: [],
      refreshing: false,
    });
  };

  render() {
    const { t } = this.props;
    const { initialParam } = this.props.route.params;
    // console.log(initialParam);
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
          {initialParam.length > 0 ? (
            initialParam.map((data, index) => {
              // console.log(data);
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("UnSolvedDetail", {
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
