import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default class InquiryModal extends React.Component {
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
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={
                  this.props.headerIcon
                    ? this.props.headerIcon
                    : require("@icons/smile.png")
                }
                style={styles.modalimg}
              />
            </View>
            <View
              style={{
                borderColor: "#EFE7E7",
                borderWidth: 1,
                // flex: 1,
                backgroundColor: "red",
                height: 1,
                width: "100%",
                marginTop: 4,
              }}
            />
            <View style={styles.messageWrapper}>
              <Text allowFontScaling={false} style={styles.showText}>
                {this.props.text}
              </Text>
              <Text allowFontScaling={false} style={styles.showText}>
                {this.props.text1}
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancleBtn}
                onPress={() => this.close()}
                activeOpacity={0.5}
              >
                <Text allowFontScaling={false} style={styles.btnText}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => this._handleAction()}
              >
                <Text allowFontScaling={false} style={styles.btnText}>
                  Continue
                </Text>
              </TouchableOpacity>
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
    width: "100%",
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalimg: {
    width: 30,
    height: 30,
    marginTop: 15,
  },
  showText: {
    textAlign: "center",
    fontSize: 18,
  },
  messageWrapper: {
    padding: 20,
    justifyContent: "center",
    minHeight: 70,
    marginTop: 10,
  },
  closeBtn: {
    padding: 10,
    position: "absolute",
    right: 5,
    backgroundColor: "red",
    width: 40,
    height: 40,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  btnContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  cancleBtn: {
    width: "46%",
    height: 37,
    backgroundColor: "#1179C2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  yesBtn: {
    width: "46%",
    height: 37,
    backgroundColor: "#1179C2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 19,
    color: "#FFFFFF",
  },
});
