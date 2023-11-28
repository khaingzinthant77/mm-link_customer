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
  Image,
  TouchableOpacity,
} from "react-native";
import Moment from "moment";
//import styles
import Fonts from "@styles/Fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//import Localization
import { topupDataHistoryApi } from "@apis/TopupApis";

const TopupHistoryList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getDataList();
  }, []);

  getDataList = async () => {
    const tusername = await AsyncStorage.getItem("tusername");
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var topupHistoryUrl = topupEndPoint + topupDataHistoryApi;
    setLoading(true);
    let param = {
      phone: tusername,
    };
    axios
      .post(topupHistoryUrl, param)
      .then(function (response) {
        setLoading(false);
        setData(response.data);
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
    getDataList();
  };
  if (refreshing) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color="#1179C2" />
      </View>
    );
  }
  return isLoading ? (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color="#1179C2" />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
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
        {data.length == 0 ? (
          <View style={styles.seccontainer}>
            <Text allowFontScaling={false}>No Data</Text>
          </View>
        ) : (
          data.map((data, index) => {
            return (
              <View key={index}>
                {data.g_ph != null ? (
                  data.tranType == "received" ? (
                    <TouchableOpacity
                      key={index}
                      style={styles.cardContainer}
                      activeOpacity={0.8}
                      onPress={() =>
                        this.props.navigation.navigate("HistoryDetail", {
                          topup_data: data,
                          topup_type: "received",
                        })
                      }
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 5,
                        }}
                      >
                        <View>
                          <Image
                            source={require("@icons/hotspot/topup_history/award.png")}
                            style={{ width: 40, height: 40 }}
                          />
                        </View>
                        <View style={{ flex: 1, paddingHorizontal: 5 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={styles.textStyle}>Received</Text>
                            <Text
                              style={[styles.textStyle, { color: "#337ab7" }]}
                            >
                              + {data.plan_name}
                            </Text>
                          </View>
                          <View>
                            <Text style={[styles.textStyle, { color: "gray" }]}>
                              Received {data.plan_name} from {data.c_ph} at{" "}
                              {Moment(data.created_at).format(
                                "DD-MM-Y h:m:s A"
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={index}
                      style={styles.cardContainer}
                      activeOpacity={0.8}
                      onPress={() =>
                        this.props.navigation.navigate("DataToupDetail", {
                          topup_data: data,
                          topup_type: "gift",
                        })
                      }
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 5,
                        }}
                      >
                        <View>
                          <Image
                            source={require("@icons/hotspot/topup_history/money_transfer.png")}
                            style={{ width: 40, height: 40 }}
                          />
                        </View>
                        <View style={{ flex: 1, paddingHorizontal: 5 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={styles.textStyle}>Gift</Text>
                            <Text
                              style={[styles.textStyle, { color: "#337ab7" }]}
                            >
                              + {data.plan_name}
                            </Text>
                          </View>
                          <View>
                            <Text style={[styles.textStyle, { color: "gray" }]}>
                              Topup {data.plan_name} to {data.g_ph} at{" "}
                              {Moment(data.created_at).format(
                                "DD-MM-Y h:m:s A"
                              )}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    key={index}
                    style={styles.cardContainer}
                    activeOpacity={0.8}
                    onPress={() =>
                      this.props.navigation.navigate("DataToupDetail", {
                        topup_data: data,
                        topup_type: "topup",
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 5,
                      }}
                    >
                      <View>
                        <Image
                          source={require("@icons/hotspot/topup_history/buy_topup.png")}
                          style={{ width: 30, height: 40, marginRight: 10 }}
                        />
                      </View>
                      <View style={{ flex: 1, paddingHorizontal: 5 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.textStyle}>Topup</Text>
                          <Text style={{ color: "green", textAlign: "right" }}>
                            + {data.plan_name}
                          </Text>
                        </View>
                        <View>
                          <Text style={[styles.textStyle, { color: "gray" }]}>
                            {Moment(data.topup_date_time).format(
                              "DD MMM Y hh:mm:ss"
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seccontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    fontFamily: Fonts.primary,
  },
});
export default TopupHistoryList;
