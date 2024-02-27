import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import Font from "@styles/Fonts";
import Styles from "@styles/Styles";
//import icon
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
//import component
import TopupHeader from "@components/TopupHeader";
//import color
import Colors from "@styles/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgentDetail = ({ navigation }) => {
  const route = useRoute();
  tsh_name = route.params.tsh_name;
  prop_data = route.params.data;

  const [img_url, setImgUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    //
    const backAction = () => {
      navigation.goBack(null);
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  fetchData = async () => {
    var endPoint = await AsyncStorage.getItem("endpoint");
    var url = endPoint + "/uploads/reseller_photos/";
    // console.log(url);
    setImgUrl(url);
  };

  handle_call = (phone) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor="#337ab7"
        headerText="Agent Information"
        onPressBack={() => navigation.goBack(null)}
        showSetting={false}
      />
      <View style={{ paddingHorizontal: 10 }}>
        {isLoading ? (
          <View style={[Styles.box_shadow, { height: 200 }]}>
            <ActivityIndicator size={"large"} color={Colors.theme_color} />
          </View>
        ) : (
          <Image
            // source={require("@icons/hotspot/agent_icon/shop.jpeg")}
            source={{ uri: img_url + prop_data.photo }}
            style={{
              height: 200,
              marginTop: 10,
              borderRadius: 10,
              // borderWidth: 0.5,
            }}
          />
        )}

        <Text
          style={{
            fontFamily: Font.primaryBold,
            marginTop: 10,
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          {prop_data.business_name}
        </Text>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
          onPress={() => handle_call("09975446527")}
        >
          <Feather name="phone-call" size={20} color={Colors.theme_color} />
          <Text
            style={{ marginLeft: 10, fontFamily: Font.primary, fontSize: 16 }}
          >
            {prop_data.business_phone}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", flex: 1, width: "100%" }}>
            <Entypo name="location" size={20} color={Colors.theme_color} />
            <Text
              style={{
                textAlign: "justify",
                fontFamily: Font.primary,
                width: "70%",
                marginLeft: 10,
                fontSize: 16,
              }}
              numberOfLines={3}
            >
              {prop_data.address}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={() =>
              navigation.navigate("AgentMap", {
                tsh_name: tsh_name,
                back_route: "AgentDetail",
                data: prop_data,
                lat: prop_data.lat,
                lng: prop_data.lng,
              })
            }
          >
            <Text style={{ fontFamily: Font.primary, marginRight: 5 }}>
              Navigation
            </Text>
            <FontAwesome
              name="location-arrow"
              color={Colors.theme_color}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={[
            {
              height: 200,
              marginTop: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "lightgray",
              elevation: 5,

              shadowOffset: { width: 0, height: 2 }, //IOS
              shadowOpacity: 0.5,
            },
          ]}
          initialRegion={{
            latitude: prop_data ? parseFloat(prop_data.lat) : 19.7546006,
            longitude: prop_data ? parseFloat(prop_data.lng) : 96.2032954,
            latitudeDelta: 0.004757,
            longitudeDelta: 0.006866,
          }}
        >
          <Marker
            coordinate={{
              latitude: prop_data ? parseFloat(prop_data.lat) : 19.7546006,
              longitude: prop_data ? parseFloat(prop_data.lng) : 96.2032954,
            }}
            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={prop_data.business_name}
          >
            <Image
              source={require("@icons/hotspot/agent/marker.png")}
              style={{ width: 40, height: 50 }}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
  },
});
export default AgentDetail;
