import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";

import Fonts from "@styles/Fonts";
import Styles from "@styles/Styles";

import { useTranslation } from "react-i18next";
//import service
import { commaString } from "@services/CommaString";
import axios from "axios";
//import Component
import SuccessModel from "@components/SuccessModal";
import FiberHeader from "@components/FiberHeader";
import ErrorText from "@components/ErrorText";
import RadioBtn from "@components/Radio";
//get service
import GetUUID from "@services/GetUUID";
import { GetRandomValue } from "@services/GetRandomValue";

import {
  getServicePlanApi,
  ticketissuetype,
  ticketproblem,
  solvedTicketDetail,
} from "@apis/FiberApis";
const months = [
  { value: 3, label: "3 Months" },
  { value: 6, label: "6 Months" },
  { value: 1, label: "12 Months" },
];

const PlanUpDown = ({ navigation }) => {
  const { t } = useTranslation();
  const [internetPlans, setInternetPlans] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [month, setMonth] = useState({ value: null, label: null });
  const [bandwidth, setBandWidth] = useState("");
  const [access_token, setAccessToken] = useState(null);
  const [randomNum, setRandomNum] = useState(null);
  const [serviceType, setServiceType] = useState([]);
  const [issueType, setIssueType] = useState("");
  const [issueTypes, setIssueTypes] = useState([]);
  const [issueProblems, setIssueProblems] = useState([]);
  const [title, setTitle] = useState(null);
  const [siteId, setSiteId] = useState(null);
  const [servicePlan, setServicePlan] = useState({});
  const [isOpenSuccessModel, setOpenSuccessModal] = useState(false);
  const [ISISSUETYPEERROR, setIssueTypeError] = useState(false);
  const [ISINTERNETERROR, setInternetError] = useState(false);
  const [ISERRORTEXT, setErrorText] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [planId, setPlanId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const route = new useRoute();
  //   console.log(route.params);
  useEffect(() => {
    getServiceType();
    _getAllIssueType();
    _getAllIssueProblem();
  }, []);

  getServiceType = async () => {
    const url = getServicePlanApi + GetRandomValue();
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + (await AsyncStorage.getItem("access_token")),
        },
      })
      .then(function (response) {
        setServiceType(response.data);
        setServicePlan(response.data[0]);
        setPlanId(response.data.planId);
        setSelectedData(response.data[0].planId);
        setInternetPlans(response.data[0].name);
        setMonthlyFee(response.data[0].monthlyFee);
        setMonth({ value: 3, label: "3 Months" });
        setBandWidth(response.data[0].size3M);
        setTotalCost(parseInt(response.data[0].monthlyFee) * 3);
      })

      .catch(function (error) {
        console.log("Error:", error);
      });
  };

  _getAllIssueType = async () => {
    var access_token = await AsyncStorage.getItem("access_token");
    const url = ticketissuetype + GetRandomValue();
    // console.log(access_token);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        let data = response.data;
        data.map((data, index) => {
          // console.log(data.issueType)
          if (data.issueType == "G") {
            setIssueType(data.ticketIssueId);
          }
        });
      })
      .catch((err) => {
        console.log("Error get purchased api ", err);
      });
  };

  _getAllIssueProblem = async () => {
    var access_token = await AsyncStorage.getItem("access_token");

    const url = ticketproblem + GetRandomValue();
    // console.log(access_token);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => {
        // console.log(response.data);
        let data = response.data;
        // console.log(data);
        let arr = [];
        data.map((data, index) => {
          var obj = {
            value: data.ticketProblemId,
            label: data.name,
          };
          arr.push(obj);
        });
        setIssueProblems(arr[0]);
      })
      .catch((err) => {
        console.log("Error get purchased api ", err);
      });
  };
  _handleMonth = (value, label) => {
    // console.log(servicePlan.size3M);
    var bandwidth =
      value == 3
        ? servicePlan.size3M
        : value == 6
        ? servicePlan.size6M
        : value == 1
        ? servicePlan.size1Y
        : "";
    var fee =
      value == 3
        ? parseInt(monthlyFee) * 3
        : value == 6
        ? parseInt(monthlyFee) * 6
        : value == 1
        ? parseInt(monthlyFee) * 12
        : "";
    setMonth({ value: value, label: label });
    setBandWidth(bandwidth);
    setTotalCost(fee);
  };

  _handleOnCloseSuccessModel = () => {
    setOpenSuccessModal(false);
    navigation.goBack(null);
  };
  _handleInternetPlan = (internetPlan, price, planId, data, size) => {
    setTotalCost(price);
    setInternetPlans(internetPlan.toString());
    setMonthlyFee(price.toString());
    setMonth({ value: 3, label: "3 Months" });
    setSelectedData(planId);
    setPlanId(planId);
    setServicePlan(data);
    setBandWidth(size);
    setInternetError(false);
  };

  _onPressUpgrade = async () => {
    //  console.log(planId);
    if (route.params.planId.planId === planId) {
      alert("Cannot upgrade same plan!");
    } else if (planId === undefined) {
      alert("Cannot upgrade same plan!");
    } else {
      // alert(planId)
      var self = this;
      var access_token = await AsyncStorage.getItem("access_token");
      let bodyParam = {
        ticketId: GetUUID.uuid(),
        ticketIssueId: issueType,
        ticketProblemId: null,
        siteId: route.params.siteId,
        title: "Upgrade/Downgrade",
        description: `${internetPlans} month=${month.label} bandwidth=${bandwidth}Mbps totalcost=${totalCost}Ks`,
        remark: "",
        priority: 1,
      };

      setLoading(true);
      axios
        .post(solvedTicketDetail, bodyParam, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
          },
        })
        .then((response) => {
          setLoading(false);
          setInternetPlans("");
          setMonthlyFee("");
          setMonth({ value: null, label: null });
          setBandWidth("");
          setTotalCost("");
          setOpenSuccessModal(true);
        })
        .catch((err) => {
          console.log("Create new ticket api error", err);
          setLoading(false);
        });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <FiberHeader
        backgroundColor="#337ab7"
        headerText="internet_plan"
        routeName="Dashboard"
        onPress={() => navigation.goBack(null)}
      />
      <View style={{ marginTop: 20, marginLeft: 20, flexDirection: "row" }}>
        <Text
          allowFontScaling={false}
          style={{ fontWeight: "bold", fontFamily: Fonts.primary }}
        >
          {t("please_choose")}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.cardContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {serviceType.map((data, index) => {
              if (data.show) {
                return (
                  <View key={index}>
                    <RadioBtn
                      internetPlan={data.name}
                      monthlyFee={data.monthlyFee}
                      bgColor={data.color}
                      img={data.img}
                      onPress={() =>
                        this._handleInternetPlan(
                          data.name,
                          data.monthlyFee,
                          data.planId,
                          data,
                          data.size3M
                        )
                      }
                      active={selectedData == data.planId ? true : false}
                    />
                  </View>
                );
              }
            })}
          </ScrollView>
        </View>
        {serviceType.length == 0 ? (
          <ActivityIndicator
            size="large"
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ) : null}

        <ErrorText errMessage={t("please_choose")} isShow={ISINTERNETERROR} />

        <KeyboardAvoidingView style={{ flex: 1 }} enabled>
          <View style={{ marginTop: 10 }}>
            <View style={styles.entryContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("current_plan")}
              </Text>

              <TextInput
                allowFontScaling={false}
                style={styles.costText}
                value={route.params.currentPlan.name}
                editable={false}
              />
            </View>

            <View style={styles.entryContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("internet_plan")}
              </Text>
              <TextInput
                allowFontScaling={false}
                editable={false}
                style={styles.costText}
                value={internetPlans}
              ></TextInput>
            </View>
            <View style={styles.entryContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("monthly_fee")}
              </Text>
              <View style={styles.costText}>
                {/* <View
                    style={styles.costText}
                    
                  /> */}
                <Text allowFontScaling={false}>{commaString(monthlyFee)}</Text>
                <Text allowFontScaling={false}>{monthlyFee ? "Ks" : ""}</Text>
              </View>
            </View>

            <View style={styles.entryContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("month")}
              </Text>

              <Dropdown
                style={[
                  Styles.dropdown,
                  {
                    width: "60%",
                    marginTop: 10,
                    height: 40,
                    backgroundColor: "white",
                    borderColor: "white",
                  },
                ]}
                selectedTextStyle={Styles.selectedTextStyle}
                search={false}
                data={months}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={t("select_month")}
                value={month}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => _handleMonth(item.value, item.label)}
              />
            </View>
            <View style={styles.entryContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("bandwidth")}
              </Text>
              <View style={styles.costText}>
                <Text allowFontScaling={false}>{bandwidth.toString()}</Text>
                <Text allowFontScaling={false}>{bandwidth ? "Mbps" : ""}</Text>
              </View>
            </View>
            <View style={styles.entryContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("total_cost")}
              </Text>
              <View style={styles.costText}>
                <Text allowFontScaling={false}>{commaString(totalCost)}</Text>
                <Text allowFontScaling={false}>{totalCost ? "Ks" : ""}</Text>
              </View>
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={() => (!isLoading ? this._onPressUpgrade() : null)}
              >
                <Text allowFontScaling={false} style={styles.btnText}>
                  {isLoading ? "Loading..." : t("save")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <SuccessModel
          isOpen={isOpenSuccessModel}
          text="Successfully Internet Plan Upgrade"
          onClose={() => this._handleOnCloseSuccessModel()}
        />
      </ScrollView>
    </View>
  );
};

export default PlanUpDown;
const styles = StyleSheet.create({
  header: {
    height: "16%",
    backgroundColor: "#A177EF",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  headerLogo: {
    width: 33,
    height: 33,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 20,
    color: "white",
    marginLeft: 20,
  },
  cardContainer: {
    flexDirection: "row-reverse",
    paddingHorizontal: 10,
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 20,
    justifyContent: "space-between",
  },
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  label: {
    color: "#707070",
    fontSize: 14,
    marginTop: 10,
    flex: 1,
    fontFamily: Fonts.primary,
  },
  costText: {
    height: 37,
    width: "60%",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
  },
  btnContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
    margin: 10,
  },
  btn: {
    width: "40%",
    height: 36,
    backgroundColor: "#0079b3",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 14,
    fontFamily: Fonts.primary,
  },
  backImg: {
    width: 24,
    height: 17,
  },
  backContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 150,
  },
  card: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#A177EF",
  },
  text: {
    fontSize: 14,
    color: "#707070",
  },
});
