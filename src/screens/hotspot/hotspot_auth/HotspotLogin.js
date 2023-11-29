import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
//import component
import TopupHeader from "@components/TopupHeader";
//import color
import Colors from "@styles/Colors";

const HotspotLogin = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [isNetworkError, setNetworkError] = useState(false);
  const route = new useRoute();
  const user_name = route.params.username;
  const pwd = route.params.password;

  const inject_url = `
  document.getElementById('username').value = "${user_name}";
  document.getElementById('password').value = "${pwd}";
  document.getElementsByClassName('btn btn-success btn-lg btn-block')[0].click();
  true; // note: this is required, or you'll sometimes get silent failures
`;

  showLoading = () => {
    setLoading(true);
  };

  hideLoading = () => {
    setLoading(false);
  };

  handleNetworkError = (err) => {
    setNetworkError(true);
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor={Colors.theme_color}
        headerText="Hotspot Login"
        onPressBack={() => navigation.navigate("HotspotDashboard")}
        showSetting={false}
      />
      {isNetworkError ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={[styles.btnStyle, { marginRight: 20 }]}
            onPress={() => setNetworkError(false)}
          >
            <Text allowFontScaling={false} style={styles.btnText}>
              Network Error
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          ref={(webView) => (this.webView = webView)}
          onError={(error) => handleNetworkError(error)}
          onLoadStart={() => showLoading()}
          onLoad={() => hideLoading()}
          source={{ uri: "https://hs.mm-link.net/login" }}
          style={styles.webView}
          injectedJavaScript={inject_url}
          //For the Cache
          domStorageEnabled={true}
          cacheEnabled={true}
        />
      )}
      {isLoading && (
        <ActivityIndicator
          style={{
            flex: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
          size="large"
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  webView: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  btnStyle: {
    width: "35%",
    height: 42,
    backgroundColor: "#e7e9eb",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    color: "black",
  },
});
export default HotspotLogin;
