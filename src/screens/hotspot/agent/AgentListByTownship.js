import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Linking,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import api url
import { tshAgentApi } from "@apis/TopupApis";
//import styles
import Styles from "@styles/Styles";
import Colors from "@styles/Colors";
import Fonts from "@styles/Fonts";
//import component
import TopupHeader from "@components/TopupHeader";
import { useRoute } from "@react-navigation/native";

const handleCall = (phone) => {
  let phoneNumber = "";
  if (Platform.OS === "android") {
    phoneNumber = `tel:${phone}`;
  } else {
    phoneNumber = `telprompt:${phone}`;
  }
  Linking.openURL(phoneNumber);
};
const AgentListByTownship = ({ navigation }) => {
  const route = useRoute();
  var tsh_name = route.params.tsh_name;
  const [agents, setAgents] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [img_url, setImgUrl] = useState(null);

  // tshAgentApi
  useEffect(() => {
    fetchData();

    const backAction = () => {
      navigation.navigate("AgentTownship");
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  handleRefresh = () => {
    setRefreshing(false);
    setAgents([]);
    fetchData();
  };
  fetchData = async () => {
    var topupEndPoint = await AsyncStorage.getItem("endpoint");

    setImgUrl(topupEndPoint + "/uploads/reseller_photos/");

    var url = topupEndPoint + tshAgentApi;
    console.log(url);
    let param = {
      township: tsh_name,
    };
    setLoading(true);
    axios
      .post(url, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status == 1) {
          setLoading(false);
          setAgents(response.data.agents);
        } else {
          setLoading(false);
          alert(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  renderView = (item) => {
    return (
      <TouchableOpacity
        style={[styles.card_container, Styles.box_shadow]}
        onPress={() =>
          navigation.navigate("AgentDetail", { tsh_name: tsh_name, data: item })
        }
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={Styles.box_shadow}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors.theme_color}
                style={{ padding: 10 }}
              />
            ) : item.photo ? (
              <Image
                source={{ uri: img_url + item.photo }}
                style={{ width: 100, height: 100 }}
                onLoad={() => setLoading(false)} // Image has loaded
                onLoadEnd={() => setLoading(false)}
              />
            ) : (
              <Image
                source={require("@icons/hotspot/agent/store.png")}
                style={{ width: 100, height: 100 }}
                onLoad={() => setLoading(false)} // Image has loaded
                onLoadEnd={() => setLoading(false)}
              />
            )}
          </View>

          <View style={{ marginLeft: 15, marginTop: 5 }}>
            <Text style={styles.label_style}>{item.business_name}</Text>
            <TouchableOpacity
              style={styles.phone_container}
              onPress={() => handleCall(item.business_phone)}
            >
              <Image
                source={require("@icons/hotspot/agent/call.png")}
                style={{ width: 15, height: 15 }}
              />
              <Text style={styles.phone_text}>{item.business_phone}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 5, right: 1 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AgentMap", {
                back_route: "AgentListByTownship",
                tsh_name: tsh_name,
                data: item,
                lat: item.lat,
                lng: item.lng,
              })
            }
          >
            <Image
              source={require("@icons/hotspot/agent/google-maps.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopupHeader
        backgroundColor="#337ab7"
        headerText={tsh_name}
        onPressBack={() => navigation.navigate("AgentTownship")}
        showSetting={false}
      />
      {isLoading ? (
        <ActivityIndicator size={"large"} color={Colors.theme_color} />
      ) : (
        <FlatList
          data={agents}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderView(item)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card_container: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: Colors.theme_color,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  phone_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  label_style: {
    fontFamily: Fonts.primary,
    fontWeight: "bold",
    textAlign: "left",
  },
  phone_text: {
    marginLeft: 5,
    fontFamily: Fonts.primary,
    marginTop: 5,
  },
});

export default AgentListByTownship;
