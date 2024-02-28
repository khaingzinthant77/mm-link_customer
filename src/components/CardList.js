import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";
import axios from "axios";
import Colors from "@styles/Colors";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
//import icon
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import component
import PhoneSelectModal from "./PhoneSelectModal";
import PasswordModal from "./PasswordModal";
//import service
import { SendOTP } from "@services/SendOTP";

//import url
import { updatePhoneApi, claimBonusApi } from "@apis/FiberApis";
import { checkAccApi } from "../apis/TopupApis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const startX = 0; // Start x-coordinate
const startY = 1; // Start y-coordinate
const endX = 2; // End x-coordinate
const endY = 1; // End y-coordinate
const CardList = ({
  cards,
  empty_cards,
  acc_limit,
  data_length,
  expiration,
  site_code,
  month,
  quota,
  fttx_user_id,
  gift_plan_id,
  data_bonus_id,
  navigateRoute,
  is_loading,
  handle_Refresh,
  handle_fetch,
  resetRoute,
  updateResetRoute,
}) => {
  const [selected_cards, setSelectedCards] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [phone_number, setPhoneNumber] = useState(null);
  const [showCreateModal, setCreateModal] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showCreateOtpModal, setCreateShowOtpModal] = useState(false);
  const [send_otp, setSendOtp] = useState("");
  const [order_no, setOrder] = useState("");
  const [isLoading, setLoading] = useState(false);

  toggleCardSelection = (card_data) => {
    // Check if the card is already selected
    if (selected_cards.includes(card_data)) {
      // If selected, remove it from the selectedCards array
      setSelectedCards((prevState) => {
        return prevState.filter((card) => card !== card_data);
      });
    } else {
      // If not selected, add it to the selectedCards array
      setSelectedCards((prevState) => [...prevState, card_data]);
    }
  };

  showPhoneListModal = () => {
    setShowModal(true);
  };

  handleClose = () => {
    setShowModal(false);
  };

  handleConfirm = async (selected_data) => {
    if (selected_data.length == 0) {
      alert("Please select minimum one account!");
    } else {
      var arr = [];
      selected_data.map((data, index) => {
        arr.push(data.phone);
      });
      setLoading(true);
      let param = {
        data_bonus_id: data_bonus_id,
        phone: arr,
      };
      var topupEndPoint = await AsyncStorage.getItem("endpoint");
      var url = topupEndPoint + claimBonusApi;
      axios
        .post(url, param, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log(response.data);
          setLoading(false);
          if (response.data.status == 1) {
            setShowModal(false);

            Alert.alert("Success", response.data.message, [
              // {
              //   text: "Cancel",
              //   onPress: () => console.log("Cancel Pressed"),
              //   style: "cancel",
              // },
              {
                text: "OK",
                onPress: () => navigateRoute(),
              },
            ]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handlePressBtn = (value) => {
    var click_value = acc_limit - data_length;
    if (value < click_value) {
      setCreateModal(true);
    }
  };

  handleCloseCreteModal = () => {
    setCreateModal(false);
  };

  validate_create_phone = async (phone) => {
    let param = {
      phone: phone,
    };

    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var url = topupEndPoint + checkAccApi;

    axios
      .post(url, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        // console.log(response.data);
        if (response.data.status == 0) {
          var otp = await SendOTP(phone);
          if (otp.response.responseCode == 1) {
            setCreateModal(false);
            setCreateShowOtpModal(true);
            setSendOtp(otp.sixDigitNumber);
            setPhoneNumber(phone);
          } else {
            setCreateShowOtpModal(true);
            alert(otp.response.responseMessage);
          }

          // setLoading(true);
          // setSendOtp("123456");
          // setLoading(false);
          // setPhoneNumber(phone);
          // setCreateModal(false);
          // setCreateShowOtpModal(true);
        } else {
          create_account(phone);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleShowModal = (phone, index) => {
    setPhoneNumber(phone);
    setShowEditModal(true);
    setOrder(index + 1);
  };

  handleCloseEditModal = () => {
    // alert(phone_number);
    setShowEditModal(false);
  };

  validate_update_phone = async (phone) => {
    let param = {
      phone: phone,
    };

    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var url = topupEndPoint + checkAccApi;

    axios
      .post(url, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        if (response.data.status == 0) {
          setLoading(true);
          var otp = await SendOTP(phone);
          setLoading(false);
          setPhoneNumber(phone);
          if (otp.response.responseCode == 1) {
            setShowEditModal(false);
            setShowOtpModal(true);
            setSendOtp(otp.sixDigitNumber);
            setPhoneNumber(phone);
          } else {
            setShowOtpModal(false);
            alert(otp.response.responseMessage);
          }

          // setLoading(true);
          // setSendOtp("123456");
          // setLoading(false);
          // setPhoneNumber(phone);
          // setShowEditModal(false);
          // setShowOtpModal(true);
        } else {
          update_account(phone);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCloseOTPModal = () => {
    setShowOtpModal(false);
  };
  handleCloseCreateOTPModal = () => {
    setCreateShowOtpModal(false);
  };

  create_account = async (phone) => {
    let param = {
      fttx_user_id: fttx_user_id,
      gift_plan_id: gift_plan_id,
      expiration: moment(expiration).format("DD-MM-YYYY"),
      order: data_length + 1,
      phone: phone,
    };
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var url = topupEndPoint + updatePhoneApi;

    axios
      .post(url, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.status == 1) {
          setCreateShowOtpModal(false);
          handle_fetch();
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  validate_create_otp = async (otp) => {
    if (send_otp != otp) {
      alert("OTP is incorrect!");
    } else {
      resetRoute(phone_number);
      setCreateShowOtpModal(false);
    }
  };

  validate_update_otp = async (otp) => {
    if (send_otp != otp) {
      alert("OTP is incorrect!");
    } else {
      updateResetRoute(phone_number, order_no);
      setShowOtpModal(false);
    }
  };

  update_account = async (phone_number) => {
    // update api call
    let param = {
      fttx_user_id: fttx_user_id,
      gift_plan_id: gift_plan_id,
      expiration: moment(expiration).format("DD-MM-YYYY"),
      order: order_no,
      phone: phone_number,
    };
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    var url = topupEndPoint + updatePhoneApi;

    axios
      .post(url, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.status == 1) {
          setShowOtpModal(false);
          handle_fetch();
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onRefresh = () => {
    handle_Refresh(); // Call the function
  };

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={is_loading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          start={{ x: startX, y: startY }}
          end={{ x: endX, y: endY }}
          colors={["#698afa", "#0badfd"]}
          style={styles.header_box_shadow}
        >
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.expire_text}>Expire Date</Text>
            <Text style={{ color: "white" }}>
              {moment(expiration).format("DD-MM-YYYY")}
            </Text>
          </View>
          <View style={styles.header_container}>
            <View style={styles.header_text}>
              <FontAwesome name="sitemap" size={28} color={"white"} />
              <Text style={styles.value_style}>{site_code}</Text>
            </View>
            <View style={styles.header_text}>
              <FontAwesome name="calendar" size={25} color={"white"} />
              <Text style={styles.value_style}>{month}</Text>
            </View>
            <View style={styles.header_text}>
              <MaterialIcons name="wifi-tethering" size={25} color={"white"} />
              <Text style={styles.value_style}>{quota} GB</Text>
            </View>
          </View>
        </LinearGradient>
        {cards.map((card, index) => (
          <View key={index}>
            <TouchableOpacity
              style={[
                styles.box_shadow,
                {
                  backgroundColor: "#fff",
                },
              ]}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[styles.btn_container, { backgroundColor: "#339900" }]}
                >
                  <FontAwesome5 name="user-check" size={23} color={"#fff"} />
                </View>
              </View>

              <View style={{ position: "absolute", bottom: 5, right: 5 }}>
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={() => handleShowModal(card.phone, index)}
                >
                  <MaterialCommunityIcons
                    name="square-edit-outline"
                    size={25}
                    color={Colors.theme_color}
                  />
                </TouchableOpacity>
              </View>

              <Text style={[styles.phone_text]}>{card.phone}</Text>
            </TouchableOpacity>
          </View>
        ))}
        {empty_cards.map((card, index) => (
          <TouchableOpacity
            style={[
              styles.box_shadow,
              {
                backgroundColor: "#fff",
              },
            ]}
            activeOpacity={0.8}
            key={index}
            onPress={() => handlePressBtn(index)}
          >
            {acc_limit <= index + cards.length ? (
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[styles.btn_container, { backgroundColor: "#ff9966" }]}
                  onPress={() => handlePressBtn(index)}
                >
                  <FontAwesome5 name="user-lock" size={23} color={"white"} />
                </View>
                <Text style={[styles.phone_text, { color: "gray" }]}>
                  Not Available...
                </Text>
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[styles.btn_container, { backgroundColor: "#339900" }]}
                  onPress={() => handlePressBtn(index)}
                >
                  <FontAwesome5 name="user-check" size={23} color={"white"} />
                </View>
                <Text style={[styles.phone_text]}>{card.phone}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
        {cards.length > 0 ? (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderColor: Colors.theme_color,
                paddingHorizontal: 30,
                paddingVertical: 12,
                borderRadius: 10,
                marginTop: 10,
              }}
              // onPress={() => console.log(this.state.selectedCards)}
              onPress={() => showPhoneListModal()}
            >
              <Text
                style={{
                  color: Colors.theme_color,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {quota} GB Claims
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
      <PhoneSelectModal
        isOpen={isShowModal}
        onClose={() => handleClose()}
        data_list={cards}
        btn_text={isLoading ? "Loading..." : "Confirm"}
        onPressConfirm={(selectedData) =>
          isLoading ? null : handleConfirm(selectedData)
        }
        available_slot={acc_limit}
      />

      <PasswordModal
        header_text="Update Phone Number"
        isOpen={showEditModal}
        onClose={() => handleCloseEditModal()}
        btn_text={isLoading ? "Loading..." : "Confirm"}
        onSubmit={(phone) => validate_update_phone(phone)}
        isPassword={false}
        text={phone_number}
        loading={isLoading}
      />

      <PasswordModal
        header_text="Please Enter Phone Number"
        isOpen={showCreateModal}
        onClose={() => handleCloseCreteModal()}
        btn_text={isLoading ? "Loading..." : "Confirm"}
        onSubmit={(phone) => validate_create_phone(phone)}
        isPassword={false}
        loading={isLoading}
        // showPlaceholder={true}
      />

      <PasswordModal
        header_text="Please enter OTP varification code"
        isOpen={showOtpModal}
        onClose={() => handleCloseOTPModal()}
        btn_text={isLoading ? "Loading..." : "Confirm"}
        onSubmit={(otp) => validate_update_otp(otp)}
        isPassword={false}
        showPlaceholder={true}
        loading={isLoading}
      />
      <PasswordModal
        header_text="Please enter OTP varification code"
        isOpen={showCreateOtpModal}
        onClose={() => handleCloseCreateOTPModal()}
        btn_text={isLoading ? "Loading..." : "Confirm"}
        onSubmit={(otp) => validate_create_otp(otp)}
        isPassword={false}
        showPlaceholder={true}
        loading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box_shadow: {
    flexDirection: "row",
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.5, //IOS
    marginTop: 5,

    height: 65,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  phone_text: { marginLeft: 10, fontSize: 16, alignSelf: "center" },
  header_box_shadow: {
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.5, //IOS
    marginTop: 5,
    // height: 65,
    marginHorizontal: 5,
    // marginBottom: 5,
    // alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  expire_text: { fontSize: 18, color: "white" },
  header_container: { flexDirection: "row", justifyContent: "space-between" },
  header_text: { justifyContent: "center", alignItems: "center" },
  value_style: { marginTop: 10, color: "white" },
  btn_container: {
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
export default CardList;
