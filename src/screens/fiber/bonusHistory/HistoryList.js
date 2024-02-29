import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  BackHandler,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FiberHeader from "@components/FiberHeader";
import axios from "axios";
import Styles from "@styles/Styles";
import Colors from "@styles/Colors";
import { claimBonusList } from "@apis/FiberApis";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";

const HistoryList = ({ navigation }) => {
  const [year, setYear] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  });
  const [YEARS, SETYEARS] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [site, setSiteCode] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const getYear = () => {
    var max = new Date().getFullYear();
    var min = 2022;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push({ value: i.toString(), label: i.toString() });
    }
    SETYEARS(years);
  };

  const fetchData = async (selectedYear) => {
    try {
      const site = await AsyncStorage.getItem("siteCode");
      setSiteCode(site);

      const postData = {
        site_code: site,
        year: selectedYear,
      };
      setLoading(true);

      var topupEndPoint = await AsyncStorage.getItem("endpoint");
      var url = topupEndPoint + claimBonusList;

      const response = await axios.post(url, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      setRefreshing(false);
      setDataHistory(response.data.history);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchData(year.value); // Fetch data initially with the current year
    getYear();

    const backAction = () => {
      navigation.navigate("FiberDashboard");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(year.value); // Fetch data with the current selected year
  };

  const handleOnSelect = (item) => {
    setYear({ value: item.value, label: item.label });
    fetchData(item.value); // Fetch data with the selected year
    setIsFocus(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FiberHeader
        headerText="History List"
        onPress={() => navigation.goBack(null)}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 10 }}
      >
        <View style={{ marginTop: 10 }}>
          <Dropdown
            style={[Styles.dropdown]}
            selectedTextStyle={[Styles.selectedTextStyle]}
            search={false}
            data={YEARS}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={"Select Year..."}
            value={year}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => handleOnSelect(item)}
          />
        </View>

        {dataHistory.length > 0 ? (
          dataHistory.map((data, index) => (
            <View style={{ marginTop: 10 }} key={index}>
              <TouchableOpacity
                style={styles.box_shadow}
                onPress={() =>
                  navigation.navigate("HistoryDetail", {
                    bonus_data: data,
                    site_code: site,
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("@icons/gift.png")}
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                  />
                  <View style={{ marginLeft: 15, marginVertical: 5 }}>
                    <Text style={{ marginBottom: 5, fontSize: 16 }}>
                      {site}
                    </Text>
                    <Text style={{ color: "green", fontSize: 16 }}>
                      {data.data_quota} GB*
                    </Text>
                    <Text style={{ color: Colors.theme_color, fontSize: 15 }}>
                      Claim at{" "}
                      {moment(data.created_at).format("DD-MM-YYYY h:m A")}
                    </Text>
                  </View>
                </View>
                <Entypo
                  name="chevron-right"
                  size={30}
                  color={Colors.theme_color}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Text style={{ marginTop: "50%", fontSize: 18 }}>No Data...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  box_shadow: {
    flexDirection: "row",
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HistoryList;
