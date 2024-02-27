import React, { useEffect } from "react";
import { View, Text, StyleSheet, BackHandler, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import TopupHeader from "@components/TopupHeader";
const AgentMap = ({ navigation }) => {
  const route = useRoute();
  var back_route = route.params.back_route;
  var tsh_name = route.params.tsh_name;
  var lat = route.params.lat;
  var lng = route.params.lng;
  var data = route.params.data;

  useEffect(() => {
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
  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor="#337ab7"
        headerText={route.params.data.business_name}
        onPressBack={() => navigation.goBack(null)}
        showSetting={false}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: lat != null ? parseFloat(lat) : 19.7546006,
          longitude: lng != null ? parseFloat(lng) : 96.2032954,
          latitudeDelta: 0.004757,
          longitudeDelta: 0.006866,
        }}
      >
        <Marker
          coordinate={{
            latitude: lat != null ? parseFloat(lat) : 19.7546006,
            longitude: lng != null ? parseFloat(lng) : 96.2032954,
          }}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={data.business_name}
        >
          <Image
            source={require("@icons/hotspot/agent/marker.png")}
            style={{ width: 40, height: 50 }}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default AgentMap;
