import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  BackHandler,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Card, Text } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment";
//import font
import Fonts from "@styles/Fonts";
//import vector icon
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import api
import { pointHistoryApi } from "@apis/TopupApis";
const PointHistory = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  fetchData = async () => {
    const tusername = await AsyncStorage.getItem("tusername");
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var historyApi = topupEndPoint + pointHistoryApi;
    let param = {
      phone: tusername,
    };
    setLoading(true);
    axios
      .post(historyApi, param)
      .then(function (response) {
        setLoading(false);
        setData(response.data);
        setRefreshing(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setRefreshing(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {refreshing ? (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#1179C2" />
        </View>
      ) : null}
      {isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#1179C2" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {data.length > 0 ? (
            <View style={{ marginBottom: 10 }}>
              <ScrollView
                style={{ paddingHorizontal: 10 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ marginTop: 10 }}>
                  {data.map((data, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={() =>
                          this.props.navigation.navigate("DataToupDetail", {
                            topup_data: data,
                            topup_type: "topup",
                            back_route: "PointNavigator",
                          })
                        }
                      >
                        <Card style={styles.card_container}>
                          <View style={styles.award_container}>
                            <Text style={styles.award_text}>Award</Text>
                          </View>

                          <View style={card_content_container}>
                            <MaterialCommunityIcons
                              name="crown-circle-outline"
                              size={35}
                              color="#fc5e03"
                            />
                            <Card.Content style={{ height: null }}>
                              <Text variant="titleMedium" style={content_text}>
                                Earn Point
                              </Text>
                              {data.g_ph != null ? (
                                <Text
                                  variant="bodyMedium"
                                  numberOfLines={3}
                                  style={{
                                    fontFamily: Fonts.primary,
                                    paddingHorizontal: 10,
                                  }}
                                >
                                  {"You have earned " +
                                    data.bonus_point +
                                    " points from transaction Topup to " +
                                    data.g_ph +
                                    " at " +
                                    Moment(data.created_at).format(
                                      "DD/MM/Y hh:mm:ss A"
                                    )}
                                </Text>
                              ) : (
                                <Text
                                  variant="bodyMedium"
                                  numberOfLines={3}
                                  style={{
                                    fontFamily: Fonts.primary,
                                    paddingHorizontal: 10,
                                  }}
                                >
                                  {"You have earned " +
                                    data.bonus_point +
                                    " points from transaction Topup to your account at " +
                                    Moment(data.created_at).format(
                                      "DD/MM/Y hh:mm:ss A"
                                    )}
                                </Text>
                              )}
                            </Card.Content>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 17, fontFamily: Fonts.primary }}>
                No Point{" "}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
  },
  card_container: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
  },
  award_container: {
    backgroundColor: "green",
    width: "20%",
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    position: "absolute",
    right: 0,
    alignItems: "center",
  },
  award_text: {
    color: "white",
    fontFamily: Fonts.primary,
  },
  card_content_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  content_text: {
    fontFamily: Fonts.primary,
    paddingLeft: 10,
  },
});
export default PointHistory;
