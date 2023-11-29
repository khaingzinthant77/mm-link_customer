import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  TouchableOpacity,
  View,
  Text,
  BackHandler,
} from "react-native";
import axios from "axios";
import Moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
//import api
import {
  dataTransferApi,
  transferHistoryApi,
  checkAccApi,
} from "@apis/TopupApis";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { G, Path } from "react-native-svg";
//import component
import ErrorText from "@components/ErrorText";
import PasswordModal from "@components/PasswordModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@styles/Colors";
const Transfer = ({ navigation }) => {
  const [value, setValue] = useState(1);
  const [phone, setPhone] = useState(null);
  const [data_value, setDataValue] = useState(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [isErrorPhone, setIsErrorPhone] = useState(false);
  const [isErrorData, setIsErrorData] = useState(false);
  const [otp, setOtp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setOtpModal] = useState(false);
  const [loginPhone, setLoginPhone] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phone = await AsyncStorage.getItem("tusername");
        var topupEndPoint = await AsyncStorage.getItem("endpoint");
        // console.log(topupEndPoint);
        setLoginPhone(phone);
        var url = topupEndPoint + transferHistoryApi + "?phone=" + phone;

        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            // console.log(response.data.data)
            setHistory(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error("Error fetching phone:", error);
      }
    };

    fetchData(); // Call the async function immediately

    const backAction = () => {
      navigation.navigate("HotspotDashboard");
      return true; // Prevent default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

    // No return is needed, or you can return a cleanup function if needed
  }, [phone]); // Include 'phone' in the dependency array if needed

  const generateRandomSixDigitNumber = () => {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number

    // Generate a random number between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const arr = [
    { label: "500MB", value: "500" },
    { label: "1GB", value: "1024" },
    { label: "2GB", value: "2048" },
    { label: "3GB", value: "3072" },
    { label: "5GB", value: "5120" },
    { label: "6GB", value: "6144" },
    { label: "8GB", value: "8192" },
    { label: "10GB", value: "10240" },
  ];
  const calculateGridDimensions = (length) => {
    const numColumns = 4; // Number of columns in each row
    const numRows = Math.ceil(length / numColumns); // Calculate the number of rows needed
    return { numColumns, numRows };
  };

  const { numColumns, numRows } = calculateGridDimensions(arr.length);

  const renderGridItem = (item, index) => {
    const isSelected = selectedButtonIndex === index;
    const gradientColors = [
      ["#40c9ff", "#e81cff"],
      ["#e8b595", "#b190ba"],
      ["#f492f0", "#aab2ff"],
      ["#0061ff", "#60efff"],
      ["#FF5733", "#FFC300"],
      ["#eed991", "#2472fc"],
      ["#f40752", "#f9ab8f"],
      ["#295270", "#faae7b"],
    ][index];

    const startX = 0; // Start x-coordinate
    const startY = 0; // Start y-coordinate
    const endX = 1; // End x-coordinate
    const endY = 1; // End y-coordinate

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.gridItem,
          {
            borderRadius: 5,
            borderWidth: isSelected ? 2 : 0,
            paddingVertical: 5,
            backgroundColor: isSelected ? "transparent" : "transparent",
            paddingHorizontal: 5,
          },
        ]}
        onPress={() => handleButtonClick(index, item.value)}
        activeOpacity={1}
      >
        <LinearGradient
          start={{ x: startX, y: startY }}
          end={{ x: endX, y: endY }}
          colors={gradientColors}
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 16,
            borderRadius: isSelected ? 3 : 5,
          }}
        >
          <Text style={{ color: "white" }}>{item.label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderGridRow = (start, end) => {
    return (
      <View style={styles.row} key={start}>
        {arr
          .slice(start, end)
          .map((item, index) => renderGridItem(item, start + index))}
      </View>
    );
  };

  const renderGridView = () => {
    const gridRows = [];
    let startIndex = 0;

    for (let i = 0; i < numRows; i++) {
      const endIndex = Math.min(startIndex + numColumns, arr.length);
      gridRows.push(renderGridRow(startIndex, endIndex));
      startIndex += numColumns;
    }

    return gridRows;
  };
  handlePhone = (value) => {
    setPhone(value);
    setIsErrorPhone(false);
  };
  const handleButtonClick = (index, data_value) => {
    setSelectedButtonIndex(index);
    setDataValue(data_value);
    setIsErrorData(false);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^09/; // Regex pattern for "09" followed by 8 digits

    return phoneNumberPattern.test(phoneNumber);
  };

  const handleCloseModal = () => {
    setOtpModal(false);
  };

  const validate_password = async (typing_password) => {
    var current_pwd = await AsyncStorage.getItem("tpassword");
    if (current_pwd != typing_password) {
      alert("Your password is incorrect");
    } else {
      let param = {
        transfer_from: loginPhone,
        transfer_to: phone,
        data_amount: data_value,
      };
      // console.log(param);
      const endpoint =
        (await AsyncStorage.getItem("endpoint")) + dataTransferApi;
      // console.log(endpoint);
      axios
        .post(endpoint, param, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.status == 1) {
            Alert.alert("Success", response.data.message, [
              {
                text: "OK",
                onPress: () =>
                  navigation.navigate("Dashboard", { type: "topup" }),
              },
            ]);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDataTransfer = () => {
    var isError = false;
    if (!phone) {
      setIsErrorPhone(true);
      isError = true;
    }
    if (!data_value) {
      setIsErrorData(true);
      isError = true;
    }

    if (!isError) {
      if (isValidPhoneNumber(phone) == false) {
        alert("Phone number start with 09");
      } else {
        checkAccount(phone);
      }
    }
  };

  const checkAccount = async (phone_no) => {
    var topupEndPoint = await AsyncStorage.getItem("endpoint");

    var url = topupEndPoint + checkAccApi;
    var param = {
      phone: phone_no,
    };
    axios
      .post(url, param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        if (response.data.status == 0) {
          setOtpModal(false);
          Alert.alert("Alert", response.data.message, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("Dashboard", { type: "topup" }),
            },
          ]);
        } else {
          setOtpModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTabClick = (value) => {
    setValue(value);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tab_container}>
        <TouchableOpacity
          style={[
            styles.tab_btn,
            {
              backgroundColor: value == 1 ? Colors.theme_color : "transparent",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
          ]}
          onPress={() => handleTabClick(1)}
        >
          <MaterialCommunityIcons
            name="wifi-arrow-left-right"
            size={20}
            color={value == 1 ? "white" : Colors.theme_color}
          />
          <Text
            style={{
              marginLeft: 10,
              color: value == 1 ? "white" : Colors.theme_color,
            }}
          >
            Data Transfer
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: 1,
            borderWidth: 0.5,
            borderColor: "gray",
            height: 40,
          }}
        ></View>
        <TouchableOpacity
          style={[
            styles.tab_btn,
            {
              backgroundColor: value == 2 ? Colors.theme_color : "transparent",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}
          onPress={() => handleTabClick(2)}
        >
          <MaterialCommunityIcons
            name="history"
            size={20}
            color={value == 2 ? "white" : Colors.theme_color}
          />
          <Text
            style={{
              marginLeft: 10,
              color: value == 2 ? "white" : Colors.theme_color,
            }}
          >
            Transfer History
          </Text>
        </TouchableOpacity>
      </View>
      {value == 1 ? (
        <View style={styles.container}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.body}>
                <Text style={styles.label}>Data Transfer Hotspot Account</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={styles.input_style}
                    placeholder="Start with 09"
                    placeholderTextColor={"gray"}
                    onChangeText={(value) => handlePhone(value)}
                    keyboardType="phone-pad"
                  />
                  <View style={styles.append_btn}>
                    <FontAwesome5
                      name="user-circle"
                      color={"white"}
                      size={25}
                    />
                  </View>
                </View>
                <ErrorText
                  isShow={isErrorPhone}
                  errMessage="Please enter phone number!"
                />
                <Text
                  style={{ marginTop: 15, fontWeight: "500", marginBottom: 5 }}
                >
                  Select Data Transfer Amount
                </Text>

                {renderGridView()}
                <ErrorText
                  isShow={isErrorData}
                  errMessage="Please select data transfer amount!"
                />
                <TouchableOpacity
                  style={styles.transfer_btn}
                  activeOpacity={0.8}
                  onPress={() => (isLoading ? null : handleDataTransfer())}
                >
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-transfer"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    color={"#337ab7"}
                  >
                    <Path stroke="none" d="M0 0h24v24H0z" fill="none"></Path>
                    <Path d="M20 10h-16l5.5 -6"></Path>
                    <Path d="M4 14h16l-5.5 6"></Path>
                  </Svg>

                  <Text style={styles.text_style}>
                    {isLoading ? "Loading..." : "Make Transfer"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <PasswordModal
            header_text="Please enter your password"
            isOpen={showOtpModal}
            onClose={() => handleCloseModal()}
            btn_text="Confirm"
            onSubmit={(password) => validate_password(password)}
            isPassword={false}
            showPlaceholder={true}
          />
        </View>
      ) : (
        <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {history.map((data, index) => {
              return (
                <TouchableOpacity
                  style={{
                    borderWidth: 3,
                    borderColor: Colors.theme_color,
                    borderRadius: 10,
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    marginBottom: 10,
                  }}
                  key={index}
                >
                  <Text>
                    From {data.from_acc} to {data.to_acc}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={{ width: 100 }}>
                      <Text>Data</Text>
                    </View>

                    <Text style={{ color: data.type == "r" ? "green" : "red" }}>
                      {data.type == "r" ? "+" : "-"} {data.transfer_data}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={{ width: 100 }}>
                      <Text>
                        {data.type == "r" ? "Received Date" : "Transfer Date"}
                      </Text>
                    </View>

                    <Text>
                      : {Moment(data.created_at).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  tab_container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.theme_color,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    marginTop: 10,
  },
  tab_btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "50%",
    flexDirection: "row",
  },
  segmentedButtonGroup: {
    color: "white", // Set the default text color
    marginHorizontal: 10,
  },
  body: {
    backgroundColor: "#ebf5fb",
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    borderColor: "#cfeffc",
    shadowOffset: { width: 0, height: 0.4 }, //IOS
    shadowOpacity: 0.2, //IOS
  },
  label: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
  },
  input_style: {
    backgroundColor: "white",
    height: 45,
    width: "80%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 10,
  },
  append_btn: {
    backgroundColor: "#337ab7",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  transfer_btn: {
    borderColor: "#337ab7",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "white",
    marginBottom: 20,
  },
  text_style: {
    color: "#337ab7",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#337ab7",
    marginHorizontal: 5,
  },
});

export default Transfer;
