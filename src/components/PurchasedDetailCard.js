import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Fonts from "@styles/Fonts";

//import Localization
import { initializeLocalization } from "@services/i18n";
import { withTranslation } from "react-i18next";
class PurchasedDetailCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "",
    };
  }
  componentDidMount = async () => {
    initializeLocalization();
  };
  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        {this.props.status !== "payment" ? (
          <View style={styles.rowContainer}>
            <Text allowFontScaling={false} style={styles.labelStyle}>
              {t("actual_bandwidth", this.state.locale)}
            </Text>
            <Text allowFontScaling={false} style={styles.labelStyle}>
              {this.props.bandwidth} Mbps
            </Text>
          </View>
        ) : (
          <View></View>
        )}

        <View style={styles.rowContainer}>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {t("from_date", this.state.locale)}
          </Text>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {this.props.formDate}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {t("to_date", this.state.locale)}
          </Text>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {this.props.toDate}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {t("pay_type", this.state.locale)}
          </Text>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {this.props.purchaseType}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {t("price", this.state.locale)}
          </Text>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {this.props.price}Ks
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {t("qty", this.state.locale)}
          </Text>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {this.props.qty}
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {t("amt", this.state.locale)}
          </Text>
          <Text allowFontScaling={false} style={styles.labelStyle}>
            {this.props.amount}Ks
          </Text>
        </View>
      </View>
    );
  }
}
export default withTranslation()(PurchasedDetailCard);
const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: "#E4E4E4",
    // height: 195,
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    paddingHorizontal: 10,
    elevation: 3,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.5, //IOS
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelStyle: {
    color: "#707070",
    fontSize: 14,
    fontFamily: Fonts.primary,
  },
});
