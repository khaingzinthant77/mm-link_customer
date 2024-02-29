import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
//import font
import Fonts from "@styles/Fonts";
//import color
import Colors from "@styles/Colors";

export default class TopupHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: Colors.theme_color,
          paddingTop: Platform.OS === "android" ? 20 : 0,
        }}
        forceInset={{ top: 0, horizontal: "never", bottom: "never" }}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: this.props.backgroundColor },
          ]}
        >
          <StatusBar hidden={false} barStyle={"light-content"} />
          <TouchableOpacity
            onPress={() => this.props.onPressBack()}
            activeOpacity={0.8}
          >
            <Image
              source={require("@icons/header/previous.png")}
              style={styles.backImg}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false} style={styles.headerTextStyle}>
            {this.props.headerText}
          </Text>
          {this.props.showSetting ? (
            <TouchableOpacity onPress={() => this.props.onPressSetting()}>
              <Image
                source={require("@icons/header/setting.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          ) : null}

          {this.props.showMap ? (
            <TouchableOpacity onPress={() => this.props.onPressNearMap()}>
              <Image
                source={require("@icons/hotspot/agent/location.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 50,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  backImg: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
  headerTextStyle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginTop: 10,
    fontFamily: Fonts.primary,
    fontSize: Fonts.titlefontSize,
  },
});
