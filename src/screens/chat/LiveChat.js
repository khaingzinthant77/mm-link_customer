import React from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import FiberHeader from "@components/FiberHeader";
export default class LiveChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      networkError: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  showLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  handleNetworkError() {
    this.setState({ networkError: true, loading: false });
  }

  render() {
    const customer =
      this.props.route.params.cname + "[ " + this.props.route.params.cPh + " ]";
    const sitecode = this.props.route.params.siteCode;
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="Live Chat"
          routeName="Dashboard"
          onPress={() => this.props.navigation.goBack(null)}
        />
        {this.state.networkError ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity
              style={[styles.btnStyle, { marginRight: 20 }]}
              onPress={() =>
                this.setState({ networkError: false }, () => {
                  this.webView && this.webView.reload();
                })
              }
            >
              <Text style={styles.btnText}>Network Error</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <WebView
            ref={(webView) => (this.webView = webView)}
            source={{
              uri: `https://secure.livechatinc.com/licence/12992760/v2/open_chat.cgi?name=${
                customer ? customer : "Customer"
              }&email=${sitecode ? sitecode : ""}`,
            }}
            javaScriptEnabled={true}
            //For the Cache
            domStorageEnabled={true}
            cacheEnabled={true}
            onNavigationStateChange={(navState) => {
              // Keep track of going back navigation within component
              this.setState({
                canGoBack: navState.canGoBack,
              });
            }}
            onError={(error) => this.handleNetworkError()}
            onLoadStart={() => this.showLoading()}
            onLoad={() => this.hideLoading()}
          />
        )}
        {this.state.loading && (
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
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
