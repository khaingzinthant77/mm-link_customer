import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import SvgIcon from "@images/SvgIcon";

//import style
import Fonts from "@styles/Fonts";

const CardView = ({
  icon_name,
  icon_width,
  icon_height,
  header,
  label,
  type,
  issue_count,
  solved_count,
}) => {
  return (
    <TouchableOpacity style={styles.card_container} activeOpacity={0.8}>
      {label ? (
        <SvgIcon icon={icon_name} width={icon_width} height={icon_height} />
      ) : (
        <View style={{ justifyContent: "center" }}>
          <SvgIcon icon={icon_name} width={icon_width} height={icon_height} />
        </View>
      )}

      {label ? (
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontFamily: Fonts.primary }}>{header}</Text>
          <Text style={{ fontFamily: Fonts.primary, marginTop: 5 }}>
            {label}
          </Text>
        </View>
      ) : type == "bank" ? (
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontFamily: Fonts.primary }}>{header}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              source={require("@images/payment/KBZpayment.png")}
              style={{ width: 20, height: 20 }}
            />
            <Image
              source={require("@images/payment/AYApayment.png")}
              style={{ width: 25, height: 25 }}
            />
            <Image
              source={require("@images/payment/cb.jpg")}
              style={{ width: 25, height: 25 }}
            />
          </View>
        </View>
      ) : type == "ticket" ? (
        <View
          style={{
            justifyContent: "center",
            height: 50,
            alignItems: "flex-end",
          }}
        >
          <Text style={{ fontFamily: Fonts.primary }}>{header}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignItems: "flex-end",
                marginRight: 10,
                color: "red",
                fontFamily: Fonts.primary,
              }}
            >
              Issue
            </Text>
            <Text style={{ color: "red", fontFamily: Fonts.primary }}>
              {issue_count}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignItems: "flex-end",
                marginRight: 10,
                color: "green",
              }}
            >
              Solved
            </Text>
            <Text style={{ color: "green" }}>{solved_count}</Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            height: 50,
          }}
        >
          <Text style={{ fontFamily: Fonts.primary }}>{header}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default CardView;

const styles = StyleSheet.create({
  card_container: {
    backgroundColor: "white",
    width: "49%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
