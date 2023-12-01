import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
//impor color
import Colors from "@styles/Colors";
//import font
import Fonts from "@styles/Fonts";
//import style
import Styles from "@styles/Styles";
//import library
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { ImageSlider } from "react-native-image-slider-banner";
import moment from "moment";
//import icon
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import component
import TopupHeader from "@components/TopupHeader";
import QRModal from "@components/QRModal";
//import api
import { newsApi, loginApi } from "@apis/TopupApis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HotspotDashboard = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [isOpenQR, setOpenQR] = useState(false);
  const [user_name, setUserName] = useState("");
  const [usrPh, setUsrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [balance, setBalance] = useState(0);
  const [data, setData] = useState([]);
  const [expiredate, setExpireDate] = useState(null);
  const [remain_point, setRemainPoint] = useState(null);
  const [is_show_hide, setShowHide] = useState(null);

  useEffect(() => {
    getSliderImg();
    getSetting();
    fetchData();
    getUserData = async () => {
      setUsrPhone(await AsyncStorage.getItem("tusername"));
      setPassword(await AsyncStorage.getItem("tpassword"));
    };

    getUserData();
  }, [user_name, balance]);

  fetchData = async () => {
    // await AsyncStorage.clear();
    var topupEndPoint = await AsyncStorage.getItem("endpoint");

    var loginApiurl = topupEndPoint + loginApi;

    var url = loginApiurl + "?username=" + usrPh + "&password=" + password;

    setLoading(true);

    axios
      .get(url)
      .then(async (response) => {
        setLoading(false);
        var datas = response.data.quota;

        if (datas >= 1000000000) {
          // alert("hello");
          datas = datas / (1024 * 1024 * 1024);
          // datas = Math.floor(datas);
          datas = datas.toFixed(2) + " GB";
          dbgColor = "#00e600";
          dbgWidth = 8;
        } else if (datas >= 1000000) {
          // alert("hello");
          datas = datas / (1024 * 1024);
          // datas = Math.floor(datas);
          datas = datas.toFixed(2) + " MB";
          dbgColor = "#00e600";
          dbgWidth = 8;
        } else if (datas < 0) {
          datas = "0 KB";
        }

        try {
          await AsyncStorage.setItem(
            "c_ph",
            response.data.mobile ? response.data.mobile : ""
          );
          await AsyncStorage.setItem(
            "usr_name",
            response.data.username ? response.data.username : ""
          );
        } catch (error) {
          console.log(error);
        }

        setPhoneNo(response.data.mobile);
        setBalance(Math.floor(response.data.credits));

        setData(datas);
        setExpireDate(response.data.expiration);
        setRemainPoint(response.data.remain_points);
        setUserName(response.data.username);
      })
      .catch((error) => {
        console.log("Dashboard Fetch Data", error);
      });
  };

  getSliderImg = () => {
    var newsApiUrl = "https://news.mm-link.net" + newsApi;
    axios
      .get(newsApiUrl)
      .then(function (response) {
        var image = "";
        var imgArr = [];
        var dataArr = response.data.data;
        dataArr.map((data, index) => {
          image = "https://news.mm-link.net/uploads/posts/" + data.detail_photo;
          imgArr.push({ img: image });
        });
        setImages(imgArr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getSetting = () => {
    axios
      .get("https://news.mm-link.net/api/setting_url")
      .then((response) => {
        if (response.data.data.url !== null) {
          var myendpoint = response.data.data.url;
          var is_show_hide = response.data.data.is_show_register;
          setShowHide(is_show_hide);
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
        console.log("Setting", error);
      });
  };

  onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  let bgWidth = 4;
  if (balance > 0) {
    bColor = "#ffd11a";
    bgWidth = 8;
  }
  const MAX_POINTS = 500;
  const fill = (remain_point / MAX_POINTS) * 100;

  go_hotspotLogin = async () => {
    navigation.navigate("HotspotLogin", {
      username: usrPh,
      password: password,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.theme_color} />
      <TopupHeader
        headerText="mm-link"
        onPressBack={() =>
          navigation.navigate("HomeScreen", { popup_status: true })
        }
        showSetting={true}
        onPressSetting={() => navigation.navigate("HotspotSetting")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh.bind(this)}
          />
        }
        style={{ flex: 1 }}
      >
        <View style={{ height: 200 }}>
          <ImageSlider
            data={images}
            autoPlay={true}
            closeIconColor="#fff"
            caroselImageStyle={{ resizeMode: "cover", height: 200 }}
            showIndicator={false}
          />
        </View>

        <View
          style={[
            styles.profile_container,
            Styles.box_shadow,
            { backgroundColor: Colors.primary },
          ]}
        >
          <View style={styles.row_container}>
            <View>
              <View style={styles.sub_row_container}>
                <FontAwesome
                  name="user-circle-o"
                  size={36}
                  style={{ marginRight: 10, marginTop: 1 }}
                  color={Colors.theme_color}
                />
              </View>

              <View style={styles.text_container}>
                <Text style={{ fontSize: 16 }}>
                  {user_name ? user_name : ""}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => setOpenQR(true)}>
                <View style={{ alignItems: "flex-end" }}>
                  <FontAwesome name="qrcode" size={50} />
                </View>
              </TouchableOpacity>
              <Text allowFontScaling={false} style={styles.expText}>
                Expire Date: {moment(expiredate).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        </View>
        {is_show_hide == 1 ? (
          <View
            style={[
              styles.secondContainer,
              Styles.box_shadow,
              {
                borderRadius: 10,
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <View style={styles.sec_row_container}>
              <AntDesign
                name="login"
                size={25}
                style={{ marginRight: 10 }}
                color="green"
              />
              <TouchableOpacity onPress={() => go_hotspotLogin()}>
                <Text allowFontScaling={false} style={styles.text_style}>
                  Hotspot Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.sec_row_container}>
              <AntDesign
                name="logout"
                size={25}
                style={{ marginRight: 10 }}
                color={Colors.theme_color}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("HotspotLogout")}
              >
                <Text
                  allowFontScaling={false}
                  style={[styles.text_style, { color: Colors.theme_color }]}
                >
                  Hotspot Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View
          style={[
            styles.secondContainer,
            Styles.box_shadow,
            { borderRadius: 10 },
          ]}
        >
          <TouchableOpacity
            style={styles.progressContainer}
            onPress={() =>
              navigation.navigate("Transfer", {
                username: usrPh,
              })
            }
          >
            <Text allowFontScaling={false} style={styles.progressText}>
              Data
            </Text>
            <AnimatedCircularProgress
              size={100}
              width={10}
              backgroundWidth={5}
              fill={fill}
              tintColor="#00ff00"
              tintColorSecondary="#ff0000"
              backgroundColor={data != 0 ? "#00e600" : "#808080"}
              arcSweepAngle={240}
              rotation={240}
              lineCap="round"
            >
              {(fill) => (
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.points,
                    { color: data > 0 ? Colors.theme_color : "#808080" },
                  ]}
                >
                  {data ? data : "0 KB"}
                </Text>
              )}
            </AnimatedCircularProgress>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("PointList", {
                remain_point: remain_point,
              })
            }
          >
            <Text allowFontScaling={false} style={styles.progressText}>
              Point
            </Text>
            <AnimatedCircularProgress
              size={100}
              width={10}
              backgroundWidth={bgWidth}
              fill={fill}
              tintColor="#00ff00"
              tintColorSecondary="#ff0000"
              backgroundColor={remain_point > 0 ? "#00e600" : "#808080"}
              arcSweepAngle={240}
              rotation={240}
              lineCap="round"
            >
              {(fill) => (
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.points,
                    {
                      color: remain_point > 0 ? Colors.theme_color : "#808080",
                    },
                  ]}
                >
                  {remain_point ? remain_point : 0}
                </Text>
              )}
            </AnimatedCircularProgress>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.cardinnerContainer, Styles.box_shadow]}
            onPress={() =>
              navigation.navigate("AvailableTownship", {
                username: user_name,
                password: password,
                phoneNo: usrPh,
              })
            }
            activeOpacity={0.8}
          >
            <View style={styles.card_row}>
              <Image
                source={require("@icons/hotspot/dashboard/store.png")}
                style={{ width: 45, height: 40 }}
              />

              <Text allowFontScaling={false} style={styles.cardText}>
                Nearly Agent
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardinnerContainer, Styles.box_shadow]}
            onPress={() =>
              navigation.navigate("BuyPackage", {
                username: usrPh,
                password: password,
              })
            }
            activeOpacity={0.8}
          >
            <View style={styles.card_row}>
              <Image
                source={require("@icons/hotspot/dashboard/buypackage.png")}
                style={{ width: 45, height: 40 }}
              />

              <Text allowFontScaling={false} style={styles.cardText}>
                Buy Package
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.cardinnerContainer, Styles.box_shadow]}
            onPress={() =>
              navigation.navigate("Usage", {
                username: usrPh,
                password: password,
              })
            }
            activeOpacity={0.8}
          >
            <Image
              source={require("@icons/hotspot/dashboard/usage-history.png")}
              style={{ width: 45, height: 40 }}
            />
            <Text allowFontScaling={false} style={styles.cardText}>
              Usage History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardinnerContainer, Styles.box_shadow]}
            onPress={() =>
              navigation.navigate("TopupHistoryList", {
                username: user_name,
                password: password,
              })
            }
            activeOpacity={0.8}
          >
            <Image
              source={require("@icons/hotspot/dashboard/topup-history.png")}
              style={{ width: 45, height: 40 }}
            />
            <Text allowFontScaling={false} style={styles.cardText}>
              Topup History
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.cardContainer, { marginBottom: 20 }]}>
          <TouchableOpacity
            style={[styles.cardinnerContainer, Styles.box_shadow]}
            onPress={() => navigation.navigate("NewsList")}
            activeOpacity={0.8}
          >
            <Image
              source={require("@icons/hotspot/dashboard/news.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text allowFontScaling={false} style={styles.cardText}>
              News
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardinnerContainer, Styles.box_shadow]}
            onPress={() => navigation.navigate("PointNavigator")}
            activeOpacity={0.8}
          >
            <Image
              source={require("@icons/hotspot/dashboard/transaction.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text allowFontScaling={false} style={styles.cardText}>
              Point Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <QRModal
        isOpen={isOpenQR}
        onClose={() => setOpenQR(false)}
        phone={usrPh}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile_container: {
    borderColor: "white",
    backgroundColor: "white",
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 10,
    justifyContent: "center",
  },
  row_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  sub_row_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  expText: {
    color: "red",
    fontFamily: Fonts.primary,
    fontSize: Fonts.fontSizePrimary,
  },
  expTextContainer: {
    alignItems: "center",
    fontWeight: "bold",
  },
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    padding: 10,
  },
  sec_row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text_style: {
    fontWeight: "bold",
    fontFamily: Fonts.primary,
    fontSize: Fonts.fontSizePrimary,
    color: "green",
  },
  divider: { width: 1, backgroundColor: "black", height: "100%" },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRightWidth: 1,
    borderColor: "gray",
  },
  progressText: {
    color: "#0079b3",
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: Fonts.primary,
    fontSize: Fonts.fontSizePrimary,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 8,
  },
  cardText: {
    marginTop: 5,
    fontWeight: "bold",
    fontFamily: Fonts.primary,
    fontSize: Fonts.fontSizePrimary,
  },
  cardinnerContainer: {
    borderWidth: 1,
    width: "48%",
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 5,
    // padding: 10,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  card_row: { justifyContent: "center", alignItems: "center" },
});
export default HotspotDashboard;
