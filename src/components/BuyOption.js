import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Fonts from "@styles/Fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//import api
import { paymentApi } from "@apis/TopupApis";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class BuyOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_kbz: false,
      show_cb: false,
      show_aya: false,
      show_cash: false,
      show_point: false,
    };
  }
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  _handleAction() {
    if (this.props.onPressYes) {
      this.props.onPressYes();
    }
  }
  _handle_cash() {
    if (this.props.onPressCash) {
      this.props.onPressCash();
    }
  }

  _handle_KBZ() {
    if (this.props.onPresKBZ) {
      this.props.onPresKBZ();
    }
  }
  _handle_AYA() {
    if (this.props.onPresAYA) {
      this.props.onPresAYA();
    }
  }
  _handle_CB() {
    if (this.props.onPresCB) {
      this.props.onPresCB();
    }
  }

  componentDidMount = async () => {
    const self = this; // *
    var topupEndPoint = await AsyncStorage.getItem("endpoint");
    // console.log(topupEndPoint)
    var payment_api = topupEndPoint + paymentApi;
    // console.log(payment_api);
    axios
      .get(payment_api)
      .then(function (response) {
        // console.log("buypackage", response.data);
        self.setState({
          show_kbz: response.data.data.payment.kbzpay,
          show_cb: response.data.data.payment.cbpay,
          show_aya: response.data.data.payment.ayapay,
          show_cash: response.data.data.payment.cash,
          show_point: response.data.data.payment.point,
        });
      })
      .catch(function (error) {
        console.log(error);
        self.setState({ refreshing: false });
      });
  };
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
        onRequestClose={() => this.setState({ visible: false })}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={styles.closeBtn}>
              <TouchableOpacity
                onPress={() => this.close()}
                activeOpacity={0.7}
              >
                <Image
                  source={require("@icons/modal_icon/close-button.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <Text
              allowFontScaling={false}
              style={{ fontSize: 18, fontFamily: Fonts.primary, marginTop: 10 }}
            >
              Select Payment Method
            </Text>
            <View
              style={{
                width: "100%",
                // marginTop: 40,
                paddingHorizontal: 5,
                marginVertical: 10,
              }}
            >
              {this.state.show_kbz ? (
                <TouchableOpacity
                  style={styles.pay_btn}
                  onPress={() => this._handle_KBZ()}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 16, fontFamily: Fonts.primary }}
                  >
                    KBZPay
                  </Text>
                  <Image
                    source={require("@images/payment/kbz.png")}
                    style={{ width: 40, height: 40, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              ) : null}

              {this.state.show_aya ? (
                <TouchableOpacity
                  style={styles.pay_btn}
                  onPress={() => this._handle_AYA()}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 16, fontFamily: Fonts.primary }}
                  >
                    AYAPay
                  </Text>
                  <Image
                    source={require("@images/payment/ayalogo.png")}
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              ) : null}

              {this.state.show_cb ? (
                <TouchableOpacity
                  style={styles.pay_btn}
                  onPress={() => this._handle_CB()}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 16, fontFamily: Fonts.primary }}
                  >
                    CBPay
                  </Text>
                  <Image
                    source={require("@images/payment/cb-pay.png")}
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              ) : null}
              {this.state.show_cash ? (
                <TouchableOpacity
                  style={styles.pay_btn}
                  onPress={() => this._handle_cash()}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 16, fontFamily: Fonts.primary }}
                  >
                    Cash Balance
                  </Text>
                  <MaterialCommunityIcons
                    name="cash"
                    size={40}
                    color="#337ab7"
                    style={{ marginTop: 5, marginLeft: 2 }}
                  />
                </TouchableOpacity>
              ) : null}
              {this.state.show_point ? (
                <TouchableOpacity
                  style={styles.pay_btn}
                  onPress={() => this._handle_cash()}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 16, fontFamily: Fonts.primary }}
                  >
                    Point Redeem
                  </Text>
                  <FontAwesome5
                    name="coins"
                    size={37}
                    color="orange"
                    style={{ marginTop: 5, marginLeft: 2 }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 300,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  modalimg: {
    width: 55,
    height: 55,
    marginTop: 40,
  },
  showText: {
    textAlign: "center",
    fontSize: 14,
  },
  messageWrapper: {
    padding: 10,
    justifyContent: "center",
    minHeight: 70,
  },
  closeBtn: {
    padding: 10,
    position: "absolute",
    right: 5,
    // backgroundColor: "red",
    top: 0,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  pay_btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#337ab7",
    borderWidth: 1,
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
