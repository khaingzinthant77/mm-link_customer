import React from "react";
import { View, StyleSheet, ScrollView, BackHandler, Text } from "react-native";
//import component
import Fonts from "@styles/Fonts";
//import Localization
import { withTranslation } from "react-i18next";
import { initializeLocalization } from "@services/i18n";
import { Dimensions } from "react-native";

class MaterialList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "",
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = async () => {
    this._isMounted = true;
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
    this.props.navigation.navigate("Dashboard", { type: "fiber" });
    return true;
  }

  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        {/* <Header
          backgroundColor="#337ab7"
          headerText="materials"
          routeName="Dashboard"
          onPress={() =>
            this.props.navigation.navigate("Dashboard", { type: "fiber" })
          }
        /> */}

        <View
          style={{
            marginTop: 10,
            height: 20,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              color: "#337ab5",
              fontFamily: Fonts.primary,
            }}
          >
            {t("item", this.state.locale)}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              color: "#337ab5",
              fontFamily: Fonts.primary,
            }}
          >
            {t("qty", this.state.locale)}
          </Text>
        </View>
        <View style={styles.tableContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.props.route.params.data.length > 0 ? (
              this.props.route.params.data.map((data, index) => {
                return (
                  <View key={index}>
                    {/* <ListCard
                      number={index + 1}
                      name={data.name}
                      qty={data.qty}
                      unit={data.unit}
                      serial={data.serial}
                    /> */}
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: Dimensions.get("window").height / 2 + 50,
                }}
              >
                <Text allowFontScaling={false}>No Data</Text>
              </View>
            )}
          </ScrollView>
          {this.props.route.params.data.length > 0 ? (
            <View
              style={{
                justifyContent: "flex-end",
                alignContent: "flex-end",
                marginBottom: 30,
                fontWeight: 500,
                paddingHorizontal: 10,
                fontSize: 18,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: "justify",
                  fontFamily: Fonts.primary,
                  fontSize: 16,
                  color: "orange",
                  marginBottom: 20,
                }}
              >
                mm-link မှ internet အသုံးပြုရန် လိုအပ်သော ပစ္စည့်းများ
                စာရင်းအတိုင်း ငှားရမ်းပေးထားခြင်းဖြစ်ပါသည်။ Internet
                သုံးစွဲခြင်းမပြုတော့ပါက ပြန်လည်သိမ်းဆည်းသွားပါမည်။
              </Text>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    );
  }
}
export default withTranslation()(MaterialList);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "16%",
    backgroundColor: "#45A806",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tableContainer: {
    flex: 1,
    marginTop: 15,
  },
  routerImg: {
    width: 33,
    height: 33,
    resizeMode: "contain",
  },
  headerText: {
    color: "white",
    fontSize: 16,
    marginLeft: 25,
    fontWeight: "bold",
  },
  headering: {
    height: 37,
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextHeaderText: {
    color: "#0757F5",
    fontSize: 14,
    fontWeight: "bold",
    paddingRight: 5,
    paddingLeft: 5,
  },
  bottom: {
    height: "15%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  bottomText: {
    fontSize: 18,
  },
  backImg: {
    width: 24,
    height: 17,
  },
});
