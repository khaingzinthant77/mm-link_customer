import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FiberHeader from "@components/FiberHeader";
//import style
import Styles from "@styles/Styles";
import Color from "@styles/Colors";
//import icon
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
//import api
import { bonus_history } from "@apis/FiberApis";
const RewardList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [gift_acc, setGiftAcc] = useState([]);
  const [site_code, setSiteCode] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const apiUrl = bonus_history;

  const fetchData = async () => {
    try {
      const site = await AsyncStorage.getItem("siteCode");
      setSiteCode(site);

      // Request payload for the POST request
      const postData = {
        site_code: site,
        is_claim: 0,
      };
      setLoading(true);
      // Make the POST request
      var topupEndPoint = await AsyncStorage.getItem("endpoint");
      var url = topupEndPoint + apiUrl;
      //   console.log(url);
      const response = await axios.post(url, postData, {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if needed
        },
      });
      setLoading(false);
      setData(response.data.bonus);
      setGiftAcc(response.data.gift_accounts);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log("API Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
    const backAction = () => {
      navigation.navigate("FiberDashboard");
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener when the component unmounts
  }, []);

  onRefresh = () => {
    setData([]);
    setLoading(false);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <FiberHeader
        backgroundColor="#337ab7"
        headerText="Reward List"
        onPress={() => navigation.goBack(null)}
      />
      {isLoading ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={Color.theme_color} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh.bind(this)}
            />
          }
        >
          {data.length > 0 ? (
            data.map((data_obj, index) => {
              return (
                <TouchableOpacity
                  style={[Styles.box_shadow, styles.box_container]}
                  onPress={() =>
                    navigation.navigate("RewardDetail", {
                      data: data_obj,
                      gift_account: gift_acc,
                    })
                  }
                  key={index}
                >
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FontAwesome
                        name="calendar"
                        color={Color.theme_color}
                        size={20}
                      />
                      <Text style={{ marginLeft: 10, fontSize: 16 }}>
                        {data_obj.received_at}
                      </Text>
                    </View>
                    <View style={styles.text_container}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialIcons
                          name="wifi-tethering"
                          color={Color.theme_color}
                          size={25}
                        />
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                          {data_obj.data_quota} GB
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Entypo
                    name="chevron-small-right"
                    color={Color.theme_color}
                    size={30}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ marginTop: "50%", fontSize: 18 }}>No Data...</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
});
export default RewardList;
