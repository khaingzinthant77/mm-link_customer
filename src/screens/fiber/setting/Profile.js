import React, { version } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  BackHandler,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Fonts from "@styles/Fonts";
import { initializeLocalization } from "@services/i18n";
import { withTranslation } from "react-i18next";
import FiberHeader from "@components/FiberHeader";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.BackHandler = null;
    this.state = {
      locale: "",
    };
  }
  componentDidMount = async () => {
    initializeLocalization();
    this.BackHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  };
  handleBackPress = () => {
    this.props.navigation.navigate("Setting");
    return true;
  };
  componentWillUnmount() {
    this.BackHandler.remove();
  }
  // navigate(routeName) {
  //   this.props.navigation.navigate(routeName);
  // }

  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText={t("profile")}
          onPress={() => this.props.navigation.goBack(null)}
        />
        <ScrollView style={styles.secondContainer}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              source={require("@icons/profile.png")}
              style={{ width: 100, height: 100 }}
            ></Image>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.formContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("loginId", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.inputText}>
                {this.props.route.params.data.phone}
              </Text>
            </View>

            <View style={styles.formContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("name", this.state.locale)}
              </Text>
              <TextInput
                style={styles.inputText}
                // value={this.props.route.params.data.name}
                editable={false}
                allowFontScaling={false}
              >
                <Text allowFontScaling={false}>
                  {this.props.route.params.data.name}
                </Text>
              </TextInput>
            </View>

            <View style={styles.formContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("nrc", this.state.locale)}
              </Text>
              <TextInput
                style={styles.inputText}
                // value={this.props.route.params.data.name}
                editable={false}
              >
                <Text allowFontScaling={false}>
                  {this.props.route.params.data.nrc
                    ? this.props.route.params.data.nrc
                    : "-"}
                </Text>
              </TextInput>
            </View>

            <View style={styles.formContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("dob", this.state.locale)}
              </Text>
              <TextInput
                style={styles.inputText}
                // value={this.props.route.params.data.name}
                editable={false}
              >
                <Text allowFontScaling={false}>
                  {this.props.route.params.data.dob
                    ? this.props.route.params.data.dob
                    : "-"}
                </Text>
              </TextInput>
            </View>

            <View style={styles.formContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("phone", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.inputText}>
                {this.props.route.params.data.phone}
              </Text>
            </View>

            <View style={styles.formContainer}>
              <Text allowFontScaling={false} style={styles.label}>
                {t("email", this.state.locale)}
              </Text>
              <Text allowFontScaling={false} style={styles.inputText}>
                {this.props.route.params.data.email
                  ? this.props.route.params.data.email
                  : "-"}
              </Text>
            </View>

            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
                marginTop: 10,
              }}
            ></View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{ fontSize: 18, fontWeight: "bold" }}
              >
                {t("my_site", this.state.locale)}
              </Text>
            </View>
            <View style={[styles.tableContainer, { marginTop: 10 }]}>
              <View style={{ flex: 1, borderWidth: 0.7, padding: 6 }}>
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 18, fontWeight: "bold" }}
                >
                  {t("site_code", this.state.locale)}
                </Text>
              </View>
              <View style={{ flex: 1, borderWidth: 0.7, padding: 6 }}>
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 18, fontWeight: "bold" }}
                >
                  {t("address", this.state.locale)}
                </Text>
              </View>
            </View>
            {this.props.route.params.data.sites.map((site, index) => {
              return (
                <View style={styles.tableContainer} key={index}>
                  <View
                    style={{
                      flex: 1,
                      borderLeftWidth: 0.5,
                      borderBottomWidth: 0.7,
                      borderRightWidth: 0.5,
                      padding: 4,
                    }}
                  >
                    <Text allowFontScaling={false} style={{ fontSize: 14 }}>
                      {site.siteCode}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      borderLeftWidth: 0.5,
                      borderBottomWidth: 0.7,
                      borderRightWidth: 0.5,
                      padding: 4,
                    }}
                  >
                    <Text allowFontScaling={false} style={{ fontSize: 14 }}>
                      {site.address}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withTranslation()(Profile);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  secondContainer: {
    flex: 1,
    // backgroundColor: "red",
    paddingHorizontal: 20,
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  label: {
    fontSize: 15,
    color: "#575252",
    fontWeight: "bold",
    fontFamily: Fonts.primary,
  },
  inputText: {
    width: "60%",
    height: 20,
    paddingLeft: 10,
  },
  textArea: {
    minHeight: 130,
    textAlignVertical: "top",
    width: "60%",
    paddingLeft: 10,
  },
  previousBtn: {
    width: 25,
    height: 25,
  },
  map: {
    // marginTop:'10%',
    height: "100%",
    width: "100%",
    backgroundColor: "red",
  },
  tableContainer: {
    flex: 1,
    flexDirection: "row",
  },
});
