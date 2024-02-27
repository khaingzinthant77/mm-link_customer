import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default class PurchaseCard extends React.Component {
  _handleRoute() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={() => this._handleRoute()}
      >
        <View style={styles.imgContainer}>
          <Image source={this.props.img} style={{ width: 70, height: 70 }} />
        </View>
        <View style={{ marginLeft: 5 }}>
          <View style={styles.textContainer}>
            <Image
              source={require("@icons/invoice.png")}
              style={styles.iconStyle}
            />
            <Text allowFontScaling={false} style={styles.textColor}>
              {this.props.invoiceNo}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Image
              source={require("@icons/invoice.png")}
              style={styles.iconStyle}
            />
            <Text allowFontScaling={false} style={styles.textColor}>
              {this.props.sitecode}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Image
              source={require("@icons/money-bill.png")}
              style={styles.iconStyle}
            />
            <Text allowFontScaling={false} style={styles.textColor}>
              {this.props.payment}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Image
              source={require("@icons/calender.png")}
              style={styles.iconStyle}
            />
            <Text allowFontScaling={false} style={styles.textColor}>
              {this.props.paymentDate}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // justifyContent: "space-between",
  },
  imgContainer: {
    width: 90,
    borderRightWidth: 0.5,
    borderRightColor: "gray",
    height: 80,
    // backgroundColor: "red",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
  textColor: {
    color: "gray",
  },
  iconStyle: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginRight: 10,
  },
});
