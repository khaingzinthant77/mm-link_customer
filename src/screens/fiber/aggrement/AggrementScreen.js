import React from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  LogBox,
} from "react-native";
import { WebView } from "react-native-webview";
import FiberHeader from "@components/FiberHeader";
export default class AggrementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeLocale: "",
      mylang: "MM",
      current_locale: "MM",
      locale: null,
      isLoading: false,
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
    this.setState({ isLoading: true });
  }

  hideLoading() {
    this.setState({ isLoading: false });
  }

  handleNetworkError() {
    this.setState({ networkError: true, isLoading: false });
  }
  render() {
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="Aggrement"
          routeName="Dashboard"
          onPress={() => this.props.navigation.goBack()}
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
            onError={(error) => this.handleNetworkError()}
            onLoadStart={() => this.showLoading()}
            onLoad={() => this.hideLoading()}
            source={{ uri: "https://news.mm-link.net/contract" }}
            style={{ marginTop: 1 }}
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
          />
        )}
        {this.state.isLoading && (
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
