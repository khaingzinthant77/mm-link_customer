import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  BackHandler,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import TopupHeader from "@components/TopupHeader";
//import font
import Fonts from "@styles/Fonts";
//import color
import Colors from "@styles/Colors";
//import icon
import FontAwesome from "react-native-vector-icons/FontAwesome";

const NewsDetail = ({ navigation }) => {
  const [news_data, setData] = useState(null);
  const [img_url, setImgUrl] = useState(null);
  const route = new useRoute();
  data = route.params.data;

  useEffect(() => {
    setData(data);
    setImgUrl(
      "https://news.mm-link.net/uploads/posts/" +
        route.params.data.feature_photo
    );
  }, [news_data, img_url]);
  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor={Colors.theme_color}
        headerText="News Detail"
        onPressBack={() => navigation.navigate("NewsList")}
        showSetting={false}
      />
      <ScrollView>
        <Image source={{ uri: img_url }} style={{ height: 200 }} />
        <View style={styles.date_container}>
          <FontAwesome name="calendar-check-o" size={25} />
          <Text style={{ marginLeft: 5, fontSize: 16 }}>
            {data ? data.publish_date : "-"}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontFamily: Fonts.primary }}>
            {data ? data.title : ""}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.description}>
            {data ? data.detail_description : ""}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  date_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    fontFamily: Fonts.primary,
    textAlign: "justify",
    marginBottom: 10,
  },
});
export default NewsDetail;
