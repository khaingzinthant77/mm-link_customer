import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  StatusBar,
  Linking,
  RefreshControl,
  SafeAreaView,
} from "react-native";
//import localization
import { useTranslation } from "react-i18next";
//import library
import axios from "axios";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
//import service
import GetUUID from "@services/GetUUID";
import { commaString } from "@services/CommaString";
import { ChangeDateFormat } from "@services/ChangeDateFormat";
//import font
import Fonts from "@styles/Fonts";
//import color
import Colors from "@styles/Colors";
//import style
import Styles from "@styles/Styles";
//import url
import { customerInfoApi, toPurchaseApi } from "@apis/FiberApis";
import { exp_intervalApi } from "@apis/PaymentApi";
import { SECURITY_KEY, NEWS_API_END_POINT } from "@env";
//import component
import ExpireAlert from "@components/ExpireAlert";
import CardView from "@components/dashboard/CardView";
//import component element
import { Dropdown } from "react-native-element-dropdown";

const FiberDashboard = ({ navigation }) => {
  const [townships, setTownships] = useState([]);
  const [township, setTownship] = useState({ vlaue: null, label: null });
  const [cust_name, setCustName] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [issue_count, setIssueCount] = useState(0);
  const [solved_count, setSolvedCount] = useState(0);
  const [issue, setIssue] = useState(0);
  const [solved, setSolved] = useState(0);
  const [paymentotal, setPaymentTotal] = useState(0);
  const [currentPurchase, setCurrentPurchase] = useState("");
  const [actualBandwidth, setActualBandwidth] = useState();
  const [price, setPrice] = useState("");
  const [sitecode, setSiteCode] = useState("");
  const [date, setDate] = useState("");
  const [usedDay, setUsedDay] = useState(0);
  const [materials, setMaterials] = useState("");
  const [internetplan, setInternetPlan] = useState("");
  const [total, setTotal] = useState(0);
  const [expiredate, setExpireDate] = useState("");
  const [diff, setDiff] = useState("");
  const [tempData, setTempData] = useState([]);
  const [label, setLabel] = useState("");
  const [materialList, setMaterialList] = useState([]);
  const [paymentList, setPaymentList] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [hidden, setHidden] = useState(true);
  const [install_loc, setInstallLoc] = useState([]);
  const [installDate, setInstallDate] = useState("");
  const [siteId, setSiteId] = useState("");
  const [planId, setPlanId] = useState("");
  const [currentPlan, setCurrentPlan] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [ticketArr, setTicketArr] = useState([]);
  const [cName, setcName] = useState("");
  const [cPh, setcPh] = useState("");
  const [status, setStatus] = useState("");
  const [expInterval, setExpInterval] = useState(0);
  const [isOpenExpireModal, setOpenExpireModal] = useState(false);
  const [toPaidCount, setPaidCount] = useState(0);
  const [expo_token, setExpoToken] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      await getCustInfo();
      await getAsyncData();
      getEndPoint();
    };

    fetchData();

    const backAction = () => {
      // Navigate to the desired route here
      navigation.navigate("HomeScreen");
      return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  getEndPoint = async () => {
    axios
      .get("https://news.mm-link.net/api/setting_url")
      .then((response) => {
        if (response.data.data.url !== null) {
          var myendpoint = response.data.data.url;
          var is_show_hide = response.data.data.is_show_register;

          AsyncStorage.multiSet(
            [
              ["endpoint", myendpoint],
              ["show_hide", is_show_hide.toString()],
            ],
            (err) => {
              if (err) {
                alert("Asynstorage Error");
              }
            }
          );
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // const res = await getLang();
    // setLocale(res);
  };

  getAsyncData = async () => {
    setCustName(await AsyncStorage.getItem("user_name"));
  };
  getCustInfo = async () => {
    customerInfoApi;
    const url =
      customerInfoApi +
      (await AsyncStorage.getItem("cusId")) +
      "/" +
      GetUUID.uuid();
    var tsh_name = await AsyncStorage.getItem("township_name");

    setLoading(true);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + (await AsyncStorage.getItem("access_token")),
        },
      })
      .then((response) => {
        setLoading(false);
        setInternetPlan(response.data.sites[0].internetPlan.name);
        var info_data = response.data.sites;
        setTownship({
          value: info_data[0].siteCode,
          label: info_data[0].address,
        });
        setSiteCode(info_data[0].siteCode);
        let info_arr = [];
        info_data.map((data, index) => {
          var obj = {
            site_code: data.siteCode,
            expire_date: data.expireDate
              ? Moment(data.expireDate).format("DD-MM-Y")
              : null,
            township: tsh_name,
          };
          info_arr.push(obj);
        });

        let data = response.data.sites;
        setInstallLoc(response.data.sites[0]);
        let township_arr = [];
        data.map((data, index) => {
          var obj = {
            value: data.siteCode,
            label:
              data.address.length < 15
                ? `${data.address}`
                : `${data.address.substring(0, 15)}...`,
          };
          township_arr.push(obj);
        });

        var ticketarr = response.data.sites[0].tickets;
        var ticketcount = ticketarr.length;
        var solvedcount = 0;
        if (ticketcount > 0) {
          ticketarr.map((data, index) => {
            if (data.solved) {
              solvedcount = solvedcount + 1;
            }
          });
        }

        var paymentarr = response.data.sites[0].payment;
        var paymenarrlen = paymentarr.length;
        var totalamount = 0;
        if (paymenarrlen > 0) {
          paymentarr.map((data, index) => {
            if (data.paymentDate != null) {
              totalamount = totalamount + data.amount;
            }
          });
        }

        var ticketarr = response.data.sites[0].tickets;
        var ticketcount = ticketarr.length;
        var solvedcount = 0;
        var issuecount = 0;
        if (ticketcount > 0) {
          ticketarr.map((data, index) => {
            if (data.solved == true) {
              solvedcount = solvedcount + 1;
            } else {
              issuecount = issuecount + 1;
            }
          });
        }

        setTownships(township_arr);
        if (response.data.sites[0].expireDate == null) {
          setOpenExpireModal(false);
        } else {
          var msDiff =
            new Date(response.data.sites[0].expireDate).getTime() -
            new Date().getTime(); //Future date - current date
          var day_diff = Math.floor(msDiff / (1000 * 60 * 60 * 24));
          if (day_diff < 3) {
            setOpenExpireModal(true);
            setDiff(day_diff);
          }
        }

        setData(response.data);
        setInternetPlan(response.data.sites[0].internetPlan.name);
        setIssueCount(ticketcount);
        setSolvedCount(solvedcount);
        setPaymentTotal(totalamount);
        setCurrentPurchase(
          response.data.sites[0].internetPlan
            ? response.data.sites[0].internetPlan.name
            : ""
        );
        setCurrentPlan(response.data.sites[0].internetPlan);
        setPrice(
          response.data.sites[0].internetPlan
            ? response.data.sites[0].internetPlan.monthlyFee
            : "0"
        );
        setLabel(township_arr[0].label);
        setMaterialList(response.data.sites[0].materials);
        setPaymentList(response.data.sites[0].payment);
        setServiceType(
          response.data.sites[0].internetPlan
            ? response.data.sites[0].internetPlan.serviceType.stype
            : ""
        );
        setInstallDate(response.data.sites[0].installedDate);
        setUsedDay(response.data.sites[0].usedDay);
        setSiteId(response.data.sites[0].siteId);
        setExpireDate(response.data.sites[0].expireDate);
        setActualBandwidth(
          response.data.sites[0].internetPlan
            ? response.data.sites[0].internetPlan.actualBandwidth
            : ""
        );
        setIssue(issuecount);
        setSolved(solvedcount);
        setTicketArr(ticketarr);
        setPlanId(
          response.data.sites[0].internetPlan
            ? response.data.sites[0].internetPlan.planId
            : ""
        );
        setStatus(response.data.sites[0].status);
        setInstallLoc(response.data.sites[0]);
        setRefreshing(false);
        // self._storeToken(
        //   response.data.phone,
        //   response.data.name,
        //   self.state.expo_token,
        //   info_arr
        // );
        AsyncStorage.multiSet(
          [
            ["siteId", response.data.sites[0].siteId],
            ["siteCode", response.data.sites[0].siteCode],
            ["cust_phone", response.data.phone],
            [
              "zoneId",
              response.data.sites[0].zoneId != null
                ? response.data.sites[0].zoneId
                : "",
            ],
            [
              "serviceId",
              response.data.sites[0].internetPlan
                ? response.data.sites[0].internetPlan.serviceId
                : "",
            ],
          ],
          (err) => {
            if (err) {
              console.log("Asynstorage Error!");
            } else {
              navigation.navigate("FiberDashboard");
            }
          }
        );
      })
      .catch(async (error) => {
        console.log(error);
        if (error.response.status == 401) {
          await AsyncStorage.clear();
          setLoading(false);
          navigation.navigate("HomeScreen");
        }
      });
  };

  handleTownship = (item) => {
    setSiteCode(item.value);
    setTownship(item.value);
    setIsFocus(false);

    if (item.value) {
      var searchdata = this.searching(item.value);
      setTempData(searchdata);

      var paymentarr = tempData[0].payment;

      var paymenarrlen = paymentarr.length;
      // console.log(paymenarrlen);

      var totalamount = 0;
      if (paymenarrlen > 0) {
        paymentarr.map((data, index) => {
          if (data.paymentDate != null) {
            totalamount = totalamount + data.amount;
          }
        });
      }
      // console.log(this.state.tempData[0].tickets.length)
      var ticketarr = tempData[0].tickets;
      var ticketcount = ticketarr.length;
      // alert(this.state.tempData[0].expireDate);
      var solvedcount = 0;
      var issuecount = 0;
      if (ticketcount > 0) {
        ticketarr.map((data, index) => {
          // console.log(data)
          if (data.solved == true) {
            solvedcount = solvedcount + 1;
          } else {
            issuecount = issuecount + 1;
          }
        });
      }
      // AsyncStorage.removeItem("siteId");
      // AsyncStorage.removeItem("siteCode");
      AsyncStorage.multiSet(
        [
          ["siteId", tempData[0].siteId],
          ["siteCode", tempData[0].siteCode],
        ],
        (err) => {
          if (err) {
            // alert("Asynstorage Error");
            // ToastAndroid.show("Asynstorage Error!", ToastAndroid.SHORT);
            console.log("Asynstorage Error!");
          } else {
            // console.log("here");
            navigation.navigate("FiberDashboard");
          }
        }
      );
      // console.log("Hello",tempData[0].expireDate);
      if (tempData[0].expireDate == null) {
        setOpenExpireModal(false);
      } else {
        var msDiff =
          new Date(tempData[0].expireDate).getTime() - new Date().getTime(); //Future date - current date
        var day_diff = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        // console.log(day_diff);
        if (day_diff < 3) {
          self.setState({ isOpenExpireModal: true, diff: day_diff });
        } else {
          setOpenExpireModal(false);
        }
      }

      setTownship({ value: item.value, label: item.label });
      setSiteCode(item.value);
      setDate(tempData[0].installedDate);
      setUsedDay(tempData[0].usedDay);
      setMaterials(tempData[0].materials.length);
      setInternetPlan(
        tempData[0].internetPlan ? tempData[0].internetPlan.name : ""
      );
      setTotal(totalamount);
      setExpireDate(tempData[0].expireDate);
      setIssue(issuecount);
      setSolved(solvedcount);
      setMaterialList(tempData[0].materials);
      setPaymentList(tempData[0].payment);
      setServiceType(
        tempData[0].internetPlan
          ? tempData[0].internetPlan.serviceType.stype
          : ""
      );
      setSiteId(tempData[0].siteId);
      setActualBandwidth(
        tempData[0].internetPlan ? tempData[0].internetPlan.actualBandwidth : ""
      );
      setTicketArr(ticketarr);
      setPlanId(
        tempData[0].internetPlan ? tempData[0].internetPlan.planId : ""
      );
      setStatus(tempData[0].status);
    }
  };

  searching = (word) => {
    return data.sites.filter((site) => {
      const sitecode = site.siteCode != null ? site.siteCode : "";
      return sitecode.toLowerCase().includes(word.toLowerCase());
    });
  };

  _handleOnCloseModal = () => {
    navigation.navigate("PaymentNavigator", { screen: "UnPaid" });
    setOpenExpireModal(false);
  };

  navigate = (route_name, param) => {
    navigation.navigate(route_name, { data: param });
  };

  onRefresh = () => {
    setRefreshing(true);
    this.getCustInfo();
  };

  return isLoading ? (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <StatusBar hidden />
      <SafeAreaView style={{ backgroundColor: Colors.theme_color }} />
      <View style={styles.header_container}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image
            source={require("@icons/header/previous.png")}
            style={styles.backImg}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: Fonts.primary,
            fontSize: 18,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Fiber Internet
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FiberSetting", {
              data: data,
            })
          }
        >
          <Image
            source={require("@icons/header/setting.png")}
            style={styles.setting_icon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.view_container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh.bind(this)}
          />
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("@images/profile.png")}
            style={styles.profile_img}
          />
          <Text style={styles.user_text}>{cust_name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Dropdown
            style={[Styles.dropdown, { borderColor: "white" }]}
            selectedTextStyle={[Styles.selectedTextStyle, { color: "white" }]}
            search={false}
            data={townships}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={t("select_township")}
            value={township}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => handleTownship(item)}
            iconColor="white"
          />
          <View style={{ width: "49%", marginLeft: 10 }}>
            <Text
              style={{
                color: "white",
                fontFamily: Fonts.primary,
                fontSize: 16,
              }}
            >
              Site Code : {sitecode}
            </Text>
          </View>
        </View>
        {status == "s" ? (
          <View style={{ marginTop: 10 }}>
            <Text
              allowFontScaling={false}
              style={{
                color: "white",
                fontSize: 18,
                fontFamily: Fonts.primary,
                textAlign: "left",
              }}
            >
              လူကြီးမင်း၏ Site Code ကို ယာယီပိတ်သိမ်းထားပါသည်။ အသေးစိတ်သိရှိရန်
              mm-link Call Center သို့ ဆက်သွယ်မေးမြန်းနိုင်ပါတယ် ခင်ဗျာ...
            </Text>
            <TouchableOpacity
              onPress={() => this._handlePhoneCall("09789799799")}
              style={{ marginBottom: 10 }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: "white",
                  fontSize: 18,
                  fontFamily: Fonts.primary,
                  textAlign: "left",
                  marginTop: 10,
                  textDecorationLine: "underline",
                }}
              >
                Call Center: 09 789 799 799
              </Text>
            </TouchableOpacity>
          </View>
        ) : status == "n" ? (
          <Text
            allowFontScaling={false}
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: Fonts.primary,
              textAlign: "justify",
              paddingTop: 10,
            }}
          >
            လူကြီးမင်း၏ site code သည် mm-link တွင်
            တပ်ဆင်အသုံးပြုခြင်းမရှိတော့ပါခင်ဗျာ..
          </Text>
        ) : (
          <View>
            <ExpireAlert
              isOpen={isOpenExpireModal}
              onClose={() => this._handleOnCloseModal()}
              expiredate={expiredate}
              diff={diff}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <CardView
                icon_name="date_icon"
                icon_width={50}
                icon_height={50}
                header={t("install_date")}
                label={Moment(installDate).format("DD/MM/YYYY")}
              />
              <CardView
                icon_name="calendar"
                icon_width={50}
                icon_height={50}
                header={t("total_using")}
                label={ChangeDateFormat(usedDay)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <CardView
                icon_name="material"
                icon_width={50}
                icon_height={50}
                header={t("materials")}
                label={materialList.length}
                onPressBtn={() => this.navigate("MaterialList", materialList)}
              />
              <CardView
                icon_name="internetPlan"
                icon_width={50}
                icon_height={50}
                header={t("internet_plan")}
                label={internetplan}
                type="internet_plan"
                onPressBtn={() =>
                  navigation.navigate("PlanUpDown", {
                    currentPlan: currentPlan,
                    planId: planId,
                    siteId: siteId,
                    data: data,
                  })
                }
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <CardView
                icon_name="payment"
                icon_width={50}
                icon_height={50}
                header={t("payment_history")}
                label={total ? commaString(total) : commaString(paymentotal)}
                onPressBtn={() =>
                  navigation.navigate("PaymentNavigator", {
                    data: paymentList,
                    total: paymentotal
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    backRoute: "Dashboard",
                  })
                }
              />
              <CardView
                icon_name="expire_date"
                icon_width={40}
                icon_height={40}
                header={t("expire_date")}
                label={
                  expiredate ? Moment(expiredate).format("DD-MM-YYYY") : "-"
                }
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <CardView
                icon_name="serviceTicket"
                icon_width={50}
                icon_height={50}
                header={t("service_ticket")}
                type="ticket"
                issue_count={issue_count}
                solved_count={solved_count}
                onPressBtn={() =>
                  navigation.navigate("TicketNavigator", {
                    data: ticketArr,
                    site_code: sitecode ? sitecode : data.sites[0].siteCode,
                  })
                }
              />
              <CardView
                icon_name="onlinePayment"
                icon_width={50}
                icon_height={50}
                header={t("online_payment")}
                type="bank"
                onPressBtn={() => navigation.navigate("BankAccountList")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <CardView
                icon_name="bell"
                icon_width={30}
                icon_height={30}
                header={t("notification")}
                onPressBtn={() => navigation.navigate("NotiList")}
              />
              <CardView
                icon_name="chat"
                icon_width={30}
                icon_height={30}
                header={t("chat")}
                onPressBtn={() =>
                  navigation.navigate("LiveChat", {
                    cname: cName,
                    siteCode: sitecode ? sitecode : data.sites[0].siteCode,
                    cPh: cPh,
                    backRoute: "Dashboard",
                  })
                }
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <CardView
                icon_name="aggrement"
                icon_width={30}
                icon_height={30}
                header={t("aggrement")}
                onPressBtn={() => navigation.navigate("AggrementScreen")}
              />
              <CardView
                icon_name="speed"
                icon_width={30}
                icon_height={30}
                header={t("speed_test")}
                onPressBtn={() => navigation.navigate("SpeedTestScreen")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <CardView
                icon_name="reward"
                icon_width={40}
                icon_height={40}
                header={t("bonus_reward_list")}
                onPressBtn={() => navigation.navigate("RewardList")}
              />
              <CardView
                icon_name="history"
                icon_width={30}
                icon_height={30}
                header={t("hotspot_bonus_his")}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme_color,
  },
  header_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 30,
  },
  loadingView: {
    marginHorizontal: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  backImg: {
    width: 20,
    height: 20,
  },
  setting_icon: {
    width: 30,
    height: 30,
  },
  view_container: { flex: 1, paddingHorizontal: 10 },
  profile_img: { width: 60, height: 60 },
  user_text: {
    fontFamily: Fonts.primary,
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },

  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
export default FiberDashboard;
