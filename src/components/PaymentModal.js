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
export default class PaymentModal extends React.Component {
  close() {
    // alert("Hi");
    if (this.props.onClose) {
      // alert("Hi");
      this.props.onClose();
    }
  }

  _handle_KBZ() {
    if (this.props._handle_KBZ) {
      this.props._handle_KBZ();
    }
  }

  _handle_CB() {
    if (this.props._handle_CB) {
      this.props._handle_CB();
    }
  }
  _handle_AYA() {
    if (this.props._handle_AYA) {
      this.props._handle_AYA();
    }
  }

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
                  source={require("@images/close-button.png")}
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
              {this.props.kbz_show ? (
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

              {this.props.aya_show ? (
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
              {this.props.cb_show ? (
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
