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
//import component
import Colors from "@styles/Colors";
import { claimBonusList } from "@apis/FiberApis";
import moment from "moment";

const HistoryList = ({ navigation }) => {
  const [year, setYear] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  });
  const [YEARS, SETYEARS] = useState([]);
  const [data_history, setDataHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [site, setSiteCode] = useState(null);

  const getYear = () => {
    var max = new Date().getFullYear();
    var min = 2022;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push({ value: i.toString(), label: i.toString() });
    }
    SETYEARS(years);
  };

  const fetchData = async () => {
    try {
      const site = await AsyncStorage.getItem("siteCode");
      // console.log(site);
      setSiteCode(site);
      // Request payload for the POST request
      const postData = {
        site_code: site,
        year: year.value,
      };
      console.log(postData);
      setLoading(true);
      // Make the POST request
      var topupEndPoint = await AsyncStorage.getItem("endpoint");
      var url = topupEndPoint + claimBonusList;
      // console.log(url);
      const response = await axios.post(url, postData, {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if needed
        },
      });
      // console.log(response.data);
      setLoading(false);
      setDataHistory(response.data.history);
      // setGiftAcc(response.data.gift_accounts);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    getYear();

    const backAction = () => {
      navigation.navigate("Dashboard", { type: "fiber" });
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []); // Remove 'year' from the dependency array

  onRefresh = () => {
    setDataHistory([]);
    setLoading(false);
    fetchData();
  };

  const handleOnSelect = (value, label) => {
    setYear({ value, label });
    fetchData();
  };
  return (
    <View style={{ flex: 1 }}>
      <FiberHeader
        headerText="History List"
        onPress={() => navigation.goBack(null)}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh.bind(this)}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 10 }}
      >
        <View>
          {/* <Dropdown
          placeholder="Select Year..."
          value={year}
          options={YEARS}
          onSelect={handleOnSelect.bind(this)}
          widthContainer="100%"
        /> */}
        </View>

        {data_history.length > 0 ? (
          data_history.map((data, index) => {
            return (
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
            );
          })
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
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.5, //IOS
    marginTop: 5,
    // height: 70,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HistoryList;
