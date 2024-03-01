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
import axios from "axios";
import FiberHeader from "@components/FiberHeader";
import Fonts from "@styles/Fonts";
import { NEWS_API_END_POINT } from "@env";
export default class NewsNotiDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.getNotiDetail();
  }

  getNotiDetail() {
    var self = this;
    console.log(
      `${NEWS_API_END_POINT}/noti_detail/${this.props.route.params.noti_id}`
    );
    axios
      .post(
        `${NEWS_API_END_POINT}/noti_detail/${this.props.route.params.noti_id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        //   console.log(response.data);
        self.setState({ data: response.data.data });
        // Process the response data here
      })
      .catch((error) => {
        console.log(error);
        // Handle error here
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="Noti Detail"
          onPress={() => this.props.navigation.navigate("NotiList")}
        />
        {this.state.data ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, paddingHorizontal: 10 }}
          >
            <View style={{ height: 200, alignItems: "center" }}>
              {this.state.data.feature_photo ? (
                <Image
                  source={{
                    uri:
                      "https://news.mm-link.net/uploads/posts/" +
                      this.state.data.detail_photo,
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
                style={{
                  fontWeight: "900",
                  fontFamily: Fonts.primary,
                  lineHeight: 25,
                }}
              >
                {this.state.data.title}
              </Text>

              <Text style={{ fontFamily: Fonts.primary, lineHeight: 25 }}>
                {this.state.data.detail_description}
              </Text>
            </View>
          </ScrollView>
        ) : null}
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
