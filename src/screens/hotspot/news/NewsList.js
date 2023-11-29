import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import axios from "axios";
//import color
import Colors from "@styles/Colors";
//import component
import TopupHeader from "@components/TopupHeader";
import NewsCard from "@components/NewsCard";

const NewsList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isEndReached, setEndReached] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    if (page === 1) {
      setLoading(true);
    }
    try {
      await axios
        .get(
          "https://news.mm-link.net/api/news?topup_type=topup&page=" + page,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          // console.log(response.data)
          setData((prevData) =>
            page === 1
              ? response.data.data.data
              : [...prevData, ...response.data.data.data]
          );
          setLoading(false);
        })
        .catch(function (err) {
          console.log("Channel List Error", err);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  clickNews = (data) => {
    navigation.navigate("NewsDetail", { data });
  };

  renderItem = ({ item }) => (
    <View>
      <NewsCard
        text={item.title}
        img={"https://news.mm-link.net/uploads/posts/" + item.detail_photo}
        OnPress={() => clickNews(item)}
      />
    </View>
  );

  renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  };

  handleLoadMore = () => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <View style={styles.container}>
      <TopupHeader
        backgroundColor={Colors.theme_color}
        headerText="News"
        onPressBack={() => navigation.navigate("HotspotDashboard")}
        showSetting={false}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll_container: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    width: "45%",
    aspectRatio: 1,
    margin: "2%",
    backgroundColor: "white",
    borderRadius: 8,
  },
  gridText: {
    color: "white",
    fontSize: 18,
  },
});
export default NewsList;
