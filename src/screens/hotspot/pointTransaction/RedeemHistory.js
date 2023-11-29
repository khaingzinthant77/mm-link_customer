import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
  Text,
} from "react-native";
//import styles
import Fonts from "@styles/Fonts";
//import color
import Colors from "@styles/Colors";
//import library
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//import api
import { redeemHistoryApi } from "@apis/TopupApis";
const RedeemHistory = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  fetchData = async () => {
    const tusername = await AsyncStorage.getItem("tusername");
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var historyApi = topupEndPoint + redeemHistoryApi;
    let param = {
      phone: tusername,
    };
    setLoading(true);
    axios
      .post(historyApi, param)
      .then(function (response) {
        setLoading(false);
        setData(response.data.redeemHistory);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setRefreshing(false);
      });
  };
  onRefresh = () => {
    setRefreshing(false);
    fetchData();
  };
  return (
    <View style={{ flex: 1 }}>
      {refreshing ? (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#1179C2" />
        </View>
      ) : null}
      {data.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          style={{ flex: 1 }}
        >
          {data.map((data, index) => {
            return (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={styles.cardContainer}>
                  <View style={styles.redeem_text}>
                    <Text style={{ color: "white", fontFamily: Fonts.primary }}>
                      Redeem
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "40%" }}>
                      <Text style={styles.text}>Redeem Plan</Text>
                      <Text style={styles.text}>Redeem Points</Text>
                      <Text style={styles.text}>Redeem Date</Text>
                    </View>
                    <View>
                      <Text style={styles.text}>: {data.plan_name}</Text>
                      <Text style={[styles.text, { color: "red" }]}>
                        : - {data.redeem_point} Points
                      </Text>
                      <Text style={styles.text}>
                        : {Moment(data.created_at).format("DD-MM-Y hh:mm:ss A")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={[styles.seccontainer, { height: "100%" }]}>
          <Text
            allowFontScaling={false}
            style={{ fontFamily: Fonts.primary, fontSize: 17 }}
          >
            No Redeem
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
  },
  seccontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
  },
  cardContainer: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    elevation: 15,
    shadowColor: "rgba(0,0,0, 1)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
  },
  text: {
    paddingTop: 5,
    color: "#414040",
    fontFamily: Fonts.primary,
    fontSize: Fonts.fontSizePrimary,
  },
  redeem_text: {
    backgroundColor: "#337ab7",
    width: "20%",
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    position: "absolute",
    right: 0,
    alignItems: "center",
  },
});
export default RedeemHistory;
