import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  BackHandler,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button, Card } from "react-native-paper";
import Fonts from "@styles/Fonts";
import axios from "axios";
//import service
import { getItem } from "@services/Storage";
//import component
import RedeemModal from "@components/RedeemModal";
//import api
import { getPackageApi, redeemApi } from "@apis/TopupApis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PointList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [show_redeemModal, setRedeemModal] = useState(false);
  const [plan_id, setPlanId] = useState(null);
  const [point, setPoint] = useState(0);
  const [redeem_data, setRedeemData] = useState("");
  const [isLoading, setLoading] = useState(false);
  const route = new useRoute();

  useEffect(() => {
    getPlan();
  }, []);

  const getPlan = async () => {
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var getPackageApiUrl = topupEndPoint + getPackageApi;
    axios
      .get(getPackageApiUrl)
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  _redeemPoint = async () => {
    setRedeemModal(false);
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var redeemUrl = topupEndPoint + redeemApi;
    var param = {
      phone: await AsyncStorage.getItem("tusername"),
      planId: plan_id,
      payType: "point",
    };

    axios
      .post(redeemUrl, param)
      .then(function (response) {
        // console.log(response.data);
        setRedeemModal(false);
        if (response.data.status == 1) {
          Alert.alert("Message", response.data.message, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => self.go_route() },
          ]);
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (err) {
        alert("error");
        console.log(err);
      });
  };
  click_action = (bonus_point, data_name, data_id) => {
    setRedeemModal(true);
    setPoint(bonus_point);
    setRedeemData(data_name);
    setPlanId(data_id);
  };
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#1179C2" />
        </View>
      ) : (
        <View style={{ paddingHorizontal: 5, marginBottom: 10 }}>
          {data.map((data, index) => {
            return (
              <Card style={{ marginTop: 10 }} key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Card.Content>
                    <Text
                      variant="titleLarge"
                      style={{
                        fontSize: 18,
                        fontFamily: Fonts.primary,
                        marginBottom: 10,
                      }}
                    >
                      {data.name}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{ fontFamily: Fonts.primary }}
                    >
                      {data.bonus_point} Points
                    </Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      onPress={() =>
                        click_action(data.bonus_point, data.name, data.id)
                      }
                      textColor="#337ab7"
                    >
                      Redeem
                    </Button>
                  </Card.Actions>
                </View>
              </Card>
            );
          })}
        </View>
      )}

      <RedeemModal
        isOpen={show_redeemModal}
        onClose={() => setRedeemModal(false)}
        point={point}
        redeem_data={redeem_data}
        remain_point={route.params.remain_point}
        clickRedeem={() => _redeemPoint()}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    // marginTop: 10,
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PointList;
