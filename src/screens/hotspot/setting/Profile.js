import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
//import vector icon
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import library
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//import component
import { Card, Button, TextInput } from "react-native-paper";
//import font
import Fonts from "@styles/Fonts";
//import color
import Colors from "@styles/Colors";
//import api
import { profileUpdateApi } from "@apis/TopupApis";
const Profile = ({ navigation }) => {
  const [usr_name, setUserName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [is_enable, setEnable] = useState(false);
  useEffect(() => {
    getAsyncData();
  }, []);
  getAsyncData = async () => {
    setUserName(await AsyncStorage.getItem("usr_name"));
    setPhone(await AsyncStorage.getItem("tusername"));
  };
  updateName = async () => {
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var updateUrl = topupEndPoint + profileUpdateApi;
    // console.log(updateUrl);
    let param = {
      username: usr_name,
      phone: phone,
    };
    // console.log(param);
    axios
      .post(updateUrl, param)
      .then(function (response) {
        // console.log("here", response.data);
        alert(response.data.message);
        setEnable(false);
      })
      .catch(function (error) {
        console.log(error);
        self.setState({ refreshing: false });
      });
  };
  clickEdit = () => {
    setEnable(!is_enable);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView backgroundColor={Colors.theme_color} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("HotspotSetting")}>
          <Image
            source={require("@icons/header/previous.png")}
            style={styles.backImg}
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <View style={styles.img_container}>
            <Image
              source={require("@icons/hotspot/setting/avator.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text
            style={{
              fontFamily: Fonts.primary,
              color: "white",
              fontSize: 17,
              marginBottom: 20,
            }}
          >
            {usr_name}
          </Text>
        </View>
      </View>
      <View style={styles.box_container}>
        {is_enable ? (
          <TextInput
            label="User Name"
            mode="outlined"
            value={usr_name}
            onChangeText={(text) => setUserName(text)}
            left={<TextInput.Icon icon="account" />}
            outlineColor={Colors.theme_color}
            activeOutlineColor={Colors.theme_color}
            textColor="black"
            theme={{ roundness: 10 }}
            autoFocus={true}
          />
        ) : (
          <Card>
            <View style={styles.card_container}>
              <MaterialCommunityIcons name="account" size={20} />
              <Card.Content>
                <Text
                  variant="titleLarge"
                  style={{ fontFamily: Fonts.primary, fontSize: 16 }}
                >
                  {usr_name}
                </Text>
              </Card.Content>
            </View>
          </Card>
        )}
      </View>
      <View style={styles.box_container}>
        <Card>
          <View style={styles.card_container}>
            <Feather name="phone" size={20} />
            <Card.Content>
              <Text
                variant="titleLarge"
                style={{ fontFamily: Fonts.primary, fontSize: 16 }}
              >
                {phone}
              </Text>
            </Card.Content>
          </View>
        </Card>
      </View>
      <View
        style={{ paddingHorizontal: 20, marginTop: 10, alignItems: "center" }}
      >
        {is_enable ? (
          <Button
            icon="account-edit"
            mode="contained"
            style={{ backgroundColor: "#337ab7" }}
            onPress={() => updateName()}
          >
            Update
          </Button>
        ) : (
          <Button
            icon="account-edit"
            mode="contained"
            style={{ backgroundColor: "#337ab7" }}
            onPress={() => clickEdit()}
          >
            {is_enable ? "Update" : "Edit"}
          </Button>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.theme_color,
    // alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 10,
  },
  img_container: {
    borderWidth: 1,
    borderRadius: 100,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    marginTop: 30,
  },
  box_container: { paddingHorizontal: 20, marginTop: 10 },
  card_container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  backImg: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
});
export default Profile;
