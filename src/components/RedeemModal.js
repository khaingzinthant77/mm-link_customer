import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Divider, Button } from "react-native-paper";
import Fonts from "@styles/Fonts";
export default class RedeemModal extends React.Component {
  close() {
    // alert("Hi");
    if (this.props.onClose) {
      // alert("Hi");
      this.props.onClose();
    }
  }
  redeemClick() {
    if (this.props.clickRedeem) {
      this.props.clickRedeem();
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.primary,
                  fontSize: 20,
                  color: "red",
                  marginRight: 10,
                }}
              >
                {this.props.point} Points
              </Text>
              <AntDesign name="checkcircle" color={"green"} size={25} />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: Fonts.primary,
                  width: "50%",
                }}
              >
                Redeem Data
              </Text>
              <View style={{ width: "50%" }}>
                <Text style={{ fontSize: 17, marginLeft: 20 }}>
                  : {this.props.redeem_data}
                </Text>
              </View>
            </View>
            <Divider />
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: Fonts.primary,
                  width: "50%",
                }}
              >
                Current Point
              </Text>
              <View style={{ width: "50%" }}>
                <Text style={{ fontSize: 17, marginLeft: 20 }}>
                  : {this.props.remain_point} Points
                </Text>
              </View>
            </View>
            <Divider />
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: Fonts.primary,
                  width: "50%",
                }}
              >
                Redeem Point
              </Text>
              <View style={{ width: "50%" }}>
                <Text style={{ fontSize: 17, marginLeft: 20, color: "red" }}>
                  : - {this.props.point} Points
                </Text>
              </View>
            </View>
            <Divider />
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() => this.close()}
                textColor="#337ab7"
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={() => this.redeemClick()}
                style={{ width: "50%", backgroundColor: "#337ab7" }}
              >
                OK
              </Button>
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
    paddingHorizontal: 10,
  },
  modalBody: {
    backgroundColor: "#fff",
    width: "100%",
    height: null,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 70,
    marginTop: 20,
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
});
