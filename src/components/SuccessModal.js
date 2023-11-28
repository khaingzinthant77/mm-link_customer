import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default class CustomModal extends React.Component {
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
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Image
                  source={
                    this.props.headerIcon
                      ? this.props.headerIcon
                      : require("@icons/modal_icon/success_green.png")
                  }
                  style={styles.modalimg}
                />
              </View>

              <TouchableOpacity
                onPress={() => this.close()}
                style={styles.closeBtn}
                activeOpacity={0.7}
              >
                <Image
                  source={require("@icons/modal_icon/close-button.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.messageWrapper}>
              <Text allowFontScaling={false} style={styles.showText}>
                {this.props.text}
              </Text>
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
    minHeight: 70,
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
});
