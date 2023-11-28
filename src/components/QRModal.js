import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Fonts from "@styles/Fonts";
export default class QRModal extends React.Component {
  close() {
    // alert("Hi");
    if (this.props.onClose) {
      // alert("Hi");
      this.props.onClose();
    }
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => this.close()}
                style={styles.closeBtn}
                activeOpacity={0.7}
              >
                <Image
                  source={require("@icons/hotspot/dashboard/close-button.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.messageWrapper}>
              <View style={styles.row_container}>
                <Text style={styles.text_style}>My QR</Text>
                <QRCode value={this.props.phone} size={200} />
                <Text style={styles.phone_text}>{this.props.phone}</Text>
              </View>
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
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 300,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
    alignItems: "center",
    minHeight: 300,
    // height:200
  },
  closeBtn: {
    padding: 10,
    position: "absolute",
    right: 5,
    // backgroundColor: "red",
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  row_container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text_style: {
    fontSize: 18,
    fontFamily: Fonts.primary,
    marginBottom: 10,
  },
  phone_text: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: Fonts.primary,
    color: "#337ab7",
  },
});
