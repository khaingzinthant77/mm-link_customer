import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
//immport api url
import { availableTshApi } from "@apis/TopupApis";
//import Font
import Fonts from "@styles/Fonts";
//import style
import Styles from "@styles/Styles";
import Colors from "@styles/Colors";
//import icon
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TopupHeader from "@components/TopupHeader";

const AvailableTownship = ({ navigation }) => {
  const [townships, setTownship] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [nearestAgents, setAgentLocations] = useState([]);
  const [nearAgents, setNearAgentLocations] = useState([]);

  useEffect(() => {
    getCurrentLocation();
    fetchData();

    const backAction = () => {
      navigation.navigate("HotspotDashboard");
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  handleRefresh = () => {
    setTownship([]);
    setRefreshing(false);
    fetchData();
  };
  fetchData = async () => {
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var url = topupEndPoint + availableTshApi;
    setLoading(true);
    axios
      .post(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status == 1) {
          setLoading(false);
          setTownship(response.data.townships);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLat(currentLocation.coords.latitude);
      setLng(currentLocation.coords.longitude);
      getNearestData(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
    } catch (error) {}
  };

  getNearestData = async (lat, lng) => {
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var url = topupEndPoint + "/api/get_nearest_agent";

    let param = {
      latitude: lat,
      longitude: lng,
    };

    setLoading(true);
    axios
      .post(url, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setLoading(false);
        var arr = [];
        var nearArr = [];
        response.data.agents.map((data, index) => {
          var obj = {
            name: data.business_name,
            latitude: data.lat,
            longitude: data.lng,
            photo: data.photo,
          };
          arr.push(obj);
          nearArr.push(data);
        });
        setAgentLocations(arr);
        setNearAgentLocations(nearArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderView = (item) => {
    return (
      <TouchableOpacity
        style={[styles.card_container, Styles.box_shadow]}
        onPress={() => navigation.goBack(null)}
        key={item.id}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: Colors.theme_color,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="map-marked-alt" color={"white"} size={25} />
          </View>
          <View>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: Fonts.primary,
                fontSize: 16,
              }}
            >
              {item.township} ({item.count})
            </Text>
          </View>
        </View>
        <View>
          <Entypo name="chevron-small-right" size={30} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TopupHeader
        backgroundColor="#337ab7"
        headerText="Available Township"
        onPressBack={() => navigation.navigate("HotspotDashboard")}
        onPressNearMap={() =>
          navigation.navigate("NearlyAgent", {
            nearAgents: nearAgents,
            lat: 19.754772986862513,
            lng: 96.20322197082493,
          })
        }
        showSetting={false}
        showMap={true}
      />
      {isLoading ? (
        <ActivityIndicator size={"large"} color={Colors.theme_color} />
      ) : (
        <FlatList
          data={townships}
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
});
export default AvailableTownship;
