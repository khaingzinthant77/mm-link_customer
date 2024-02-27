import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import FiberHeader from "@components/FiberHeader";
import Fonts from "@styles/Fonts";
export default class NotiDetail extends React.Component {
  render() {
    var data = this.props.route.params.data;
    const tempResult = data.detail_description.replace(/(<([^>]+)>)/gi, "");
    const secondresult = tempResult.replace(/((&nbsp;))*/gim, "");
    const result = secondresult.replace(/((&amp;))*/gim, "");
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="Noti Detail"
          onPress={() => this.props.navigation.goBack(null)}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingHorizontal: 10 }}
        >
          <View style={{ height: 200, alignItems: "center" }}>
            {data.feature_photo ? (
              <Image
                source={{
                  uri:
                    "https://news.mm-link.net/uploads/posts/" +
                    data.detail_photo,
                }}
                style={{
                  resizeMode: "contain",
                  width: "100%",
                  height: 200,
                  backgroundColor: "#e6e1d9",
                }}
              />
            ) : (
              <Image
                source={require("@images/news.png")}
                style={{
                  width: "100%",
                  height: 200,
                  backgroundColor: "#e6e1d9",
                }}
              />
            )}
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              allowFontScaling={false}
              style={{
                fontWeight: "900",
                fontFamily: Fonts.primary,
                lineHeight: 25,
              }}
            >
              {data.title}
            </Text>

            <Text
              allowFontScaling={false}
              style={{ fontFamily: Fonts.primary, lineHeight: 25 }}
            >
              {result}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal:10
    fontSize: Fonts.fontSizePrimary,
    fontFamily: Fonts.primary,
  },
});
