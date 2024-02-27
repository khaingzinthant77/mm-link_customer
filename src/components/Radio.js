import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
export default class Radio extends React.Component {
  setToggle() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  render() {
    // alert(this.props.active);
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setToggle()}
          activeOpacity={0.8}
          style={[
            styles.card,
            this.props.active
              ? { borderColor: "#0079b3" }
              : { borderColor: "#D7DADB" },
            { width: Dimensions.get("window").width / 4 },
          ]}
        >
          {this.props.img != "" ? (
            <Image source={{ uri: this.props.img }} style={{ height: 80 }} />
          ) : (
            <View
              style={{
                height: 80,
                backgroundColor: this.props.bgColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text allowFontScaling={false}>{this.props.internetPlan}</Text>
              <Text allowFontScaling={false}>{this.props.monthlyFee}Ks</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
  },
  card: {
    padding: 2,
    margin: 4,
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: "solid",
  },
  largeCirle: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderColor: "#999",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCirle: {
    width: 8,
    height: 8,
    borderRadius: 10,
    // backgroundColor: "#2398E7",
  },
  label: {
    marginLeft: 10,
    color: "black",
  },
});
