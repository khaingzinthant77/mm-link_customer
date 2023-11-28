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
//import apis
import { usageHistoryURL } from "@apis/TopupApis";
//import color
import Colors from "@styles/Colors";

const Usage = ({ navigation }) => {
  const route = useRoute();
  const [isLoading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const inject_url = `
      document.getElementById('username').value = "${route.params.username}";
      document.getElementById('password').value = "${route.params.password}";
      document.getElementsByClassName('btn btn-lg btn-primary btn-block')[0].click();
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const handleNetworkError = () => {
    setNetworkError(true);
    setLoading(false);
  };

  const showLoading = () => {
    setLoading(false);
  };

  const hideLoading = () => {
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor={Colors.theme_color}
        headerText={"Usage History"}
        onPressBack={() => navigation.navigate("HotspotDashboard")}
        showSetting={false}
      />
      {networkError ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity style={[styles.btnStyle, { marginRight: 20 }]}>
            <Text allowFontScaling={false} style={styles.btnText}>
              Data Not Found
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          ref={(webView) => (this.webView = webView)}
          incognito={true}
          source={{
            uri: usageHistoryURL,
          }}
          onMessage={(event) => {}}
          injectedJavaScript={inject_url}
          onError={(error) => handleNetworkError()}
          onLoadStart={() => showLoading()}
          onLoad={() => hideLoading()}
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
  loader: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Usage;
