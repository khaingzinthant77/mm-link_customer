import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { G, Path } from "react-native-svg";
import appjson from "@appjson";
import VersionCheck from "react-native-version-check-expo";

import { appstoreUrl, playstoreUrl } from "@apis/FiberApis";
import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";
//import component
import LanguageModal from "@components/LanguageModal";
import FiberHeader from "@components/FiberHeader";
import Fonts from "@styles/Fonts";
import i18next from "i18next";
import SvgIcon from "@images/SvgIcon";
class FiberSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpenLangModal: false,
      confirmLocaleModalOpen: false,
      changeLocale: "",
      mylang: "MM",
      current_locale: "MM",
      locale: null,
      isOpenErrorModal: false,
      mmCheck: false,
      enCheck: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = async () => {
    this.setState({
      data: this.props.route.params.datas
        ? this.props.route.params.datas
        : this.props.route.params.data,
    });
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    initializeLocalization();
  };
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

  _handleLogout() {
    // Works on both Android and iOS
    Alert.alert(
      "Logout",
      "Are you sure you want to Logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => this.redirctLogout() },
      ],
      { cancelable: false }
    );
  }

  redirctLogout = async () => {
    // AsyncStorage.clear();
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("token_type");
      await AsyncStorage.removeItem("user_id");
      await AsyncStorage.removeItem("user_name");
      await AsyncStorage.removeItem("user_level");
      await AsyncStorage.removeItem("cusId");
      await AsyncStorage.removeItem("cust_name");
      await AsyncStorage.removeItem("password");
    } catch (e) {
      // remove error
      console.log(e);
    }

    console.log("Done.");
    this.props.navigation.navigate("Home");
  };
  handleGetLocale(locale) {
    this.setState({
      isOpenLangModal: true,
      mylang: locale,
    });
  }
  _handleChangeLangMM = async () => {
    this.setState({ mmCheck: true, enCheck: false, isOpenLangModal: false });

    await AsyncStorage.setItem("language", "mm"); // Set language preference
    i18next.changeLanguage("mm");
  };
  _handleChangeLangEN = async () => {
    this.setState({ enCheck: true, mmCheck: false, isOpenLangModal: false });
    await AsyncStorage.setItem("language", "en"); // Set language preference
    i18next.changeLanguage("en");
  };
  _handleOnCloseLangModal() {
    this.setState({ isOpenLangModal: false });
  }

  checkUpdateNeeded = async () => {
    if (Platform.OS == "ios") {
      let checkupdate = await VersionCheck.needUpdate();
      if (checkupdate.isNeeded) {
        Alert.alert(
          "Update available!",
          "Version " + checkupdate.latestVersion + " is now available.",
          [
            {
              text: "Cancel",
              style: "default",
            },
            {
              text: "Update",
              onPress: () => Linking.openURL(appstoreUrl),
              style: "destructive",
            }, // open store if update is needed.
          ],
          { cancelable: false }
        );
      } else {
        Linking.openURL(appstoreUrl);
      }
    } else {
      Linking.openURL(playstoreUrl);
    }
  };
  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="setting"
          onPress={() => this.props.navigation.navigate("FiberDashboard")}
        />
        <View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("UserProfile", {
                data: this.state.data,
                backRoute: "Setting",
              })
            }
            style={styles.btn}
            activeOpacity={0.8}
          >
            <View style={styles.imgContainer}>
              <SvgIcon icon={"profile"} width={17} height={15} />
            </View>

            <Text allowFontScaling={false} style={styles.bodyText}>
              {t("profile", this.state.locale)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL("https://mm-link.net/about-us")}
            style={styles.btn}
            activeOpacity={0.8}
          >
            <View style={styles.imgContainer}>
              <SvgIcon icon={"about"} width={17} height={15} />
            </View>

            <Text allowFontScaling={false} style={styles.bodyText}>
              {t("about_us", this.state.locale)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Contact")}
            style={styles.btn}
            activeOpacity={0.8}
          >
            <View style={styles.imgContainer}>
              <SvgIcon icon={"contact"} width={17} height={15} />
            </View>

            <Text allowFontScaling={false} style={styles.bodyText}>
              {t("contact", this.state.locale)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.handleGetLocale(this.state.locale)}
            style={styles.btn}
          >
            <View style={styles.imgContainer}>
              <SvgIcon icon={"language"} width={15} height={15} />
            </View>

            <Text allowFontScaling={false} style={styles.bodyText}>
              {t("choose_language", this.state.locale)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Rating")}
            activeOpacity={0.8}
            style={styles.btn}
          >
            <View style={styles.imgContainer}>
              <SvgIcon icon={"rating"} width={17} height={15} />
            </View>

            <Text allowFontScaling={false} style={styles.bodyText}>
              {t("rating", this.state.locale)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.checkUpdateNeeded()}
            activeOpacity={0.8}
            style={styles.btn}
          >
            <View style={styles.imgContainer}>
              <SvgIcon icon={"version"} width={17} height={15} />
            </View>

            <Text allowFontScaling={false} style={styles.bodyText}>
              {t("version", this.state.locale)} {appjson.expo.version}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this._handleLogout()}
            style={styles.btn}
            activeOpacity={0.8}
          >
            <View style={styles.imgContainer}>
              <SvgIcon icon={"logout"} width={17} height={15} />
            </View>

            <Text allowFontScaling={false} style={styles.bodyText}>
              {t("logout", this.state.locale)}
            </Text>
          </TouchableOpacity>
        </View>
        <LanguageModal
          isOpen={this.state.isOpenLangModal}
          onClose={() => this._handleOnCloseLangModal()}
          changeLangMM={() => this._handleChangeLangMM()}
          changeLangEN={() => this._handleChangeLangEN()}
        />
      </View>
    );
  }
}
export default withTranslation()(FiberSetting);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  secondContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    margin: 5,
  },
  secondheader: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  img: {
    width: 20,
    height: 20,
  },
  text: {
    marginLeft: 10,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    color: "#1B1F21",
    fontFamily: Fonts.primary,
  },
  border: {
    borderBottomWidth: 0.5,
    elevation: 1,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#1B1F21",
  },
  footertext: {
    borderTopWidth: 0.5,
    textAlign: "center",
    borderStyle: "solid",
    marginTop: 10,
    paddingTop: 10,
    fontSize: 15,
    color: "#1B1F21",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  footerText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    color: "#1B1F21",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
    marginRight: 10,
    flex: 1,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    borderBottomColor: "#D7DADB",
    borderBottomWidth: 1,
  },
  bodyImg: {
    width: 40,
    height: 50,
    marginLeft: 10,
  },
  bodyText: {
    fontSize: 16,
    marginLeft: 20,
    fontFamily: Fonts.primary,
  },
  imgContainer: {
    backgroundColor: "#C0C0C0",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 18,
    marginBottom: 5,
    marginLeft: 5,
  },
});
