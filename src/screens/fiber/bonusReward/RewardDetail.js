import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, BackHandler } from "react-native";
import CardList from "@components/CardList";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { bonus_history } from "@apis/FiberApis";
import Color from "@styles/Colors";
import moment from "moment";
import FiberHeader from "@components/FiberHeader";
const RewardDetail = ({ navigation }) => {
  const route = useRoute();
  var data = route.params.data;
  // var gift_acc = route.params.gift_account;
  // console.log(data);

  const [initial_acc, setInitialAcc] = useState(5);
  const [acc_limit, setAccLimit] = useState(data.available_slots);
  const [available_accounts, setAvailableAcc] = useState([]);
  const [empty_arr, setEmptyArr] = useState([]);
  const [gift_acc, setGiftAcc] = useState([]);
  const [isLoading, setLoading] = useState(null);

  fetchData = async () => {
    try {
      const site = await AsyncStorage.getItem("siteCode");

      // Request payload for the POST request
      const postData = {
        site_code: site,
        is_claim: 0,
      };
      setLoading(true);
      // Make the POST request
      var topupEndPoint = await AsyncStorage.getItem("endpoint");
      var url = topupEndPoint + bonus_history;

      const response = await axios.post(url, postData, {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers if needed
        },
      });
      setLoading(false);
      setGiftAcc(response.data.gift_accounts);
      var gifts = response.data.gift_accounts;

      //get available account
      var arr = [];
      gifts.map((acc, index) => {
        var obj = { phone: acc.phone };
        arr.push(obj);
      });
      setAvailableAcc(arr);

      //get empty account
      var empty_acc =
        gifts.length == 0 ? initial_acc : initial_acc - gifts.length;
      // console.log(empty_acc)
      let emptyArr = [...Array(empty_acc)].map((data, index) => {
        return {
          phone: "Enter Phone Number",
          key: index + 1,
          acc_limit: acc_limit,
        };
      });

      setEmptyArr(emptyArr);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const backAction = () => {
      navigation.navigate("RewardList");
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [initial_acc, acc_limit]);

  useFocusEffect(
    React.useCallback(() => {
      // Your code to run when the screen gains focus
      fetchData();
      // You can perform any actions here, like fetching data, refreshing the screen, etc.

      return () => {
        // This function will run when the screen loses focus
        console.log("Screen lost focus");
        // You can perform cleanup here if needed.
      };
    }, [])
  );

  const onRefresh = async () => {
    setGiftAcc([]);
    setLoading(false);
    fetchData();
  };

  const goClaimHistory = () => {
    navigation.navigate("HotspotHistory");
  };

  const goResetPassword = (phone_number) => {
    navigation.navigate("HotspotResetPassword", {
      name: "hotspot_acc_add",
      fttx_user_id: data.fttx_user_id,
      gift_plan_id: data.gift_plan_id,
      expiration: moment(data.expiration).format("DD-MM-YYYY"),
      order: available_accounts.length + 1,
      phone: phone_number,
      data: data,
    });
  };

  const goUpdateReset = (phone_number, order_no) => {
    navigation.navigate("HotspotResetPassword", {
      name: "hotspot_acc_add",
      fttx_user_id: data.fttx_user_id,
      gift_plan_id: data.gift_plan_id,
      expiration: moment(data.expiration).format("DD-MM-YYYY"),
      order: order_no,
      phone: phone_number,
      data: data,
    });
  };

  return (
    <View style={{ flex: 1 }}>
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
        <CardList
          cards={available_accounts}
          empty_cards={empty_arr}
          acc_limit={acc_limit}
          data_length={available_accounts.length}
          expiration={data.expiration}
          site_code={data.site_code}
          month={data.month}
          quota={data.data_quota}
          fttx_user_id={data.fttx_user_id}
          gift_plan_id={data.gift_plan_id}
          data_bonus_id={data.data_bonus_id}
          is_loading={isLoading}
          handle_Refresh={onRefresh}
          handle_fetch={fetchData}
          navigateRoute={goClaimHistory}
          resetRoute={(phone) => goResetPassword(phone)}
          updateResetRoute={(phone, order_no) => goUpdateReset(phone, order_no)}
        />
      )}
    </View>
  );
};

export default RewardDetail;
