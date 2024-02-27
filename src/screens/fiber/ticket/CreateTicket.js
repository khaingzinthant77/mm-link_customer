import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import FiberHeader from "@components/FiberHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import apis
import { ticketissuetype } from "@apis/FiberApis";
//const
import axios from "axios";
import uuid from "react-native-uuid";
import moment from "moment";
export default class CreateTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      issueTypes: [],
      issueType: { value: null, label: null },
      problemType: { value: null, label: null },
      problemTypes: [],
      access_token: null,
      randomNum: null,
      NumberHolder: null,
      siteId: null,
      cust_id: null,
      zoneId: null,
      serviceId: null,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = async () => {
    // console.log(this.props.route.params.cust_info);
    await this.getRandomValue();
    await this._getIssueType();
    await this._retrieveToken();
    await this.uuidv4();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };

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

  getRandomValue = async () => {
    try {
      const random_number = await Math.round(Math.random() * 10);
      // console.log(random_number);
      if (random_number !== null) {
        this.setState({ randomNum: random_number });
      }
    } catch (error) {
      console.log("Ramdom Number Error", error);
      // Error retrieving data
    }
  };

  _getIssueType = async () => {
    const value = await AsyncStorage.getItem("access_token");
    var self = this;
    // console.log(this.state.access_token);
    const url = ticketissuetype + this.state.randomNum;
    // console.log(url);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + value,
        },
      })
      .then((response) => {
        // console.log("Here",response.data);
        // self.setState({ issue_type: response.data});
        let data = response.data;
        // console.log(data);
        let arr = [];
        data.map((data, index) => {
          var obj = {
            value: data.ticketIssueId,
            label: data.name,
          };
          // console.log(obj);
          arr.push(obj);
        });
        self.setState({ issueTypes: arr });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(self.state.issueTypes);
  };

  _retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("access_token");
      const siteId = await AsyncStorage.getItem("siteId");
      const cust_id = await AsyncStorage.getItem("cusId");
      const zone_id = await AsyncStorage.getItem("zoneId");
      const serviceId = await AsyncStorage.getItem("serviceId");

      if (value != null) {
        this.setState({ access_token: value });
      }
      this.setState({ siteId: siteId, cust_id, zoneId: zone_id, serviceId });
    } catch (error) {
      // console.log(error);
    }
  };

  uuidv4 = async () => {
    // var uuid = require("react-native-uuid");
    // var buffer = new Array(32); // (or 'new Buffer' in node.js)
    var testUUID = uuid.v4();
    // console.log(testUUID);
    this.setState({
      NumberHolder: testUUID,
    });
  };

  _handleTicket = async () => {
    // console.log(this.state.issueTypes[2])
    if (this.state.description == null) {
      alert("Please enter description");
    } else {
      let ticket = {
        ticketId: this.state.NumberHolder,
        ticketIssueId: this.state.issueTypes[2].value,
        ticketProblemId: null,
        siteId: this.state.siteId,
        title: "",
        description: this.state.description,
        remark: "",
        solved: false,
        solvedAt: null,
        solvedBy: "",
        assignUserId: null,
        priority: 1,
        site: null,
        assignUser: null,
        ticketIssueType: null,
        ticketProblem: null,
        cat: new Date(),
        uat: new Date(),
        cby: "",
        uby: "",
        assignAt: null,
        adminSolved: false,
        adminSolvedAt: null,
      };

      var self = this;
      console.log(ticket);
      // axios
      //   .post(ticketApi, ticket, {
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + this.state.access_token,
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //   })
      //   .then(function (response) {
      //     // console.log(response);
      //     if (response.status == 200) {
      //       alert("Successfully create ticket");
      //       self.props.navigation.navigate("TicketNavigator");
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log("Error:", error);
      //   });
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FiberHeader
          backgroundColor="#337ab7"
          headerText="New Ticket"
          onPress={() => this.props.navigation.goBack(null)}
        />
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.entryContainer}>
                <Text allowFontScaling={false} style={styles.label}>
                  Date
                </Text>
                <Text allowFontScaling={false}>
                  {moment(Date.now()).format("DD/MM/Y h:mm A")}
                </Text>
              </View>
              <View style={styles.entryContainer}>
                <Text allowFontScaling={false} style={styles.label}>
                  Site Code
                </Text>
                <Text allowFontScaling={false}>
                  {this.props.route.params.site_code}
                </Text>
              </View>
              <View style={styles.entryContainer}>
                <Text allowFontScaling={false} style={styles.label}>
                  Description
                </Text>
                <TextInput
                  allowFontScaling={false}
                  multiline={true}
                  style={styles.textArea}
                  value={this.state.description}
                  onChangeText={(val) => this.setState({ description: val })}
                  placeholder="Description"
                ></TextInput>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.8}
                  onPress={() => this._handleTicket()}
                >
                  <Text allowFontScaling={false} style={styles.btnText}>
                    Create Ticket
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: "16%",
    backgroundColor: "#337ab7",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  headerLogo: {
    width: 33,
    height: 33,
    resizeMode: "contain",
  },
  headerText: {
    color: "white",
    fontSize: 28,
    marginLeft: "5%",
  },
  entryContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  label: {
    color: "#707070",
    fontSize: 14,
    marginTop: 10,
    // flex: 1,
    width: 100,
  },
  textArea: {
    padding: 10,
    backgroundColor: "#ffffff",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFFFFF",
    minHeight: 130,
    // width: 300,
    flex: 1,
    fontSize: 14,
    textAlignVertical: "top",
  },
  costText: {
    height: 37,
    width: 210,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  btn: {
    width: "40%",
    height: 36,
    backgroundColor: "#56A8DB",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 14,
  },
  backImg: {
    width: 24,
    height: 17,
  },
  backContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
