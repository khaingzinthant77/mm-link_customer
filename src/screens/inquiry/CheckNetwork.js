import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
//import component
import InquiryModal from "@components/InquiryModal";
//import url
import { getNearZoneApi } from "@apis/FiberApis";

export default class CheckNetwork extends React.Component {
  constructor(props) {
    super(props);
    this.BackHandler = null;
    this.state = {
      location: null,
      errorMessage: null,
      latitude: "",
      longitude: "",
      isOpenSuccessModel: false,
      tsCode: "",
    };
  }
  async componentDidMount() {
    this.BackHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    this.getLocationAsync();
  }
  handleBackPress = () => {
    this.props.navigation.navigate("HomeScreen");
    return true;
  };
  componentWillUnmount() {
    this.BackHandler.remove();
  }
  UNSAFE_componentWillMount() {
    this.getLocationAsync();
  }
  getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied",
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      this.setState({ latitude: location.coords.latitude });
      this.setState({ longitude: location.coords.longitude });
      // console.log(location);
      this.setState({ location });
    } catch (err) {
      this.setState({ errorMessage: err });
      // console.log("Error in getLocation", err);
    }
  };

  _checkNetworkAvailable = async () => {
    // console.log("hello");
    if (this.state.latitude == "" && this.state.longitude == "") {
      Alert.alert(
        "Alert ",
        "Your device location service is not avaialbe!",
        [
          {
            text: "Cancel",
            onPress: () => this.props.navigation.navigate("HomeScreen"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("HomeScreen"),
          },
        ],
        { cancelable: false }
      );
    } else {
      let latlong = { Lat: this.state.latitude, Lng: this.state.longitude };

      var self = this;
      self.setState({ isOpenSuccessModel: true });
      axios
        .post(getNearZoneApi, latlong, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          // console.log(response.config.data);
          if (response.data != null) {
            if (response.data.data.distance <= 300) {
              self.setState({
                isOpenSuccessModel: true,
                yesheader: "Congratulation...",
                yesbody: "Your location can use mm-link",
                croute: "InquiryCreate",
                tsCode: response.data.tS_Code,
              });
            } else {
              self.setState({
                isOpenSuccessModel: true,
                yesheader: "Sorry!!",
                yesbody:
                  "Your location can't use mm-link. If you wish you can submit inquiry.",
                croute: "InquiryCreate",
              });
            }
          } else {
            self.setState({
              isOpenSuccessModel: true,
              yesheader: "Sorry!!",
              yesbody:
                "Your location can't use mm-link. If you wish you can submit inquiry.",
              croute: "InquiryCreate",
            });
          }

          // console.log(response.status, response.data.token);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  handleModalContinue() {
    // console.log(this.state.latitude)
    this.setState({ isOpenSuccessModel: false });
    this.props.navigation.navigate(this.state.croute, {
      serviceType: this.state.serviceType,
      fheader: this.state.yesheader,
      sheader: this.state.yesbody,
      status: 1,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      tsCode: this.state.tsCode,
    });
  }
  _handleOnClose() {
    this.setState({ isOpenSuccessModel: false });
    this.props.navigation.navigate("HomeScreen");
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ height: 20, backgroundColor: "#fff" }}>
          <StatusBar hidden={false} />
        </SafeAreaView>
        <View style={styles.bar}>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("HomeScreen")}
            >
              <Image
                source={require("@icons/back1.png")}
                style={styles.imgPrevious}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Image
                source={require("@images/splash.png")}
                resizeMode="contain"
                style={{ width: 300, height: 35 }}
              ></Image>
            </View>
          </View>
        </View>
        {this.state.latitude != "" && this.state.latitude != "" ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: Number(this.state.latitude),
              longitude: Number(this.state.longitude),
              latitudeDelta: 0.004757,
              longitudeDelta: 0.006866,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(this.state.latitude),
                longitude: Number(this.state.longitude),
              }}
              onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={"Your Current Location"}
              description={
                "Check Current location is mm-link internet available"
              }
            />
          </MapView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ marginBottom: 10 }}>Getting your location</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.btn}
          onPress={() => this._checkNetworkAvailable()}
        >
          <Text allowFontScaling={false} style={styles.btnText}>
            Confirm
          </Text>
        </TouchableOpacity>
        <InquiryModal
          text={this.state.yesheader}
          text1={this.state.yesbody}
          isOpen={this.state.isOpenSuccessModel}
          onClose={this._handleOnClose.bind(this)}
          onPressYes={() => this.handleModalContinue()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgPrevious: {
    width: 25,
    height: 25,
    marginTop: 5,
    marginLeft: 1,
  },
  bar: {
    backgroundColor: "white",
    height: 70,
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
  btn: {
    backgroundColor: "#1570AE",
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
});
