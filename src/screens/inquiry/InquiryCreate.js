import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
  Alert,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
//import Component
import RadioBtn from "@components/Radio";
import SuccessModel from "@components/SuccessModal";
import ErrorText from "@components/ErrorText";
import FiberHeader from "@components/FiberHeader";

//import BaseUrl
import {
  getTownshipApi,
  getServicePlanApi,
  getInquiryApi,
  quarterApi,
} from "@apis/FiberApis";

//import services
import { commaString } from "@services/CommaString";
import GetUUID from "@services/GetUUID";
import { GetRandomValue } from "@services/GetRandomValue";
//import style
import Styles from "@styles/Styles";

export default class InquiryCreate extends React.Component {
  constructor(props) {
    super(props);
    this.BackHandler = null;
    this.state = {
      internetPlan: "",
      townships: [],
      township: { value: null, label: null },
      quarters: [],
      quarter: { value: null, label: null },
      user_name: null,
      phone: null,
      business: "",
      address: null,
      planId: null,
      serviceType: [],
      monthlyFee: "",
      selectedData: "",
      isOpenSuccessModel: false,
      bandwidth: null,
      installation: "30000Ks",
      totalCost: "",
      contracts: [
        { value: 3, label: "3 Months" },
        { value: 6, label: "6 Months" },
        { value: 1, label: "12 Months" },
      ],
      contract: { value: null, label: null },
      ISINTERNETPLANERROR: false,
      ISPLANERROR: false,
      ISMONTHLYCHARGEERROR: false,
      ISCONTRACTMONTHERROR: false,
      ISNAMEERROR: false,
      ISPHONEERROR: false,
      ISBUSINESSERROR: false,
      ISADDRESSERROR: false,
      ISTOWNSHIPERROR: false,
      ISQUARTERERROR: false,
      ISTOTALCOSTERROR: false,
      editable: true,
      loading: true,
    };
  }
  componentDidMount = async () => {
    // console.log(this.props.route);
    await this._getTownship();
    await this._getQuarter(this.props.route.params.tsCode);
    await this.getServiceType();
    // this.BackHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   await this.handleBackPress
    // );
  };
  //get Townships
  _getTownship = () => {
    var self = this;
    const url = getTownshipApi + GetRandomValue();
    // alert(url);
    axios
      .get(url)
      .then((response) => {
        let arr = [];
        response.data.map((data, index) => {
          if (data.tS_Code == this.props.route.params.tsCode) {
            self.setState({
              township: {
                value: this.props.route.params.tsCode,
                label: data.tS_Name,
              },
            });
          }
          // console.log(data);
          var obj = {
            value: data.tS_Code,
            label: data.tS_Name,
          };
          arr.push(obj);
        });
        self.setState({ townships: arr });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get Quarter
  _getQuarter = (ts_code) => {
    var self = this;
    const url = quarterApi;
    let bodyParam = { tS_Code: ts_code };
    axios
      .post(url, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        let data = response.data;
        let arr = [];
        data.map((data, index) => {
          var obj = {
            value: data.qT_Code,
            label: data.qT_Name,
          };
          arr.push(obj);
        });
        self.setState({ quarters: arr });
      })
      .catch((err) => {
        console.log("Check Location Quarters get Api", err);
      });
  };

  //get Internet Plans
  getServiceType = async () => {
    var self = this;
    axios
      .get(getServicePlanApi + this.state.randomNum)
      .then(function (response) {
        self.setState({
          serviceType: response.data,
          maps: response.data.name,
          internetPlans: response.data[0].name,
          monthlyFee: response.data[0].monthlyFee,
          contract: { value: 3, label: "3 Months" },
          totalCost: parseInt(response.data[0].monthlyFee) * 3,
          selectedData: response.data[0].planId,
          planId: response.data[0].planId,
          loading: false,
        });
      })

      .catch(function (error) {
        // console.log("get Internet Plans Error:", error);
      });
  };

  _handleOnSelectTownship(value, label) {
    this.setState({
      township: { value: value, label: label },
      ISTOWNSHIPERROR: false,
    });
    this._getQuarter(value);
  }
  _handleOnSelectQuarter(value, label) {
    this.setState({
      quarter: { value: value, label: label },
      ISQUARTERERROR: false,
    });
  }

  _handleOnSelectContract(value, label) {
    var fee =
      value == 3
        ? parseInt(this.state.monthlyFee) * 3
        : value == 6
        ? parseInt(this.state.monthlyFee) * 6
        : value == 1
        ? parseInt(this.state.monthlyFee) * 12
        : "";
    this.setState({
      contract: { value: value, label: label },
      ISCONTRACTMONTHERROR: false,
      totalCost: fee,
    });
  }
  _handleInternetPlan(internetPlan, size, price, planId) {
    var bd = size + "Mbps";
    this.setState({
      totalCost: parseInt(price) * 3,
      internetPlans: internetPlan,
      bandwidth: bd,
      monthlyFee: price,
      contract: { value: 3, label: "3 Months" },
      selectedData: planId,
      planId: planId,
      ISINTERNETPLANERROR: false,
      ISCONTRACTMONTHERROR: false,
      ISTOTALCOSTERROR: false,
      isFocusMonth: false,
      isFocusTownship: false,
      isFocusQuarter: false,
    });
  }

  //save inquiry form data
  _saveInquiry = async () => {
    let isError = false;
    this.setState({ editable: false });
    if (!this.state.user_name) {
      this.setState({ ISNAMEERROR: true, editable: true });
      isError = true;
    }
    if (!this.state.totalCost) {
      this.setState({ ISTOTALCOSTERROR: true, editable: true });
      isError = true;
    }
    if (!this.state.phone) {
      this.setState({ ISPHONEERROR: true, editable: true });
      isError = true;
    }

    if (!this.state.address) {
      this.setState({ ISADDRESSERROR: true, editable: true });
      isError = true;
    }
    if (this.state.township.value == null) {
      this.setState({ ISTOWNSHIPERROR: true, editable: true });
      isError = true;
    }
    if (!this.state.quarter.value) {
      this.setState({ ISQUARTERERROR: true, editable: true });
      isError = true;
    }
    if (this.state.contract.value == null) {
      this.setState({ ISCONTRACTMONTHERROR: true, editable: true });
      isError = true;
    }

    if (!isError) {
      let inquiry = {
        id: GetUUID.uuid(),
        planId: this.state.planId,
        name: this.state.user_name,
        business: this.state.business,
        phone: this.state.phone,
        address: this.state.address,
        tS_Code: this.state.township.value,
        qT_Code: this.state.quarter.value,
        pType: this.state.contract.value,
        lat: parseFloat(this.props.route.params.latitude),
        lng: parseFloat(this.props.route.params.longitude),
        osaleDate: new Date().toISOString(),
        inquiryDate: new Date().toISOString(),
      };
      // console.log(inquiry);
      var self = this;
      axios
        .post(getInquiryApi, inquiry, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.access_token,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(function (response) {
          // console.log(response);
          if (response.status == 200) {
            self.setState({
              // isOpenSuccessModel: true,
              user_name: null,
              business: null,
              phone: null,
              address: null,
              township: { value: null, label: null },
              contract: { value: null, label: null },
              quarter: { value: null, label: null },
              internetPlans: null,
              monthlyFee: null,
              selectedData: false,
              totalCost: null,
            });
            Alert.alert(
              "Success! ",
              "Thank you.We will contact you soon.",
              [
                {
                  text: "Cancel",
                  onPress: () => self.props.navigation.navigate("HomeScreen"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => self.props.navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else {
            self.setState({ editable: true });
          }
        })
        .catch(function (error) {
          self.setState({ editable: true });
          // console.log("Save Inquery Api:", error);
        });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FiberHeader
          headerText="Inquiry"
          onPress={() => this.props.navigation.navigate("FiberDashboard")}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          enabled
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ marginLeft: 30 }}>
              <ErrorText
                errMessage="Please Choose Internet Plan*"
                isShow={this.state.ISINTERNETPLANERROR}
              />

              {this.state.serviceType.length == 0 ? (
                <ActivityIndicator
                  size="large"
                  style={{
                    flex: 1,
                    marginTop: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ) : null}
            </View>
            {this.props.route.params.status == 1 ? (
              <View style={styles.sCard}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.serviceType.map((data, index) => {
                    // console.log(data);
                    if (data.show) {
                      return (
                        <View key={index}>
                          <RadioBtn
                            internetPlan={data.name}
                            monthlyFee={data.monthlyFee}
                            bgColor={data.color}
                            img={data.img}
                            onPress={() =>
                              this._handleInternetPlan(
                                data.name,
                                data.size,
                                data.monthlyFee,
                                data.planId,
                                data,
                                data.size3M
                              )
                            }
                            active={
                              this.state.selectedData == data.planId
                                ? true
                                : false
                            }
                          />
                        </View>
                      );
                    }
                  })}
                </ScrollView>
              </View>
            ) : (
              <View>
                <View style={styles.sCard}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {this.state.serviceType.map((data, index) => {
                      // console.log(data);
                      return (
                        <View key={index}>
                          <RadioBtn
                            internetPlan={data.name}
                            monthlyFee={data.monthlyFee}
                            onPress={() =>
                              this._handleInternetPlan(
                                data.name,
                                data.monthlyFee,
                                data.planId
                              )
                            }
                            active={
                              this.state.selectedData == data.planId
                                ? true
                                : false
                            }
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "black",
                      alignSelf: "center",
                      fontSize: 16,
                    }}
                  >
                    {this.props.route.params.text1}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "black",
                      alignSelf: "center",
                      fontSize: 16,
                    }}
                  >
                    {this.props.route.params.text2}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "black",
                      alignSelf: "center",
                      fontSize: 16,
                    }}
                  >
                    {this.props.route.params.text3}
                  </Text>
                </View>
              </View>
            )}
            <View style={{ marginTop: 20 }}>
              <View style={[styles.formContainer, { marginBottom: 7 }]}>
                <View style={styles.textStyle}>
                  <Text allowFontScaling={false} style={styles.label}>
                    Internet Plan*
                  </Text>
                </View>

                <TextInput
                  allowFontScaling={false}
                  style={styles.inputText}
                  value={this.state.internetPlans}
                  onChangeText={(value) =>
                    this.setState({
                      internetPlans: value,
                      ISINTERNETPLANERROR: false,
                    })
                  }
                  editable={false}
                ></TextInput>
              </View>
              <View style={styles.formContainer}>
                <View style={styles.textStyle}>
                  <Text allowFontScaling={false} style={styles.label}>
                    Monthly Fee*
                  </Text>
                </View>
                <View style={styles.inputText}>
                  <Text allowFontScaling={false}>
                    {this.state.monthlyFee
                      ? commaString(this.state.monthlyFee)
                      : ""}
                  </Text>
                </View>
              </View>
              <View style={[styles.formContainer, { marginBottom: 7 }]}>
                <View style={styles.textStyle}>
                  <Text allowFontScaling={false} style={styles.label}>
                    Months*
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Dropdown
                    style={[
                      Styles.dropdown,
                      {
                        width: "100%",
                        marginTop: 10,
                        height: 40,
                        backgroundColor: "white",
                        borderColor: "white",
                      },
                    ]}
                    selectedTextStyle={Styles.selectedTextStyle}
                    search={false}
                    data={this.state.contracts}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Months"
                    value={this.state.contract}
                    onFocus={() => this.setState({ isFocusMonth: true })}
                    onBlur={() => this.setState({ isFocusMonth: false })}
                    onChange={(item) =>
                      this._handleOnSelectContract(item.value, item.label)
                    }
                  />
                  <ErrorText
                    errMessage="Please select Month"
                    isShow={this.state.ISCONTRACTMONTHERROR}
                  />
                </View>
              </View>
              <View style={[styles.formContainer, { marginBottom: 7 }]}>
                <View style={styles.textStyle}>
                  <Text allowFontScaling={false} style={styles.label}>
                    Total Cost
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={[styles.inputText, { flexDirection: "row" }]}>
                    <Text allowFontScaling={false}>
                      {this.state.totalCost
                        ? commaString(this.state.totalCost)
                        : ""}
                    </Text>
                    <Text allowFontScaling={false}>
                      {this.state.totalCost ? "Ks" : ""}
                    </Text>
                  </View>
                  <ErrorText
                    errMessage="Please enter total cost"
                    isShow={this.state.ISTOTALCOSTERROR}
                  />
                </View>
              </View>
              <View style={[styles.formContainer, { marginBottom: 7 }]}>
                <View style={styles.textStyle}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.label, { fontWeight: "bold" }]}
                  >
                    Name*
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.inputText}
                    value={this.state.user_name}
                    onChangeText={(value) =>
                      this.setState({ user_name: value, ISNAMEERROR: false })
                    }
                    returnKeyType={"next"}
                    onSubmitEditing={(event) => {
                      this.refs.Ph.focus();
                    }}
                  ></TextInput>
                  <ErrorText
                    errMessage="Please enter your name"
                    isShow={this.state.ISNAMEERROR}
                  />
                </View>
              </View>

              <View style={[styles.formContainer, { marginBottom: 7 }]}>
                <View style={styles.textStyle}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.label, { fontWeight: "bold" }]}
                  >
                    Phone No*
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    allowFontScaling={false}
                    ref="Ph"
                    style={styles.inputText}
                    value={this.state.phone}
                    onChangeText={(value) =>
                      this.setState({ phone: value, ISPHONEERROR: false })
                    }
                    keyboardType="number-pad"
                    returnKeyType="done"
                    onSubmitEditing={(event) => {
                      this.refs.Business.focus();
                    }}
                  ></TextInput>
                  <ErrorText
                    errMessage="Please enter your phone number"
                    isShow={this.state.ISPHONEERROR}
                  />
                </View>
              </View>

              <View style={[styles.formContainer]}>
                <View style={styles.textStyle}>
                  <Text allowFontScaling={false} style={styles.label}>
                    Business
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    allowFontScaling={false}
                    ref="Business"
                    style={styles.inputText}
                    value={this.state.business}
                    onChangeText={(value) => this.setState({ business: value })}
                  ></TextInput>
                </View>
              </View>
              <View style={[styles.formContainer]}>
                <View style={styles.textStyle}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.label, { fontWeight: "bold" }]}
                  >
                    TownShip*
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  {/* <Dropdown
                    placeholder="Select Township"
                    value={this.state.township}
                    options={this.state.townships}
                    onSelect={this._handleOnSelectTownship.bind(this)}
                    //   marginLeftContainer={7}
                    backgroundColorContainer="white"
                    widthContainer="100%"
                    style={{ flex: 1 }}
                  /> */}
                  <Dropdown
                    style={[
                      Styles.dropdown,
                      {
                        width: "100%",
                        marginTop: 10,
                        height: 40,
                        backgroundColor: "white",
                        borderColor: "white",
                      },
                    ]}
                    selectedTextStyle={Styles.selectedTextStyle}
                    search={false}
                    data={this.state.townships}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Township"
                    value={this.state.township}
                    onFocus={() => this.setState({ isFocusTownship: true })}
                    onBlur={() => this.setState({ isFocusTownship: false })}
                    onChange={(item) =>
                      this._handleOnSelectTownship(item.value, item.label)
                    }
                  />
                  <ErrorText
                    errMessage="Please select township"
                    isShow={this.state.ISTOWNSHIPERROR}
                  />
                </View>
              </View>
              <View style={[styles.formContainer, { marginBottom: 7 }]}>
                <View style={styles.textStyle}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.label, { fontWeight: "bold" }]}
                  >
                    Quarters*
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  {/* <Dropdown
                    placeholder="Select Quarter"
                    value={this.state.quarter}
                    options={this.state.quarters}
                    onSelect={this._handleOnSelectQuarter.bind(this)}
                    //   marginLeftContainer={7}
                    backgroundColorContainer="white"
                    widthContainer="100%"
                    style={{ flex: 1 }}
                  /> */}
                  <Dropdown
                    style={[
                      Styles.dropdown,
                      {
                        width: "100%",
                        marginTop: 10,
                        height: 40,
                        backgroundColor: "white",
                        borderColor: "white",
                      },
                    ]}
                    selectedTextStyle={Styles.selectedTextStyle}
                    search={false}
                    data={this.state.quarters}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Quarter"
                    value={this.state.quarter}
                    onFocus={() => this.setState({ isFocusQuarter: true })}
                    onBlur={() => this.setState({ isFocusQuarter: false })}
                    onChange={(item) =>
                      this._handleOnSelectQuarter(item.value, item.label)
                    }
                  />
                  <ErrorText
                    errMessage="Please select quarter"
                    isShow={this.state.ISQUARTERERROR}
                  />
                </View>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.textStyle}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.label, { fontWeight: "bold" }]}
                  >
                    Address*
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.textArea}
                    multiline={true}
                    value={this.state.address}
                    onChangeText={(value) =>
                      this.setState({ address: value, ISADDRESSERROR: false })
                    }
                    onSubmitEditing={Keyboard.dismiss}
                  ></TextInput>
                  <ErrorText
                    errMessage="Please enter your address"
                    isShow={this.state.ISADDRESSERROR}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#DD2C00" }]}
                onPress={() => this.props.navigation.navigate("HomeScreen")}
              >
                <Text allowFontScaling={false} style={styles.btnText}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this._saveInquiry()}
              >
                <Text allowFontScaling={false} style={styles.btnText}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <SuccessModel
          isOpen={this.state.isOpenSuccessModel}
          text="Thanks you, We will contact you soon..."
          onClose={() => this._handleOnCloseSuccessModal()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: "14%",
    backgroundColor: "#00C853",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  headerLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  imageBackground: {
    width: "20%",
    // alignItems:"flex-end"
    alignItems: "center",
  },
  textBackground: {
    flex: 1,
    marginTop: 10,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    color: "white",
    marginLeft: 20,
    marginRight: 20,
  },
  formContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  textStyle: {
    marginRight: 10,
    alignItems: "flex-start",
    width: "35%",
    // backgroundColor: "red",
  },
  label: {
    // textAlign: "right",
    fontSize: 14,
  },
  inputText: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    flex: 1,
    padding: 10,
  },
  textArea: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFFFFF",
    minHeight: 80,
    fontSize: 14,
    textAlignVertical: "top",
    flex: 1,
  },
  btn: {
    backgroundColor: "#00C853",
    width: "25%",
    height: 40,
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "#FFFF",
  },
  sCard: {
    flexDirection: "row-reverse",
    paddingHorizontal: 5,
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 5,
    justifyContent: "space-between",
  },
});
