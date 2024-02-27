import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
//import component
import TopupHeader from "@components/TopupHeader";

const NearlyAgent = ({ navigation }) => {
  const route = useRoute();
  // var agent_lists = route.params.nearestAgentList;
  var near_agents = route.params.nearAgents;
  var lat = route.params.lat;
  var lng = route.params.lng;
  var tsh_name = route.params.tsh_name;

  onMarkerPressed = (location) => {
    navigation.navigate("AgentDetail", {
      data: location,
      tsh_name: location.township,
    });
  };

  // console.log(agent_lists);
  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor="#337ab7"
        headerText="Nearest Agent"
        onPressBack={() => navigation.goBack(null)}
        showSetting={false}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: lat != "" ? lat : 19.7546006, // Initial map center latitude
          longitude: lng != "" ? lng : 96.2032954, // Initial map center longitude
          latitudeDelta: 0.004757,
          longitudeDelta: 0.006866,
        }}
      >
        {near_agents.length > 0 ? (
          near_agents.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.lat ? parseFloat(location.lat) : 0, // Convert to float or set a default value
                longitude: location.lng ? parseFloat(location.lng) : 0, // Convert to float or set a default value
              }}
              title={location.name}
              onPress={() => onMarkerPressed(location)} // Removed "this" from onMarkerPressed
            >
              <Image
                source={require("@icons/hotspot/agent/marker.png")}
                style={{ width: 50, height: 60 }}
                resizeMode="contain"
              />
            </Marker>
          ))
        ) : (
          <Marker
            coordinate={{
              latitude: 19.0867,
              longitude: 98.423432,
            }}
            title=""
          >
            <Image
              source={require("@icons/hotspot/agent/marker.png")}
              style={{ width: 50, height: 60 }}
              resizeMode="contain"
            />
          </Marker>
        )}
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

export default NearlyAgent;
