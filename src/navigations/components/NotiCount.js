import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//url
import { toPurchaseApi } from "@apis/FiberApis";
import axios from "axios";
export default class NotiCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
    };
  }
  componentDidMount = async () => {
    // alert(this.props.focused)
    this._getAllToPurchase();
  };

  _getAllToPurchase = async () => {
    var self = this;
    var cus_id = await AsyncStorage.getItem("cusId");
    var access_token = await AsyncStorage.getItem("access_token");
    let bodyParam = {
      Stype: null,
      ReceivedBy: null,
      CusId: cus_id,
      Period: null,
    };

    axios
      .post(toPurchaseApi, bodyParam, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
      .then(async (response) => {
        let arr = [];
        if (response.data.length > 0) {
          response.data.map((data, index) => {
            var invoice_arr = data.invoiceInfos;
            invoice_arr.map((inv_data, index) => {
              arr.push(inv_data);
            });
          });
        }

        await AsyncStorage.setItem("unpaid_count", arr.length.toString());
        var unpaid_count = await AsyncStorage.getItem("unpaid_count");
        self.setState({ totalCount: unpaid_count });
      })
      .catch((err) => {
        console.log("Error get purchased api ", err);
        self.setState({ refreshing: false });
      });
  };

  render() {
    return (
      <View
        style={
          this.props.count == 0
            ? [styles.img, { backgroundColor: "transparent" }]
            : [styles.img, { backgroundColor: "red" }]
        }
      >
        {this.props.count != 0 ? (
          <Text
            allowFontScaling={false}
            style={{ color: "white", marginLeft: 1, fontSize: 11 }}
          >
            {/* {this.state.totalCount} */}
            {this.props.count}
          </Text>
        ) : (
          <Text allowFontScaling={false}></Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 16,
    height: 16,
    marginRight: 40,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
});
