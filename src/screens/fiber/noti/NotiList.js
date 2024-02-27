import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import FiberHeader from "@components/FiberHeader";
import axios from "axios";
import Fonts from "@styles/Fonts";
import { NEWS_API_END_POINT } from "@env";

export default class NotiList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isLoading: false,
      refreshing: false,
      isFooterLoading: false,
    };
    this.page = 1;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  async componentDidMount() {
    const self = this;
    this.setState({ isLoading: true }); // Start page loading
    this.getAllNoti(this.page);
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

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

  getAllNoti(page) {
    console.log(NEWS_API_END_POINT);
    // console.log(NEWS_API_END_POINT+"/news?page=" + page)
    const self = this; // *
    axios
      .get(NEWS_API_END_POINT + "/news?page=" + page)
      .then(function (response) {
        // console.log(response.data.data)
        self.setState({
          notifications: [
            ...self.state.notifications,
            ...response.data.data.data,
          ],
          refreshing: false,
          isLoading: false,
          isFooterLoading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
          isLoading: false,
          refreshing: false,
          isFooterLoading: false,
        });
      });
  }

  onRefresh = () => {
    this.setState({
      notifications: [],
      refreshing: true, // start top loading
    });
    this.page = 1;
    this.getAllNoti(this.page);
  };

  //retrieve More data
  handleLoadMore = () => {
    this.setState({ isFooterLoading: true }); // Start Footer loading
    this.page = this.page + 1; // increase page by 1
    this.getAllNoti(this.page); // method for API call
  };
  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={{
            flex: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      );
    }
    var { notifications } = this.state;
    var dataList = notifications;
    return (
      <View style={styles.container}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="notification"
          routeName="Dashboard"
          onPress={() => this.props.navigation.goBack(null)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={dataList}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={({ item }) => (
            <View style={{ marginTop: 10, fontFamily: Fonts.primar }}>
              <TouchableOpacity
                style={styles.notiCard}
                onPress={() =>
                  this.props.navigation.navigate("NotiDetail", { data: item })
                }
              >
                <View>
                  {item.feature_photo ? (
                    <Image
                      source={{
                        uri:
                          "https://news.mm-link.net/uploads/posts/" +
                          item.feature_photo,
                      }}
                      style={{ width: 80, height: 80 }}
                    />
                  ) : (
                    <Image
                      source={require("@images/news.png")}
                      style={{ width: 80, height: 80 }}
                    />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ justifyContent: "flex-end", width: "100%" }}>
                    <Text
                      allowFontScaling={false}
                      style={{ textAlign: "right", fontFamily: Fonts.primary }}
                    >
                      {item.publish_date}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontWeight: "bold",
                        lineHeight: 26,
                        fontFamily: Fonts.primary,
                      }}
                    >
                      {/* {item.title.length > 20
                        ? item.title.substring(0, 80) + "..."
                        : item.title} */}
                      {item.title}
                    </Text>
                    {/* <Text allowFontScaling={false}
                      style={{
                        textAlign: "justify",
                        fontFamily: Fonts.primary,
                      }}
                    >
                      {item.detail_description
                        ? item.detail_description.length > 10
                          ? item.detail_description
                              .replace(/(<([^>]+)>)/gi, "")
                              .substring(0, 30) + "..."
                          : item.detail_description.replace(/(<([^>]+)>)/gi, "")
                        : ""}
                    </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => this.handleLoadMore()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 5,
    // marginLeft:5,
    // marginRight:5,
    backgroundColor: "#E5E5E5",
    fontSize: Fonts.fontSizePrimary,
    fontFamily: Fonts.primary,
  },
  notiCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // height: 130,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.3, //IOS
    // backgroundColor:"red"
    fontSize: Fonts.fontSizePrimary,
    fontFamily: Fonts.primary,
  },
});
