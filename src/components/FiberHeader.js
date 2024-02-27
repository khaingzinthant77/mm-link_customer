import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  // ToastAndroid
} from "react-native";
import Fonts from "@styles/Fonts";
class FiberHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      cusId: null,
      data: [],
      locale: "EN",
    };
  }
  async componentDidMount() {}

  goRoute() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#337ab7",
          paddingTop: Platform.OS === "android" ? 25 : 0,
        }}
        forceInset={{ top: 0, horizontal: "never", bottom: "never" }}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: this.props.backgroundColor },
          ]}
        >
          <StatusBar hidden={false} />
          <TouchableOpacity
            onPress={() =>
              this.props.navigation
                ? this.props.navigation.goBack(null)
                : this.goRoute()
            }
          >
            <Image
              source={require("@icons/header/previous.png")}
              style={styles.backImg}
            />
          </TouchableOpacity>
          <Text allowFontScaling={false} style={styles.headerTextStyle}>
            {this.props.headerText}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
export default FiberHeader;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backImg: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
  headerTextStyle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginTop: 10,
    fontFamily: Fonts.primary,
  },
});
