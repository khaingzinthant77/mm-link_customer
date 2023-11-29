import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Fonts from "@styles/Fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class NewsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localBaseUrl: null,
    };
  }
  async componentDidMount() {
    var localBaseUrl = await AsyncStorage.getItem("endpoint");
    this.setState({ localBaseUrl });
  }
  _handleOnpress() {
    if (this.props.OnPress) {
      this.props.OnPress();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this._handleOnpress()}
        >
          <View style={styles.secondContainer}>
            {this.props.img ? (
              <Image
                source={{ uri: this.props.img }}
                style={styles.img}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("@icons/hotspot/news/mm-link-dash.png")}
                style={styles.img}
              />
            )}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderBottomRightRadius: 3,
                borderBottomLeftRadius: 3,
                backgroundColor: "black",
              }}
            >
              <Text style={styles.text}>{this.props.text}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  secondContainer: {
    elevation: 15,
    shadowColor: "rgba(0,0,0, 1)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS,
    backgroundColor: "white",
    margin: 5,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 3,
    height: 250,
  },
  text: {
    color: "white",
    width: "100%",
    textAlignVertical: "center",
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: Fonts.primary,
    fontSize: Fonts.fontSizePrimary,
  },
  img: {
    width: "100%",
    height: 200,
    paddingVertical: 10,
  },
});
